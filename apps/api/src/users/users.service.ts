import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

// 책임: "유저 프로필 정보 관리 - 조회, 수정"
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // 1. ID로 프로필 조회 (비밀번호 제외)
  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: { 
        id: true, 
        email: true, 
        username: true, 
        profileImage: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  // 2. 프로필 수정 (닉네임, 이메일, 프로필 사진)
  async updateProfile(id: number, updateProfileDto: UpdateProfileDto) {
    const { email, username, profileImage } = updateProfileDto;

    // 이메일 변경 시 중복 검사
    if (email) {
      const existingUser = await this.prisma.user.findUnique({ where: { email } });
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('이미 사용 중인 이메일입니다.');
      }
    }

    return this.prisma.user.update({
      where: { id },
      data: { 
        ...(username && { username }),
        ...(email && { email }),
        ...(profileImage && { profileImage }),
      },
      select: { 
        id: true, 
        email: true, 
        username: true, 
        profileImage: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
