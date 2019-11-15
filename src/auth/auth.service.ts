import { UserRepository } from './auth.repository'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: UserRepository) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find({})
    return users
  }
}
