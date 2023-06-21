import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private  readonly userService: UserService){}
    async login(body: LoginDto){
        let user = await this.userService.findByEmail(body.email);
        if(user){
            if(user.password === body.password){
                return user;
            }

            return {
                "message":[
                    "Incorrect password."
                ]
            }
        }
        return {
            "message":[
                "Unauthenticated"
            ]
        }
    }
}
