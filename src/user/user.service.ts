import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }
    
    getAll(): Promise<UserEntity []> {
        return this.userRepository.find();
    }

    async createUser(body: CreateUserDto): Promise<any> {
        const { email, password, name } = body;

        const existingUser = await this.userRepository.findOne({ where: { email }});

        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash password with bcrypt

        const user = new UserEntity();
        user.email = email;
        user.password = hashedPassword;
        user.name = name;
        await this.userRepository.save(user)
        return {name: user.name, email: user.email, id: user.id};
    }

    show(id: number){
        return this.userRepository.findOne({where: {id}})
    }

    findByEmail(email: string){
        return this.userRepository.findOne({where: {email}})
    }


    updateUser(body: UpdateUserDto, id: number): any{
        return this.userRepository.update(id, body);
    }

    delete(id: number){
        return this.userRepository.delete(id);
    }
}
