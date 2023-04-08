"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeDislikePost = void 0;
class LikeDislikePost {
    constructor(userId, postId, like) {
        this.userId = userId;
        this.postId = postId;
        this.like = like;
    }
    toDBModel() {
        return {
            user_id: this.userId,
            post_id: this.postId,
            like: this.like
        };
    }
    getUserId() {
        return this.userId;
    }
    setUserId(value) {
        this.userId = value;
    }
    getPostId() {
        return this.postId;
    }
    setPostId(value) {
        this.postId = value;
    }
    getLike() {
        return this.like;
    }
    setLike(value) {
        this.like = value;
    }
}
exports.LikeDislikePost = LikeDislikePost;
//# sourceMappingURL=LIkeDIslikePost.js.map