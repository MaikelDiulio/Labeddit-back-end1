"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = __importDefault(require("express"));
const PostBusiness_1 = require("../Business/PostBusiness");
const PostController_1 = require("../Controller/PostController");
const PostDataBase_1 = require("../database/PostDataBase");
const IdGenerator_1 = require("../Services/IdGenerator");
const TokenManager_1 = require("../Services/TokenManager");
exports.postsRouter = express_1.default.Router();
const postController = new PostController_1.PostController(new PostBusiness_1.postBusiness(new PostDataBase_1.PostDatabase, new IdGenerator_1.IdGenerator(), new TokenManager_1.TokenManager()));
exports.postsRouter.get("/", postController.postsGet);
exports.postsRouter.get("/:id", postController.postsGetById);
exports.postsRouter.post("/", postController.postsCreate);
exports.postsRouter.put("/:id", postController.postsEdit);
exports.postsRouter.delete("/:id", postController.postsDelete);
exports.postsRouter.put("/:id/like", postController.postsLikeOrDislike);
//# sourceMappingURL=PostsRouter.js.map