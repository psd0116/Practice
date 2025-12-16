import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

// 책임: "보안(인증) 관련 로직만 담당 - 회원가입, 로그인, 비밀번호"
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // 1. 회원가입 (Create)
  async signup(createUserDto: CreateUserDto) {
    const { email, password, username } = createUserDto;

    // 이메일 중복 검사
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
      select: { // 비밀번호 제외하고 반환
        id: true,
        email: true,
        username: true,
        createdAt: true,
      },
    });
  }

  // 2. 로그인 검증 (아이디/비번 검사)
  async validateUser(loginDto: LoginDto) {
    const { email, password } = loginDto;
    // Simple file logger
    const log = (msg: string) => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('fs').appendFileSync('/Users/min/Desktop/Practice/apps/api/auth-debug.log', new Date().toISOString() + ' ' + msg + '\n');
    };

    log(`Validating user: ${email}`);
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user) {
      log(`User found: ${user.id}, Hash: ${user.password.substring(0, 10)}...`);
      const isMatch = await bcrypt.compare(password, user.password);
      log(`Password match: ${isMatch}`);
      if (isMatch) {
        const { password, ...result } = user;
        return result;
      }
    } else {
      log(`User NOT found`);
    }
    return null;
  }

  // 3. 토큰 발급 (로그인 성공 시)
  async login(user: any) {
    const payload = { email: user.email, sub: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        profileImage: user.profileImage,
      },
    };
  }

  // 4. 비밀번호 변경
  async changePassword(userId: number, oldPassword: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    
    if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
      throw new UnauthorizedException('현재 비밀번호가 일치하지 않습니다.');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { message: '비밀번호가 변경되었습니다.' };
  }
}
