import {TestMongooseContext} from "@tsed/testing-mongoose";
import {MongooseModel} from "@tsed/mongoose";
import { expect } from 'chai';
import { User } from './user.model';

describe('User Model', () => {
    beforeEach(TestMongooseContext.create);
    afterEach(TestMongooseContext.reset);

    it('should be created', TestMongooseContext.inject([User], async (UserModel: MongooseModel<User>)=> {
        const user = new UserModel({
            email: "email",
            phone: "phone",
            name: "name",
            role: "role",
            password: "password",
            status: "status",
            businessIds: ["businessIds"],
            language: "language"
        });
        const savedUser = await user.save();
        expect(savedUser).to.exist;
        expect(savedUser.email).to.equal("email");
        expect(savedUser.phone).to.equal("phone");
        expect(savedUser.name).to.equal("name");
        expect(savedUser.role).to.equal("role");
        expect(savedUser.password).to.equal("password");
        expect(savedUser.status).to.equal("status");
        expect(savedUser.businessIds).to.deep.equal(["businessIds"]);
        expect(savedUser.language).to.equal("language");
    }));

    it('should have properties', () => {
        const user = new User();
        expect(user).to.have.property('email');
        expect(user).to.have.property('phone');
        expect(user).to.have.property('name');
        expect(user).to.have.property('role');
        expect(user).to.have.property('password');
        expect(user).to.have.property('status');
        expect(user).to.have.property('businessIds');
        expect(user).to.have.property('language');
    });
});