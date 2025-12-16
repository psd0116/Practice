import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1. 게시글 작성
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req: any, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(req.user.userId, createPostDto);
  }

  // 2. 전체 게시글 조회 (공개)
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  // 3. 내 게시글 조회 (로그인 필요)
  @UseGuards(JwtAuthGuard)
  @Get('my')
  findMyPosts(@Request() req: any) {
    return this.postsService.findMyPosts(req.user.userId);
  }

  // 4. 상세 조회 (공개)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  // 5. 수정
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Request() req: any, @Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, req.user.userId, updatePostDto);
  }

  // 6. 삭제
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.postsService.remove(+id, req.user.userId);
  }

  // 7. 좋아요 토글
  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  toggleLike(@Request() req: any, @Param('id') id: string) {
    return this.postsService.toggleLike(+id, req.user.userId);
  }
}
