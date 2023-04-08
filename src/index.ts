import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { usersRouter } from './Routers/UserRouter'
import { postsRouter } from './Routers/PostsRouter'
import { commentsRouter } from './Routers/CommentsRouter'


dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.listen(Number(process.env.PORT), () => {
    console.log(`Servidor rodando na porta ${Number(process.env.PORT)}`)
})
app.use("/users", usersRouter)
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter)