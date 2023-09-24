import { Router, Request, Response } from "express"
import { postsRepositories } from "../repositories/posts_repositories"
import { blogsRepositories } from "../repositories/blogs_repositories"
import { HTTP_STATUS } from "../utils"

export const deletedAllRouter = Router({})

deletedAllRouter.delete('/', function(req: Request, res: Response) {
	postsRepositories.deletedPosts()
	blogsRepositories.deletedBlogs()
	return res.status(HTTP_STATUS.NO_CONTENT_204)
})