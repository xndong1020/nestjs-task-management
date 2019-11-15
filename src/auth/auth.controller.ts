import { AuthService } from './auth.service'
import { Controller, Get } from '@nestjs/common'
import { User } from './user.entity'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    const users = await this.authService.getUsers()
    return users
  }
}
