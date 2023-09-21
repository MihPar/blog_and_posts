import {ValueMiddleware} from '../middleware/validatorMiddleware'
import { HTTP_STATUS } from "./../utils";
import { Router, Request, Response } from "express";
import { blogs } from "../db/db_blogs";
import { blogsRepositories } from "../repositories/blogs_repositories";
import {
  inputBlogsDescriptionValidation,
  inputBlogsNameValidation,
  inputBlogsWebsiteUrlValidation,
} from "../middleware/blogs_input_value_middleware";
import { authGuardMiddleware } from "../middleware/authGuardMiddleware";

export const blogsRouter = Router({});

/************************************ get ***************************/

blogsRouter.get("/", function (req: Request, res: Response) {
  res.status(200).send(blogs);
});

/************************************ post ***************************/

blogsRouter.post(
  "/",
  authGuardMiddleware,
  inputBlogsNameValidation,
  inputBlogsDescriptionValidation,
  inputBlogsWebsiteUrlValidation,
  ValueMiddleware,
  function (req: Request, res: Response) {
    const newBlogs = blogsRepositories.createNewBlogs(
      req.body.id,
      req.body.name,
      req.body.description,
      req.body.websiteUrl
    );
    if (newBlogs) {
      res.sendStatus(HTTP_STATUS.CREATED_201);
    } else {
      res.sendStatus(HTTP_STATUS.BAD_REQUEST_400);
    }
  }
);

/************************************ get{id} ***************************/

blogsRouter.get("/:id", function (req: Request, res: Response) {
  const blog = blogsRepositories.findBlogsId(req.params.id);
  if (blog) {
    res.status(HTTP_STATUS.OK_200).send(blog);
  } else {
    res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
  }
});

/************************************ put{id} ***************************/

blogsRouter.put(
  "/:id/",
  authGuardMiddleware,
  inputBlogsNameValidation,
  inputBlogsDescriptionValidation,
  inputBlogsWebsiteUrlValidation,
  ValueMiddleware,
  function (req: Request, res: Response) {
    const isUpdateBlog = blogsRepositories.updateBlog(
      req.params.id,
      req.body.name,
      req.body.description,
      req.body.websiteUrl
    );
    if (isUpdateBlog) {
      const findBlog = blogsRepositories.findBlogsId(req.params.id);
      res.status(HTTP_STATUS.NO_CONTENT_204).send("No content");
    } else {
      res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    }
  }
);

blogsRouter.delete("/:id", function (req: Request, res: Response) {
  const findBlog = blogsRepositories.deletedBlogsId(req.params.id);
  if (findBlog) {
    res.status(HTTP_STATUS.NO_CONTENT_204).send("No content");
  } else {
    res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
  }
});
