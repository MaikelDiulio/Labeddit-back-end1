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
exports.CommentDatabase = void 0;
const NotFoundError_1 = require("../Error/NotFoundError");
const types_1 = require("../types");
const BaseDataBase_1 = require("./BaseDataBase");
const PostDataBase_1 = require("./PostDataBase");
class CommentDatabase extends BaseDataBase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.getAllCommentIfCreator = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDataBase_1.BaseDatabase
                .connection(CommentDatabase.TABLE_COMMENTS)
                .select("comments.id", "comments.creator_id ", "comments.post_id ", "comments.content", "comments.likes", "comments.dislikes", "comments.created_at", "comments.updated_at", "users.name As creator_name")
                .join("users", "comments.creator_id", "=", "users.id");
            return result;
        });
        this.getAllComments = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield BaseDataBase_1.BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
                .where({ post_id: id });
        });
        this.insert = (commentDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDataBase_1.BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
                .insert(commentDB);
        });
        this.getCommentById = (id) => __awaiter(this, void 0, void 0, function* () {
            const [comment] = yield BaseDataBase_1.BaseDatabase
                .connection(CommentDatabase.TABLE_COMMENTS)
                .where({ id });
            return comment;
        });
        this.findCommentIfCreatorById = (commentId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDataBase_1.BaseDatabase
                .connection(CommentDatabase.TABLE_COMMENTS)
                .select("comments.id", "comments.creator_id ", "comments.post_id ", "comments.content", "comments.likes", "comments.dislikes", "comments.created_at", "comments.updated_at", "users.name As creator_name")
                .join("users", "comments.creator_id", "=", "users.id")
                .where("comments.id", commentId);
            return result[0];
        });
        this.findLikeDislike = (likeDislikeDBToFind) => __awaiter(this, void 0, void 0, function* () {
            const [likeDislikeDB] = yield BaseDataBase_1.BaseDatabase
                .connection(CommentDatabase.TABLE_LIKES_DISLIKES)
                .select()
                .where({
                user_id: likeDislikeDBToFind.user_id,
                comments_id: likeDislikeDBToFind.comments_id
            });
            if (likeDislikeDB) {
                return likeDislikeDB.like === 1 ? types_1.COMMENT_LIKE.ALREADY_LIKED : types_1.COMMENT_LIKE.ALREADY_DISLIKED;
            }
            else {
                return null;
            }
        });
        this.commentsLikeOrDislike = (likeDislike) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDataBase_1.BaseDatabase.connection(CommentDatabase.TABLE_LIKES_DISLIKES)
                .insert(likeDislike);
        });
        this.update = (id, commentDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDataBase_1.BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
                .update(commentDB)
                .where({ id });
        });
        this.removeLikeDislike = (likeDislikeDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDataBase_1.BaseDatabase.connection(CommentDatabase.TABLE_LIKES_DISLIKES)
                .delete()
                .where({
                user_id: likeDislikeDB.user_id,
                comments_id: likeDislikeDB.comments_id
            });
        });
        this.updateLikeDislike = (likeDislikeDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDataBase_1.BaseDatabase.connection(CommentDatabase.TABLE_LIKES_DISLIKES)
                .update(likeDislikeDB)
                .where({
                user_id: likeDislikeDB.user_id,
                comments_id: likeDislikeDB.comments_id
            });
        });
        this.getCommentsByPostId = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDataBase_1.BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
                .where({ post_id: id });
            return result;
        });
    }
    updateNumberComments(id, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentById = yield this.getCommentById(id);
            if (!commentById) {
                throw new NotFoundError_1.NotFoundError("Comment não existe");
            }
            const [post] = yield BaseDataBase_1.BaseDatabase
                .connection(PostDataBase_1.PostDatabase.TABLE_POSTS)
                .where({ id: commentById.post_id });
            if (!post) {
                throw new NotFoundError_1.NotFoundError("Post não encontrado");
            }
            const newCommentsCount = post.comments + value;
            yield BaseDataBase_1.BaseDatabase
                .connection(PostDataBase_1.PostDatabase.TABLE_POSTS)
                .where({ id: commentById.post_id })
                .update({ comments: newCommentsCount });
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDataBase_1.BaseDatabase
                .connection(CommentDatabase.TABLE_USERS)
                .select()
                .where({ id });
            return result[0];
        });
    }
}
CommentDatabase.TABLE_COMMENTS = "comments";
CommentDatabase.TABLE_LIKES_DISLIKES = "likes_dislikes_comments";
CommentDatabase.TABLE_USERS = "users";
exports.CommentDatabase = CommentDatabase;
//# sourceMappingURL=CommentDataBase.js.map