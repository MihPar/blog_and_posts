import { HTTP_STATUS } from './../utils';
import {
  blogId,
  content,
  inputValueMiddleware,
  postTitleValidation,
  shortDescriptionTitleValidation,
} from "../middleware/posts_input_value_middleware";
import { postsRepositories } from "./../repositories/posts_repositories";
import { Router, Request, Response } from "express";

export const postsRouter = Router({});

/************************************ get *********************************/
postsRouter.get("/", function (req: Request, res: Response) {
  const result = postsRepositories.findPosts(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId, req.body.blogName);
  res.status(200).send(result);
});

/************************************ post *********************************/

postsRouter.post(
  "/",
  postTitleValidation,
  shortDescriptionTitleValidation,
  content,
  blogId,
  inputValueMiddleware,
  function (req: Request, res: Response) {
	const newPost = postsRepositories.createPost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId, req.body.blogName)
	if(newPost) {
		res.status(201).send(newPost)
	} else {
		res.status(HTTP_STATUS.BAD_REQUEST_400)
	}
  }
);

/************************************ get{id} *********************************/

postsRouter.get(
  "/:id",
  postTitleValidation,
  shortDescriptionTitleValidation,
  content,
  blogId,
  inputValueMiddleware,
  function(req: Request, res: Response) {
	const post = postsRepositories.findPostId(req.params.id)
	if(post) {
		res.status(HTTP_STATUS.OK_200).send(post)
	} else {
		res.status(HTTP_STATUS.NOT_FOUND_404)
	}
  }
);

/************************************ put{id} *********************************/

postsRouter.put(
  "/:id",
  postTitleValidation,
  shortDescriptionTitleValidation,
  content,
  blogId,
  function(req: Request, res: Response) {
	const isUpdatePost = postsRepositories.updatePostId(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
	if(isUpdatePost) {
		const findNewPost = postsRepositories.findPostId(req.params.id)
		res.status(HTTP_STATUS.NO_CONTENT_204)
	} else {
		res.status(HTTP_STATUS.NOT_FOUND_404)
	}
  }
);

/************************************ delete{id} *********************************/

postsRouter.delete('/:id', function(req: Request, res: Response) {
	const findPost = postsRepositories.deletePost(req.params.id)
	if(findPost) {
		res.status(HTTP_STATUS.NO_CONTENT_204)
	} else {
		res.status(HTTP_STATUS.NOT_FOUND_404)
	}
})

postsRouter.delete('/', function(req: Request, res: Response) {
	const deletedAllPosts = postsRepositories.postsRepositories()
	res.status(HTTP_STATUS.NO_CONTENT_204).send(deletedAllPosts)
})
