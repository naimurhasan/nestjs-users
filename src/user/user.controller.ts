import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    getUsers(){
        return this.userService.getAll();
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
