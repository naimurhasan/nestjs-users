import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private  readonly userService: UserService){}

    async validateUser(email: string, password: string) : Promise<any>{
        let user = await this.userService.findByEmail(email);
        if(user && user.password === password){
            return user;
        }
        return null;
    }
}
