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
exports.PostController = void 0;
const BaseError_1 = require("../Error/BaseError");
class PostController {
    constructor(postBusiness) {
        this.postBusiness = postBusiness;
        this.postsGet = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization
                };
                const output = yield this.postBusiness.postsGet(input);
                res.status(200).send(output);
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.postsGetById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    id: req.params.id,
                    token: req.headers.authorization,
                };
                const output = yield this.postBusiness.postsGetById(input);
                res.status(200).send(output);
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado.");
                }
            }
        });
        this.postsCreate = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization,
                    content: req.body.content
                };
                yield this.postBusiness.postsCreate(input);
                res.status(201).end();
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.postsEdit = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    idToEdit: req.params.id,
                    content: req.body.content,
                    token: req.headers.authorization
                };
                yield this.postBusiness.postsEdit(input);
                res.status(200).end();
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.postsDelete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    idToDelete: req.params.id,
                    token: req.headers.authorization
                };
                yield this.postBusiness.postsDelete(input);
                res.status(200).end();
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.postsLikeOrDislike = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    idLikeDislike: req.params.id,
                    token: req.headers.authorization,
                    like: req.body.like
                };
                console.log(input, "OOOOOOOOO");
                yield this.postBusiness.postsLikeOrDislike(input);
                res.status(200).end();
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
    }
}
exports.PostController = PostController;
//# sourceMappingURL=PostController.js.map