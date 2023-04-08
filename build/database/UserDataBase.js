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
exports.UserDatabase = void 0;
const BaseDataBase_1 = require("./BaseDataBase");
class UserDatabase extends BaseDataBase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.getAllUsers = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDataBase_1.BaseDatabase
                .connection(UserDatabase.TABLE_USERS);
            return result;
        });
    }
    insertUser(newUserDB) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDataBase_1.BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
                .insert(newUserDB);
        });
    }
    findUserEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const [userDB] = yield BaseDataBase_1.BaseDatabase
                .connection(UserDatabase.TABLE_USERS).select()
                .where({ email });
            return userDB;
        });
    }
}
UserDatabase.TABLE_USERS = "users";
exports.UserDatabase = UserDatabase;
//# sourceMappingURL=UserDataBase.js.map