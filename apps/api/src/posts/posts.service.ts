import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  // 1. 게시글 작성
  async create(userId: number, createPostDto: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        ...createPostDto,
        authorId: userId,
      },
      include: {
        author: {
          select: { id: true, username: true, email: true, profileImage: true }
        }
      }
    });
  }

  // 2. 전체 게시글 조회 (페이지네이션/검색 가능)
  async findAll() {
    return this.prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: { id: true, username: true, profileImage: true }
        }
      }
    });
  }

  // 3. 내 게시글 조회
  async findMyPosts(userId: number) {
    return this.prisma.post.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: { id: true, username: true, profileImage: true }
        }
      }
    });
  }

  // 4. 상세 조회
  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, username: true, profileImage: true }
        }
      }
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    // 조회수 증가
    await this.prisma.post.update({
      where: { id },
      data: { views: { increment: 1 } }
    });

    return post;
  }

  // 5. 수정 (작성자 확인)
  async update(id: number, userId: number, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id);

    if (post.authorId !== userId) {
      throw new ForbiddenException("당신의 게시글이 아닙니다.");
    }

    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  // 6. 삭제 (작성자 확인)
  async remove(id: number, userId: number) {
    const post = await this.findOne(id);

    if (post.authorId !== userId) {
      throw new ForbiddenException("당신의 게시글이 아닙니다.");
    }

    return this.prisma.post.delete({
      where: { id },
    });
  }
}
