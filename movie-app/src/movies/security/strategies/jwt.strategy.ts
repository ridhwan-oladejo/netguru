import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy} from 'passport-jwt';


export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: process.env.SECRET_KEY,
        });
    }

    validate(payload: any){
        return {
          userId: payload.userId,
          name: payload.name,
          role: payload.role,
          iat: payload.iat,
          exp: payload.exp,
        };
    }
}
