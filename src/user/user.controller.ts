import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getUsers(){
        return this.userService.getAll();
    }

    @Post()
    create(@Body() body: CreateUserDto){
        return this.userService.createUser(body);
    }

    @Get('/:id')
    show(@Param('id', ParseIntPipe) id: number){
        return this.userService.show(id);
    }

    @Patch('/:userId')
    update(@Body() body: UpdateUserDto,@Param('userId', ParseIntPipe) userId : number){
        return  this.userService.updateUser(body, userId);
    }

    @Delete('/:id')
    delete(@Param('id', ParseIntPipe) id: number){
        return this.userService.delete(id);
    }
}
