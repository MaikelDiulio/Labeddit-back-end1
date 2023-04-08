"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserBusiness_1 = require("../Business/UserBusiness");
const UserController_1 = require("../Controller/UserController");
const HashManager_1 = require("../Services/HashManager");
const UserDataBase_1 = require("../database/UserDataBase");
const IdGenerator_1 = require("../Services/IdGenerator");
const TokenManager_1 = require("../Services/TokenManager");
exports.usersRouter = express_1.default.Router();
const userController = new UserController_1.UserController(new UserBusiness_1.UserBusiness(new UserDataBase_1.UserDatabase(), new IdGenerator_1.IdGenerator(), new TokenManager_1.TokenManager(), new HashManager_1.HashManager()));
exports.usersRouter.post("/signup", userController.userSignup);
exports.usersRouter.post("/login", userController.userLogin);
//# sourceMappingURL=UserRouter.js.map