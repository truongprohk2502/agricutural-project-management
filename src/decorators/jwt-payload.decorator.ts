import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export const JwtPayload = createParamDecorator((data,  ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest()
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET)
    }
    return null
})