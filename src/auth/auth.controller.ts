import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    
    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Req() req: any){
        return this.authService.login(req.user);
    }

    @Post('register')
    register(@Body() body: CreateUserDto){
        return this.authService.register(body);
    }

}
