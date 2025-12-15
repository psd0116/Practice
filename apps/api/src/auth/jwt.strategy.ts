import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// 책임: "들어온 토큰이 진짜인지 가짜인지(위조 여부) 검사하는 경비원"
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // "헤더 보여주세요"
      ignoreExpiration: false, // "유효기간 지났는지 봅니다"
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'), // 없으면 에러 발생
    });
  }

  // 검사 통과하면 실행됨
  async validate(payload: any) {
    // request.user에 이 내용을 담아줍니다.
    return { userId: payload.sub, email: payload.email, username: payload.username };
  }
}