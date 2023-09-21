import {Router, Request, Response} from 'express'

export const blogsRouter = Router({})

blogsRouter.get('/', function(req: Request, res: Response) {
	res.send('Hello blogs')
})
