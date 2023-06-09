import { Request, Response } from "express"
import { LoginInputDTO, SignupInputDTO } from "../Dtos/UserDto"
import { BaseError } from "../Error/BaseError"
import { UserBusiness } from "../Business/UserBusiness"



export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ){}

    public userSignup = async (req: Request, res: Response) => {
        try {
            const input: SignupInputDTO ={
                name: req. body.name, 
                email: req.body.email, 
                password: req.body.password
            }
            
            const output = await this.userBusiness.userSignup (input)
           

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

    public userLogin = async (req: Request, res: Response) =>{
        try {
            const input: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            }
            const output = await this.userBusiness.userLogin(input)
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
}