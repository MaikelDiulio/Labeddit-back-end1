"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
class Comment {
    constructor(id, content, likes, dislikes, createdAt, updatedAt, postId, creator) {
        this.id = id;
        this.content = content;
        this.likes = likes;
        this.dislikes = dislikes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.postId = postId;
        this.creator = creator;
    }
    toDBModel() {
        return {
            id: this.id,
            creator_id: this.creator.id,
            post_id: this.postId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        };
    }
    toBusinessModel() {
        return {
            id: this.id,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            postId: this.postId,
            creator: {
                id: this.id,
                name: this.creator.name,
            }
        };
    }
    getId() {
        return this.id;
    }
    setId(value) {
        this.id = value;
    }
    getContent() {
        return this.content;
    }
    setContent(value) {
        this.content = value;
    }
    getLikes() {
        return this.likes;
    }
    setLikes(value) {
        this.likes = value;
    }
    getDislikes() {
        return this.dislikes;
    }
    setDislikes(value) {
        this.dislikes = value;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    setCreatedAt(value) {
        this.createdAt = value;
    }
    getUpdateAt() {
        return this.updatedAt;
    }
    setUpdateAt(value) {
        this.updatedAt = value;
    }
    getpostId() {
        return this.postId;
    }
    setpostId(value) {
        this.postId = value;
    }
    getCreator() { return this.creator; }
    addLike() {
        this.likes += 1;
    }
    removeLike() {
        this.likes -= 1;
    }
    addDislike() {
        this.dislikes += 1;
    }
    removeDislike() {
        this.dislikes -= 1;
    }
}
exports.Comment = Comment;
//# sourceMappingURL=Comments.js.map