import { Enum,Required,Email,Property,Name,Description,Default } from '@tsed/schema';
import { Model, ObjectID  } from '@tsed/mongoose';
import {CollectionOf} from "@tsed/schema";

enum USER_ROLES {
    Admin = 'admin',
    Business = 'business',
    User = 'user',
}

enum USER_STATUS {
    Active = 'active',
    Pending = 'pending',
    Verified = 'verified',
}

enum USER_LANGUAGE {
    English = 'en',
    Hebrew = 'he',
    French = 'fr',
}

@Model({ schemaOptions: { timestamps: true } })
export class User {
    @Name("id")
    _id: string;

    @Email()
    @Required()
    email: string;

    @Property()
    phone: string;

    @Property()
    name: string;

    @Property()
    @Required()
    password: string;

    @CollectionOf(String)
    @Description("Businesses ID's that a user is associated with")
    businessIds: string[];

    @Enum(USER_STATUS)
    @Property()
    @Default(USER_STATUS.Pending)
    status: USER_STATUS;

    @Enum(USER_ROLES)
    @Property()
    @Default(USER_ROLES.User)
    role: USER_ROLES;

    @Enum(USER_LANGUAGE)
    @Property()
    @Default(USER_LANGUAGE.English)
    language: USER_LANGUAGE;
}

export default User;
