import { Request, Response } from "express"
import { CreatePostsInputDTO, DeletePostInputDTO, EditPostInputDTO, GetPostByIdInputDTO, GetPostInputDTO, LikedislikeInputDTO } from "../Dtos/UserDto"
import { BaseError } from "../Error/BaseError"
import { postBusiness } from "../Business/PostBusiness"

export class PostController {
    constructor(
        private postBusiness: postBusiness
    ) {}

    public postsGet = async (req: Request, res: Response) => {
        try {
           const input: GetPostInputDTO = {
            token: req.headers.authorization
           }
           const output = await this.postBusiness.postsGet(input)
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


    public postsGetById = async (req: Request, res: Response) => {
        try {
            const input: GetPostByIdInputDTO = {
                id: req.params.id,
                token: req.headers.authorization,
            }
            const output = await this.postBusiness.postsGetById(input)
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



    public postsCreate = async (req: Request, res: Response) => {
        try {
            const input: CreatePostsInputDTO = {
                token: req.headers.authorization,
                content: req.body.content
            }
           
            await this.postBusiness.postsCreate(input)
            

            res.status(201).end()
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }  
        }
    }

    public postsEdit = async (req: Request, res: Response) => {
        try {
            const input: EditPostInputDTO = {
                idToEdit: req.params.id,
                content: req.body.content,
                token: req.headers.authorization
            }
            await this.postBusiness.postsEdit(input)
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

    public postsDelete = async (req: Request, res: Response) => {
        try {
           const input: DeletePostInputDTO = {
            idToDelete: req.params.id,
            token: req.headers.authorization
           }
           await this.postBusiness.postsDelete(input)
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

    public postsLikeOrDislike = async (req: Request, res: Response) => {
        try {
            const input:LikedislikeInputDTO = {
                idLikeDislike: req.params.id,
                token: req.headers.authorization,
                like:req.body.like
            }
        console.log(input, "OOOOOOOOO")

            await this.postBusiness.postsLikeOrDislike(input)
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