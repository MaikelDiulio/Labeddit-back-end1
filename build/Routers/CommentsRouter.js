"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRouter = void 0;
const express_1 = __importDefault(require("express"));
const CommentBusiness_1 = require("../Business/CommentBusiness");
const CommentDataBase_1 = require("../database/CommentDataBase");
const CommentController_1 = require("../Controller/CommentController");
const IdGenerator_1 = require("../Services/IdGenerator");
const PostDataBase_1 = require("../database/PostDataBase");
const UserDataBase_1 = require("../database/UserDataBase");
const TokenManager_1 = require("../Services/TokenManager");
exports.commentsRouter = express_1.default.Router();
const commentController = new CommentController_1.CommentController(new CommentBusiness_1.CommentBusiness(new CommentDataBase_1.CommentDatabase, new IdGenerator_1.IdGenerator(), new TokenManager_1.TokenManager(), new PostDataBase_1.PostDatabase, new UserDataBase_1.UserDatabase));
exports.commentsRouter.get("/:id", commentController.commentsGet);
exports.commentsRouter.get("/post/:id", commentController.getCommentsByPostId);
exports.commentsRouter.post("/:id", commentController.commentsCreate);
exports.commentsRouter.put("/:id/like", commentController.commentsLikeOrDislike);
//# sourceMappingURL=CommentsRouter.js.map