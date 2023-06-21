import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    getAll(): Promise<User []> {
        return this.userRepository.find();
    }

    createUser(body: CreateUserDto): Promise<CreateUserDto> {
        return this.userRepository.save(body);
    }

    show(id: number){
        return this.userRepository.findOne({where: {id}})
    }


    updateUser(body: UpdateUserDto, id: number): any{
        return this.userRepository.update(id, body);
    }

    delete(id: number){
        return this.userRepository.delete(id);
    }
}
