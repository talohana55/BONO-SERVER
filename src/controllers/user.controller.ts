import { BodyParams, Controller, Delete, Get, PathParams, Post, Put,UseBefore } from "@tsed/common";
import { Summary,Status  } from "@tsed/schema"
import { User } from "../models/user/user.model";
import { UserService } from "../services/user.service";
import {UserMiddleware} from "../middlewares/user.middleware";


@Controller("/users")
export class UserController {
    constructor(private userService: UserService) {}
    @Get("/")
    @Summary("Get all users from the database")
    @Status(200, {description: "Success"})
    async getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @Get("/:id")
    @Summary("Get user by ID")
    //@UseBefore(UserMiddleware)
    @Status(200, {description: "Success"})
    async getUserById(@PathParams("id") userId: string): Promise<User | null> {
        return this.userService.getUserById(userId);
    }

    @Post("/")
    @Summary("Create a new user")
    @Status(201, {description: "Created"})
    async createUser(@BodyParams() userData: User): Promise<User> {
        return this.userService.createUser(userData);
    }

    @Put("/:id")
    @Summary("Update a user")
    @Status(201, {description: "Updated"})
    async updateUser(@PathParams("id") userId: string, @BodyParams() userData: Partial<User>): Promise<User | null> {
        return this.userService.updateUser(userId, userData);
    }

    @Delete("/:id")
    @Summary("Delete a user")
    @Status(204, {description: "No content"})
    async deleteUser(@PathParams("id") userId: string): Promise<void> {
        return this.userService.deleteUser(userId);
    }
}