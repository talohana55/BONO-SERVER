import {Middleware, PathParams} from "@tsed/common";
import {MongooseModel} from "@tsed/mongoose";
import {NotFound} from "@tsed/exceptions";
import {UserService} from "../services/user.service";
import {User} from "../models/user/user.model";

@Middleware()
export class UserMiddleware {
    constructor(private userService: MongooseModel<User>) {}
    async use(@PathParams("userId") userId: string) {

        try {
            await this.userService.findById(userId);
        } catch (er) {
            throw new NotFound("user not found");
        }
    }
}