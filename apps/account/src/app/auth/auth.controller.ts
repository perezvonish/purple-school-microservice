import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post("/register")
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body)
  }

  @Post("/login")
  async login(@Body() body: LoginDto) {
    const id = await this.authService.validateUser(body)

    return this.authService.login()
  }
}


export class RegisterDto {
  email: string
  password: string
  displayName?: string
}

export class LoginDto {
  email: string
  password: string
}
