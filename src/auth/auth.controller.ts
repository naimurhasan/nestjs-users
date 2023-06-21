import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private  readonly authService: AuthService){}

    @Post('login')
    login(@Body() body: LoginDto){
        return this.authService.login(body);
    }

}
