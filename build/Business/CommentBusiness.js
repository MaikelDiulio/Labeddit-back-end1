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
exports.CommentBusiness = void 0;
const BadRequerstError_1 = require("../Error/BadRequerstError");
const Comments_1 = require("../Models/Comments");
const types_1 = require("../types");
const NotFoundError_1 = require("../Error/NotFoundError");
class CommentBusiness {
    constructor(commentDatabase, idGenerator, tokenManager, postDatabase, userDatabase) {
        this.commentDatabase = commentDatabase;
        this.idGenerator = idGenerator;
        this.tokenManager = tokenManager;
        this.postDatabase = postDatabase;
        this.userDatabase = userDatabase;
        this.commentsGet = (input) => __awaiter(this, void 0, void 0, function* () {
            const { post_id, token } = input;
            if (token === undefined) {
                throw new BadRequerstError_1.BadRequestError("token não existe");
            }
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequerstError_1.BadRequestError("token inválido/errado");
            }
            const commentsWithId = yield this.commentDatabase.getAllComments(post_id);
            const getUsers = yield this.userDatabase.getAllUsers();
            const getcommentary = commentsWithId.map((comment) => {
                const userSearch = getUsers.find((user) => user.id === comment.creator_id);
                if (!userSearch) {
                    throw new NotFoundError_1.NotFoundError("Usuário não encontrado");
                }
                const userComentary = {
                    id: userSearch.id,
                    name: userSearch.name,
                    role: userSearch.role
                };
                const comments = new Comments_1.Comment(comment.id, comment.content, comment.likes, comment.dislikes, comment.created_at, comment.updated_at, comment.post_id, userComentary);
                return comments.toBusinessModel();
            });
            const output = getcommentary;
            return output;
        });
        this.getCommentsByPostId = (input) => __awaiter(this, void 0, void 0, function* () {
            const { post_id, token } = input;
            if (token === undefined) {
                throw new BadRequerstError_1.BadRequestError("ERRO: É preciso enviar um token.");
            }
            const tokenValid = this.tokenManager.getPayload(token);
            if (tokenValid === null) {
                throw new BadRequerstError_1.BadRequestError("ERRO: O token é inválido.");
            }
            const commentsByPostIdDB = yield this.commentDatabase.getCommentsByPostId(post_id);
            let userWithComments = [];
            for (const comment of commentsByPostIdDB) {
                const userDB = yield this.commentDatabase.getUserById(comment.creator_id);
                const styleGetComment = {
                    id: comment.id,
                    creatorNickName: userDB.name,
                    comment: comment.content,
                    likes: comment.likes,
                    dislikes: comment.dislikes,
                };
                userWithComments.push(styleGetComment);
            }
            return userWithComments;
        });
        this.commentsCreate = (input) => __awaiter(this, void 0, void 0, function* () {
            const { post_id, token, content } = input;
            if (typeof post_id !== "string") {
                throw new BadRequerstError_1.BadRequestError("'post_id' não é uma string");
            }
            if (typeof token !== "string") {
                throw new BadRequerstError_1.BadRequestError("'token' não é uma string");
            }
            if (typeof content !== "string") {
                throw new BadRequerstError_1.BadRequestError("'content' não é uma string");
            }
            if (token === undefined) {
                throw new BadRequerstError_1.BadRequestError("token não existe");
            }
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequerstError_1.BadRequestError("token inválido");
            }
            const searchPostById = yield this.postDatabase.findId(post_id);
            if (!searchPostById) {
                throw new BadRequerstError_1.BadRequestError("'Post' não encontrado");
            }
            const id = this.idGenerator.generate();
            const createdAt = new Date().toISOString();
            const updatedAt = new Date().toISOString();
            const comment = new Comments_1.Comment(id, content, 0, 0, createdAt, updatedAt, post_id, payload);
            const commentDB = comment.toDBModel();
            yield this.commentDatabase.insert(commentDB);
            yield this.commentDatabase.updateNumberComments(id, 1);
        });
        this.commentsLikeOrDislike = (input) => __awaiter(this, void 0, void 0, function* () {
            const { idLikeDislike, token, like } = input;
            if (token === undefined) {
                throw new BadRequerstError_1.BadRequestError("token não existe");
            }
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequerstError_1.BadRequestError("token inválido");
            }
            if (typeof like !== "boolean") {
                throw new BadRequerstError_1.BadRequestError("'like' deve ser boolean");
            }
            const commentWithCreatorDB = yield this.commentDatabase.findCommentIfCreatorById(idLikeDislike);
            if (!commentWithCreatorDB) {
                throw new NotFoundError_1.NotFoundError("'id' não encontrado");
            }
            const creatorId = payload.id;
            const likeSQlite = like ? 1 : 0;
            const role = payload.role;
            const name = payload.name;
            const likeDislikeDB = {
                user_id: creatorId,
                comments_id: commentWithCreatorDB.id,
                like: likeSQlite
            };
            const creator = {
                id: creatorId,
                name,
                role
            };
            const comment = new Comments_1.Comment(commentWithCreatorDB.id, commentWithCreatorDB.content, commentWithCreatorDB.likes, commentWithCreatorDB.dislikes, commentWithCreatorDB.created_at, commentWithCreatorDB.updated_at, commentWithCreatorDB.post_id, creator);
            const likedislikeExists = yield this.commentDatabase
                .findLikeDislike(likeDislikeDB);
            if (likedislikeExists === types_1.COMMENT_LIKE.ALREADY_LIKED) {
                if (like) {
                    yield this.commentDatabase.removeLikeDislike(likeDislikeDB);
                    comment.removeLike();
                }
                else {
                    yield this.commentDatabase.updateLikeDislike(likeDislikeDB);
                    comment.removeLike();
                    comment.addDislike();
                }
            }
            else if (likedislikeExists === types_1.COMMENT_LIKE.ALREADY_DISLIKED) {
                if (like) {
                    yield this.commentDatabase.updateLikeDislike(likeDislikeDB);
                    comment.removeDislike();
                    comment.addLike();
                }
                else {
                    yield this.commentDatabase.removeLikeDislike(likeDislikeDB);
                    comment.removeDislike();
                }
            }
            else {
                yield this.commentDatabase.commentsLikeOrDislike(likeDislikeDB);
                if (like) {
                    comment.addLike();
                }
                else {
                    comment.addDislike();
                }
            }
            const updateCommentDB = comment.toDBModel();
            yield this.commentDatabase.update(idLikeDislike, updateCommentDB);
        });
    }
}
exports.CommentBusiness = CommentBusiness;
//# sourceMappingURL=CommentBusiness.js.map