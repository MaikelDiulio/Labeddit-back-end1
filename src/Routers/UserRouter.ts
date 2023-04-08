import express from "express"
import { UserBusiness } from "../Business/UserBusiness"
import { UserController } from "../Controller/UserController"
import { HashManager } from "../Services/HashManager"
import { UserDatabase } from "../database/UserDataBase"
import { IdGenerator } from "../Services/IdGenerator"
import { TokenManager } from "../Services/TokenManager"



export const usersRouter = express.Router()


const userController =  new UserController(
    new UserBusiness(
        new UserDatabase(),
        new IdGenerator(),
        new TokenManager(),
        new HashManager()
    )
)
usersRouter.post("/signup", userController.userSignup )
usersRouter.post("/login", userController.userLogin )

