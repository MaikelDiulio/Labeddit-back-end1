"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBusiness = void 0;
const BadRequerstError_1 = require("../Error/BadRequerstError");
const NotFoundError_1 = require("../Error/NotFoundError");
const User_1 = require("../Models/User");
const types_1 = require("../types");
class UserBusiness {
    constructor(userDatabase, idGenerator, tokenManager, hashManager) {
        this.userDatabase = userDatabase;
        this.idGenerator = idGenerator;
        this.tokenManager = tokenManager;
        this.hashManager = hashManager;
        this.userSignup = (input) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = input;
            if (typeof name !== "string") {
                throw new BadRequerstError_1.BadRequestError("'name' deve ser string");
            }
            if (typeof email !== "string") {
                throw new BadRequerstError_1.BadRequestError("'email' deve ser string");
            }
            if (typeof password !== "string") {
                throw new BadRequerstError_1.BadRequestError("'password' deve ser string");
            }
            const userDBExists = yield this.userDatabase.findUserEmail(email);
            if (userDBExists) {
                throw new Error("'email' ja existe");
            }
            const id = this.idGenerator.generate();
            const hashePassword = yield this.hashManager.hash(password);
            const role = types_1.USER_ROLES.USUARIO;
            const createdAt = new Date().toISOString();
            const newUser = new User_1.User(id, name, email, hashePassword, role, createdAt);
            const newUserDB = newUser.toDBModel();
            yield this.userDatabase.insertUser(newUserDB);
            const payload = {
                id: newUser.getId(),
                name: newUser.getName(),
                role: newUser.getRole()
            };
            const token = this.tokenManager.createToken(payload);
            const output = {
                token
            };
            return output;
        });
        this.userLogin = (input) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = input;
            if (typeof email !== "string") {
                throw new BadRequerstError_1.BadRequestError("'email'deve ser uma string");
            }
            if (typeof password !== "string") {
                throw new BadRequerstError_1.BadRequestError("'password' deve ser string");
            }
            const searchUserDB = yield this.userDatabase.findUserEmail(email);
            if (!searchUserDB) {
                throw new NotFoundError_1.NotFoundError("'email' não encontrado");
            }
            const user = new User_1.User(searchUserDB.id, searchUserDB.name, searchUserDB.email, searchUserDB.password, searchUserDB.role, searchUserDB.created_at);
            const hashePassword = user.getPassword();
            const correctPassword = yield this.hashManager.compare(password, hashePassword);
            if (!correctPassword) {
                throw new NotFoundError_1.NotFoundError("'email' ou 'password' incorretos");
            }
            const payload = {
                id: user.getId(),
                name: user.getName(),
                role: user.getRole()
            };
            const token = this.tokenManager.createToken(payload);
            const output = {
                token
            };
            return output;
        });
    }
}
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map