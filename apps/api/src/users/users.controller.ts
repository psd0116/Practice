import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// 책임: "유저 프로필 관련 요청 처리 - 조회, 수정"
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 1. 내 프로필 보기 (GET /users/me)
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req: any) {
    return this.usersService.findById(req.user.userId);
  }

  // 2. 내 프로필 수정 (PATCH /users/me)
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateProfile(@Request() req: any, @Body() updateProfileDto: UpdateProfileDto) {
    return this.usersService.updateProfile(req.user.userId, updateProfileDto);
  }
}
