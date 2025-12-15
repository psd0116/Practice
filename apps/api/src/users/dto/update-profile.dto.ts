import { IsOptional, IsString, IsEmail } from 'class-validator';

// 프로필 수정용 DTO (닉네임, 이메일, 프로필 사진)
export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  profileImage?: string; // 이미지 URL 또는 Base64
}
