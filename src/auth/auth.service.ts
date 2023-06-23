import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private  readonly userService: UserService, private readonly jwtService: JwtService){}

    async validateUser(email: string, password: string) : Promise<any>{
        let user = await this.userService.findByEmail(email);
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch){
                return user;
            }
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
          user: payload,
        };
    }
}
