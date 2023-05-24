import {Inject, Service} from "@tsed/common";
import {MongooseModel} from "@tsed/mongoose";
import {$log} from "@tsed/logger";
import {User} from "../models/user/user.model";

@Service()
export class UserService {
    @Inject(User) private userModel: MongooseModel<User>;

    async getUsers(): Promise<User[]> {
        try {
            return await this.userModel.find().exec();
        } catch (error) {
            $log.error("Failed to fetch users", error);
            throw new Error("Failed to fetch users");
        }
    }

    async getUserById(userId: string): Promise<User | null> {
        try {
            $log.debug("Search a user by ID", userId);
            return await this.userModel.findById(userId).exec();
        } catch (error) {
            $log.error(`Failed to fetch user with ID ${userId}`, error);
            throw new Error(`Failed to fetch user with ID ${userId}`);
        }
    }

    async createUser(userData: User): Promise<User> {
        try {
            return await this.userModel.create(userData);
        } catch (error) {
            $log.error("Failed to create user", error);
            throw new Error("Failed to create user");
        }
    }

    async updateUser(userId: string, userData: Partial<User>): Promise<User | null> {
        try {
            return await this.userModel.findByIdAndUpdate(userId, userData, { new: true }).exec();
        } catch (error) {
            $log.error(`Failed to update user with ID ${userId}`, error);
            throw new Error(`Failed to update user with ID ${userId}`);
        }
    }

    async deleteUser(userId: string): Promise<void> {
        try {
            await this.userModel.findByIdAndDelete(userId).exec();
        } catch (error) {
            $log.error(`Failed to delete user with ID ${userId}`, error);
            throw new Error(`Failed to delete user with ID ${userId}`);
        }
    }
}