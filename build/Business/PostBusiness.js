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
exports.postBusiness = void 0;
const BadRequerstError_1 = require("../Error/BadRequerstError");
const NotFoundError_1 = require("../Error/NotFoundError");
const Post_1 = require("../Models/Post");
const types_1 = require("../types");
class postBusiness {
    constructor(postDatabase, idGenerator, tokenManager) {
        this.postDatabase = postDatabase;
        this.idGenerator = idGenerator;
        this.tokenManager = tokenManager;
        this.postsGet = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token } = input;
            if (token === undefined) {
                throw new BadRequerstError_1.BadRequestError("token não existe");
            }
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequerstError_1.BadRequestError("token inválido");
            }
            const postsAndItsCreatorsDB = yield this.postDatabase.getPostIfCreator();
            const posts = postsAndItsCreatorsDB.map((postAndCreatorDB) => {
                const post = new Post_1.Post(postAndCreatorDB.id, postAndCreatorDB.content, postAndCreatorDB.likes, postAndCreatorDB.dislikes, postAndCreatorDB.comments, postAndCreatorDB.created_at, postAndCreatorDB.updated_at, postAndCreatorDB.creator_id, postAndCreatorDB.creator_name);
                return post.toBusinessModel();
            });
            const output = posts;
            return output;
        });
        this.postsGetById = (input) => __awaiter(this, void 0, void 0, function* () {
            const { id, token } = input;
            if (!token) {
                throw new BadRequerstError_1.BadRequestError("ERRO: O token precisa ser informado.");
            }
            const tokenValid = this.tokenManager.getPayload(token);
            if (tokenValid === null) {
                throw new BadRequerstError_1.BadRequestError("ERRO: O token é inválido.");
            }
            const savePostsbyIdDB = yield this.postDatabase.postsGetById(id);
            if (!id) {
                throw new BadRequerstError_1.BadRequestError("ERRO: O id não existe.");
            }
            if (!savePostsbyIdDB) {
                throw new BadRequerstError_1.BadRequestError("ERRO: Post não encontrado.");
            }
            const instancePost = new Post_1.Post(savePostsbyIdDB.id, savePostsbyIdDB.content, savePostsbyIdDB.likes, savePostsbyIdDB.dislikes, savePostsbyIdDB.comments, savePostsbyIdDB.created_at, savePostsbyIdDB.updated_at, savePostsbyIdDB.creator_id, savePostsbyIdDB.creator_name);
            const postBusiness = instancePost.toBusinessModel();
            const idCreator = instancePost.getCreatorId();
            const userDB = yield this.postDatabase.getUserById(idCreator);
            const styleGetPost = Object.assign(Object.assign({}, postBusiness), { name: userDB.name });
            return styleGetPost;
        });
        this.postsCreate = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, content } = input;
            if (token === undefined) {
                throw new BadRequerstError_1.BadRequestError("token não existe");
            }
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequerstError_1.BadRequestError("token inválido");
            }
            if (typeof content !== "string") {
                throw new BadRequerstError_1.BadRequestError("'content' deve ser string");
            }
            const id = this.idGenerator.generate();
            const createdAt = new Date().toISOString();
            const updatedAt = new Date().toISOString();
            const creatorId = payload.id;
            const creatorName = payload.name;
            const post = new Post_1.Post(id, content, 0, 0, 0, createdAt, updatedAt, creatorId, creatorName);
            const postDB = post.toDBModel();
            yield this.postDatabase.insert(postDB);
        });
        this.postsEdit = (input) => __awaiter(this, void 0, void 0, function* () {
            const { idToEdit, token, content } = input;
            if (token === undefined) {
                throw new BadRequerstError_1.BadRequestError("token não existe");
            }
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequerstError_1.BadRequestError("token inválido");
            }
            if (typeof content !== "string") {
                throw new BadRequerstError_1.BadRequestError("content deve ser string");
            }
            const postDB = yield this.postDatabase.findId(idToEdit);
            if (!postDB) {
                throw new NotFoundError_1.NotFoundError("'id' não encontrado");
            }
            const creatorId = payload.id;
            if (postDB.creator_id !== creatorId) {
                throw new BadRequerstError_1.BadRequestError("Edição realizada somente pelo criador");
            }
            const creatorName = payload.name;
            const post = new Post_1.Post(postDB.id, postDB.content, postDB.likes, postDB.dislikes, postDB.comments, postDB.created_at, postDB.updated_at, creatorId, creatorName);
            post.setContent(content);
            post.setUpdateAt(new Date().toISOString());
            const toUpdatePostDB = post.toDBModel();
            yield this.postDatabase.update(idToEdit, toUpdatePostDB);
        });
        this.postsDelete = (input) => __awaiter(this, void 0, void 0, function* () {
            const { idToDelete, token } = input;
            if (token === undefined) {
                throw new BadRequerstError_1.BadRequestError("token não existe");
            }
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequerstError_1.BadRequestError("token inválido");
            }
            const postDB = yield this.postDatabase.findId(idToDelete);
            if (!postDB) {
                throw new NotFoundError_1.NotFoundError("'id' não encontrado");
            }
            const creatorId = payload.id;
            if (payload.role !== types_1.USER_ROLES.ADMIN &&
                postDB.creator_id !== creatorId) {
                throw new BadRequerstError_1.BadRequestError("Só pode ser deletado pelo criador ");
            }
            yield this.postDatabase.delete(idToDelete);
        });
        this.postsLikeOrDislike = (input) => __awaiter(this, void 0, void 0, function* () {
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
            const postWithCreatorDB = yield this.postDatabase.findPostIfCreatorById(idLikeDislike);
            if (!postWithCreatorDB) {
                throw new NotFoundError_1.NotFoundError("'id' não encontrado");
            }
            const creatorId = payload.id;
            const likeSQlite = like ? 1 : 0;
            const likeDislikeDB = {
                user_id: creatorId,
                post_id: postWithCreatorDB.id,
                like: likeSQlite
            };
            const post = new Post_1.Post(postWithCreatorDB.id, postWithCreatorDB.content, postWithCreatorDB.likes, postWithCreatorDB.dislikes, postWithCreatorDB.comments, postWithCreatorDB.created_at, postWithCreatorDB.updated_at, postWithCreatorDB.creator_id, postWithCreatorDB.creator_name);
            const likedislikeExists = yield this.postDatabase
                .findLikeDislike(likeDislikeDB);
            if (likedislikeExists === types_1.POST_LIKE.ALREADY_LIKED) {
                if (like) {
                    yield this.postDatabase.removeLikeDislike(likeDislikeDB);
                    post.removeLike();
                }
                else {
                    yield this.postDatabase.updateLikeDislike(likeDislikeDB);
                    post.removeLike();
                    post.addDislike();
                }
            }
            else if (likedislikeExists === types_1.POST_LIKE.ALREADY_DISLIKED) {
                if (like) {
                    yield this.postDatabase.updateLikeDislike(likeDislikeDB);
                    post.removeDislike();
                    post.addLike();
                }
                else {
                    yield this.postDatabase.removeLikeDislike(likeDislikeDB);
                    post.removeDislike();
                }
            }
            else {
                yield this.postDatabase.postsLikeOrDislike(likeDislikeDB);
                if (like) {
                    post.addLike();
                }
                else {
                    post.addDislike();
                }
            }
            const updatePostDB = post.toDBModel();
            yield this.postDatabase.update(idLikeDislike, updatePostDB);
        });
    }
}
exports.postBusiness = postBusiness;
//# sourceMappingURL=PostBusiness.js.map