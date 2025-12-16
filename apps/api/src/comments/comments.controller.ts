import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // 1. 댓글 작성
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req: any, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(req.user.userId, createCommentDto);
  }

  // 2. 게시글별 댓글 조회 (공개)
  // URL 패턴: /comments/post/:postId
  @Get('post/:postId')
  findAllByPostId(@Param('postId', ParseIntPipe) postId: number) {
    return this.commentsService.findAllByPostId(postId);
  }

  // 3. 댓글 삭제
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.commentsService.remove(+id, req.user.userId);
  }
}
