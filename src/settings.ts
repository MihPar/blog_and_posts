import express from 'express'
import { postsRouter } from "./router/posts_router"
import { blogsRouter } from "./router/blogs_router"
import { deletedAllRouter } from "./router/deletedAllRouter"

export const startApp = () => {
	const app = express()
	app.use(express.json())
	app.use('/posts', postsRouter)
	app.use('/blogs', blogsRouter)
	app.use('/testing/all-data', deletedAllRouter)
	return app;
}