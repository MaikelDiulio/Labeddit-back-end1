"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeDislikeComment = void 0;
class LikeDislikeComment {
    constructor(userId, commentId, like) {
        this.userId = userId;
        this.commentId = commentId;
        this.like = like;
    }
    toDBModel() {
        return {
            user_id: this.userId,
            comments_id: this.commentId,
            like: this.like
        };
    }
    getUserId() {
        return this.userId;
    }
    setUserId(value) {
        this.userId = value;
    }
    getCommentId() {
        return this.commentId;
    }
    setCommentId(value) {
        this.commentId = value;
    }
    getLike() {
        return this.like;
    }
    setLike(value) {
        this.like = value;
    }
}
exports.LikeDislikeComment = LikeDislikeComment;
//# sourceMappingURL=LIkeDislikeComment.js.map