import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CookieGetter } from 'src/decorators/cookieGetter.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto'; // srcdan olyapti
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { User } from 'src/users/models/user.model';
import { AuthService } from './auth.service';

@ApiTags(`Auth`)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: `User Registerition` })
  @ApiResponse({ status: 201, type: User }) // Hammasiga qo'shish kerakmi? Nima beradi?
  @Post('signup')
  registration(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.registration(createUserDto, res);
  }

  @ApiOperation({ summary: `User Login` })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(loginUserDto, res);
  }

  @ApiOperation({ summary: `User Logout` })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  logout(
    @CookieGetter(`refresh_token`) refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: `Refresh Token` })
  @Post(`:id/refresh`)
  refresh(
    @Param(`id`) id: string,
    @CookieGetter(`refresh_token`) refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshToken(+id, refreshToken, res);
  }
}