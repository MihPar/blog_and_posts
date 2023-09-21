import express from 'express'
import bodyParser from 'express'
import { postsRouter } from './router/posts_router'
// import { blogsRouter } from './router/blogs_router'

export const app = express()

app.use(bodyParser())
app.use('/posts', postsRouter)
// app.use('/blogs', blogsRouter)
