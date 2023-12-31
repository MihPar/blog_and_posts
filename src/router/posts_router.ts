import {ValueMiddleware} from '../middleware/validatorMiddleware'
import { HTTP_STATUS } from './../utils';
import {
  blogId,
  content,
  postTitleValidation,
  shortDescriptionTitleValidation,
} from "../middleware/posts_input_value_middleware";
import { postsRepositories } from "./../repositories/posts_repositories";
import { Router, Request, Response } from "express";
import { posts } from '../db/db_posts';
import { authGuardMiddleware } from '../middleware/authGuardMiddleware';
import { blogs } from '../db/db_blogs';

export const postsRouter = Router({});

/************************************ get *********************************/
postsRouter.get("/", function (req: Request, res: Response) {
  res.status(HTTP_STATUS.OK_200).send(posts);
});

/************************************ post *********************************/

postsRouter.post(
  "/",
  authGuardMiddleware,
  postTitleValidation,
  shortDescriptionTitleValidation,
  content,
  blogId,
  ValueMiddleware,
  function (req: Request, res: Response) {
		const newPost = postsRepositories.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
	return res.status(HTTP_STATUS.CREATED_201).send(newPost)
  }
);

/************************************ get{id} *********************************/

postsRouter.get(
  "/:id",
  function(req: Request, res: Response) {
	const post = postsRepositories.findPostId(req.params.id)
	if(!post) {
		res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
	} else {
		res.status(HTTP_STATUS.OK_200).send(post)
	}
  }
);

/************************************ put{id} *********************************/

postsRouter.put(
  "/:id",
  authGuardMiddleware,
  postTitleValidation,
  shortDescriptionTitleValidation,
  content,
  blogId,
  ValueMiddleware,
  function(req: Request, res: Response) {
	const isUpdatePost = postsRepositories.updatePostId(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
	if(!isUpdatePost) {
		res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
	} else {
		// const findPost = postsRepositories.findPostId(req.params.id)
		res.status(HTTP_STATUS.NO_CONTENT_204).send('No content')
	}
  }
);

/************************************ delete{id} *********************************/

postsRouter.delete('/:id', authGuardMiddleware, function(req: Request, res: Response) {
	const findPost = postsRepositories.deletePost(req.params.id)
	if(!findPost) {
		res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
	} else {
		res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
	}
})