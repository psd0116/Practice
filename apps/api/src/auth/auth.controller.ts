import { Controller, Post, Patch, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

// 책임: "보안(인증) 관련 요청만 처리 - 회원가입, 로그인, 비밀번호 변경"
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // 1. 회원가입 (POST /auth/signup)
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  // 2. 로그인 (POST /auth/login)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  // 3. 비밀번호 변경 (PATCH /auth/password) - 로그인한 사람만
  @UseGuards(JwtAuthGuard)
  @Patch('password')
  async changePassword(@Request() req: any, @Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(
      req.user.userId,
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword,
    );
  }
}
