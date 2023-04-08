"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserRouter_1 = require("./Routers/UserRouter");
const PostsRouter_1 = require("./Routers/PostsRouter");
const CommentsRouter_1 = require("./Routers/CommentsRouter");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.listen(Number(process.env.PORT), () => {
    console.log(`Servidor rodando na porta ${Number(process.env.PORT)}`);
});
app.use("/users", UserRouter_1.usersRouter);
app.use("/posts", PostsRouter_1.postsRouter);
app.use("/comments", CommentsRouter_1.commentsRouter);
//# sourceMappingURL=index.js.map