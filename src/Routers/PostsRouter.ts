import express  from "express"
import { postBusiness } from "../Business/PostBusiness"
import { PostController } from "../Controller/PostController"
import { PostDatabase } from "../database/PostDataBase"
import { IdGenerator } from "../Services/IdGenerator"
import { TokenManager } from "../Services/TokenManager"

export const postsRouter = express.Router()

const postController =  new PostController(
    new postBusiness(
        new PostDatabase,
        new IdGenerator(),
        new TokenManager()
    )
) 

postsRouter.get("/", postController.postsGet )
postsRouter.get("/:id", postController.postsGetById )
postsRouter.post("/", postController.postsCreate )
postsRouter.put("/:id", postController.postsEdit )
postsRouter.delete("/:id", postController.postsDelete)
postsRouter.put("/:id/like", postController.postsLikeOrDislike)