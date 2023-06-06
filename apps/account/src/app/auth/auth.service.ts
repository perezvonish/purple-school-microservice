import {Injectable} from '@nestjs/common';
import {LoginDto, RegisterDto} from "./auth.controller";
import {UserRepository} from "../user/repositories/user.repository";
import {UserEntity} from "../user/entities/user.entity";
import {UserRole} from "@./interfaces";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async register({email, password, displayName}: RegisterDto) {
    const user = await this.userRepository.find(email)

    if (user){
      throw new Error("User already registered")
    }

    const userEntity = await new UserEntity({
      email,
      displayName,
      passwordHash: "",
      role: UserRole.Student
    }).setPassword(password);

    const newUser = await this.userRepository.create(userEntity)

    return {email: newUser.email}
  }

  async validateUser({email, password}: LoginDto) {
    const user = await this.userRepository.find(email)
    if (!user){
      throw new Error("User not found")
    }

    const userEntity = new UserEntity(user)

    const isCorrectPassword = await userEntity.validatePassword(password)
    if (!isCorrectPassword){
      throw new Error("Wrong password")
    }

    return {
      id: user.id
    }
  }

  async login(id: string) {
    return {
      access_token: await this.jwtService.signAsync({id})
    }
  }
}
