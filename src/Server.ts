import {Configuration, Inject} from "@tsed/di";
import {PlatformApplication} from "@tsed/common";
import {config} from "./config";
import GlobalAcceptMimesMiddleware from "@tsed/common";

import "@tsed/platform-express";
import "@tsed/mongoose";
import "@tsed/swagger";
import "@tsed/ajv";

import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";




@Configuration({
  rootDir: __dirname,
  ...config,
  acceptMimes: ["application/json"],
  port: process.env.PORT || 8000,
  httpsPort: false, // CHANGE
  passport: {},
  mongoose: {
    url: process.env.MONGO_URI || "mongodb+srv://taloh13:wiCVWul9cfaeK6xg@bono-free-cluster.bl3jcea.mongodb.net/BonoDB?readPreference=primary",
    connectionOptions: {}
  },
  mount: {
    "/rest/users": [`./controllers/user.controller.ts`]
  },
  middlewares: [
    "cors",
    "cookie-parser",
    "compression",
    "method-override",
    "json-parser",
    { use: "urlencoded-parser", options: { extended: true }}
  ],
  exclude: [
    "**/*.spec.ts"
  ],
  debug: false
})


export class Server {
  @Inject()
  protected app: PlatformApplication;

  @Configuration()
  protected settings: Configuration;
}
