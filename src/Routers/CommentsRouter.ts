import express  from "express"
import { CommentBusiness } from "../Business/CommentBusiness"
import { CommentDatabase } from "../database/CommentDataBase"
import { CommentController } from "../Controller/CommentController"
import { IdGenerator } from "../Services/IdGenerator"
import { PostDatabase } from "../database/PostDataBase"
import { UserDatabase } from "../database/UserDataBase"
import { TokenManager } from "../Services/TokenManager"


export const commentsRouter = express.Router()

const commentController =  new CommentController(
    new CommentBusiness(
        new CommentDatabase,
        new IdGenerator(),
        new TokenManager(),
        new PostDatabase,
        new UserDatabase
    )
) 

commentsRouter.get("/:id", commentController.commentsGet)
commentsRouter.get("/post/:id", commentController.getCommentsByPostId)
commentsRouter.post("/:id", commentController.commentsCreate)
commentsRouter.put("/:id/like", commentController.commentsLikeOrDislike)