import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  // 1. 댓글 작성
  async create(userId: number, createCommentDto: CreateCommentDto) {
    return this.prisma.comment.create({
      data: {
        content: createCommentDto.content,
        postId: createCommentDto.postId,
        authorId: userId,
      },
      include: {
        author: {
          select: { id: true, username: true, profileImage: true }
        }
      }
    });
  }

  // 2. 특정 게시글의 댓글 조회
  async findAllByPostId(postId: number) {
    return this.prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: 'desc' }, // 최신 댓글 먼저 or createdAt: 'asc' for older first
      include: {
        author: {
          select: { id: true, username: true, profileImage: true }
        }
      }
    });
  }

  // 3. 댓글 삭제 (작성자 확인)
  async remove(id: number, userId: number) {
    const comment = await this.prisma.comment.findUnique({ where: { id } });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    if (comment.authorId !== userId) {
      throw new ForbiddenException("당신의 댓글이 아닙니다.");
    }

    return this.prisma.comment.delete({ where: { id } });
  }
}
