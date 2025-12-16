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
        },
        _count: {
          select: { comments: true, likes: true }
        }
      }
    });
  }

  // 2. 전체 게시글 조회 (페이지네이션/검색 가능)
  async findAll(sort?: string) {
    const orderBy = sort === 'popular' 
      ? { likes: { _count: 'desc' as const } } 
      : { createdAt: 'desc' as const };

    return this.prisma.post.findMany({
      orderBy,
      include: {
        author: {
          select: { id: true, username: true, profileImage: true }
        },
        _count: {
          select: { comments: true, likes: true }
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
        },
        _count: {
          select: { comments: true, likes: true }
        },
        comments: {
          take: 3,
          orderBy: { createdAt: 'desc' },
          include: {
            author: { select: { username: true } }
          }
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
        },
        _count: {
          select: { comments: true, likes: true }
        },
        likes: true // 내가 좋아요 했는지 확인용 (Controller에서 필터링하거나 여기서 처리)
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

  // 7. 좋아요 토글
  async toggleLike(postId: number, userId: number) {
    const existingLike = await this.prisma.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    if (existingLike) {
      // 이미 좋아요 했으면 취소
      await this.prisma.like.delete({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      });
      return { liked: false };
    } else {
      // 좋아요 추가
      await this.prisma.like.create({
        data: {
          postId,
          userId,
        },
      });
      return { liked: true };
    }
  }

  // 8. 마이페이지 통계 (작성글 수, 받은 좋아요 수, 받은 댓글 수)
  async getUserStats(userId: number) {
    // 1. 내가 쓴 글 개수
    const postsCount = await this.prisma.post.count({
      where: { authorId: userId },
    });

    // 2. 받은 좋아요 수 (내가 쓴 글들에 달린 좋아요 합계)
    const likesAggregate = await this.prisma.like.count({
      where: {
        post: {
          authorId: userId,
        },
      },
    });

    // 3. 받은 댓글 수 (내가 쓴 글들에 달린 댓글 합계)
    const commentsAggregate = await this.prisma.comment.count({
      where: {
        post: {
          authorId: userId,
        },
      },
    });

    return {
      postsCount,
      receivedLikesCount: likesAggregate,
      receivedCommentsCount: commentsAggregate,
    };
  }
}
