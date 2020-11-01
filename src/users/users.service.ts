import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/interfaces/user.interface';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { SignInGoogleDto } from 'src/dto/signin-google.dto';
import { UpdateUserInfoDto } from 'src/dto/update-user-info.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
    ) { }

    async create(createUserDto: CreateUserDto) {
        const { fullName, email, phone, password, address } = createUserDto
        const existUser = await this.findByLocalEmail(email)
        if (existUser) {
            throw new ConflictException()
        } else {
            const salt = bcrypt.genSaltSync()
            const user = new this.userModel({
                fullName,
                phone,
                address,
                local: {
                    email,
                    password: bcrypt.hashSync(password, salt),
                }
            })
            user.save()
            return user
        }
    }

    async createGoogleAccount(signInGoogleDto: SignInGoogleDto) {
        const { googleId, email, givenName, familyName } = signInGoogleDto
        const user = new this.userModel({
            fullName: familyName + ' ' + givenName,
            google: {
                uid: googleId,
                email,
            }
        })
        user.save()
        return user
    }

    async findByLocalEmail(email: String) {
        return this.userModel.findOne({ 'local.email': email })
    }

    async findOneByGmail(id: String) {
        return this.userModel.findOne({ 'google.uid': id })
    }

    async updateInfo(updateUserInfoDto: UpdateUserInfoDto, payload: any) {
        const { fullName, phone, address } = updateUserInfoDto
        const user = await this.findByLocalEmail(payload.email)
        if (user) {
            user.fullName = fullName
            user.address = address
            user.phone = phone
            user.updatedAt = new Date()
            user.save()
        } else {
            throw new NotFoundException()
        }
    }
}
