import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./models/user.model";
import {UserRepository} from "./repositories/user.repository";

@Module({
  imports: [MongooseModule.forFeature([
    {name: User.name, schema: UserSchema}
  ])],
  providers: [UserRepository],
})
export class UserModule {}