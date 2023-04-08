import { Request, Response } from "express"
import { BaseError } from "../Error/BaseError"
import { CommentBusiness } from "../Business/CommentBusiness"
import { CreateCommentsInputDTO, GetCommentInputDTO, LikedislikeCommentInputDTO } from "../Dtos/CommentsDto"

export class CommentController {
    constructor(
        private commentBusiness: CommentBusiness
    ) {}

    public commentsGet = async (req: Request, res: Response) => {
        try {
           const input: GetCommentInputDTO = {
            post_id:req.params.id,
            token: req.headers.authorization
           }
           const output = await this.commentBusiness.commentsGet(input)
           res.status(200).send(output)
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }


    public getCommentsByPostId = async (req: Request, res: Response) => {

        try {
            const input: GetCommentInputDTO = {
                post_id: req.params.id,
                token: req.headers.authorization
            }
 
            const output = await this.commentBusiness.getCommentsByPostId(input)

            res.status(200).send(output)

        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado.")
            }
        }
    }


    public commentsCreate = async (req: Request, res: Response) => {
        try {
            const input: CreateCommentsInputDTO = {
                post_id: req.params.id,
                token: req.headers.authorization,
                content: req.body.content
            }
           
           const output = await this.commentBusiness.commentsCreate(input)

            res.status(201).send(output)
            
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }  
        }
    }


    public commentsLikeOrDislike = async (req: Request, res: Response) => {
        try {
            const input:LikedislikeCommentInputDTO = {
                idLikeDislike: req.params.id,
                token: req.headers.authorization,
                like:req.body.like
            }

            await this.commentBusiness.commentsLikeOrDislike(input)
            res.status(200).end()
        
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
            
        }
    }
}