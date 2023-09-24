import { blogs } from "../db/db_blogs";
import { Obj, posts } from "../db/db_posts"


export const postsRepositories = {
  createPost(
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
	blogName: string
  ) {

    const newPost: Obj = {
      id: new Date().toISOString(),
      title,
      shortDescription,
      content,
      blogId,
	  blogName,
    };
    posts.push(newPost);
    return posts;
  },
  findPostId(id: string): Obj | undefined {
    const post = posts.find((p) => p.id === id);
    return post;
  },
  updatePostId(
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
  ) {
    const findPost = posts.find((p) => p.id === id);
    if (findPost) {
      findPost.title = title;
      findPost.shortDescription = shortDescription;
      findPost.content = content;
      findPost.blogId = blogId;
      return true;
    } else {
      return false;
    }
  },
  deletePost(id: string) {
    for (let i = 0; i < posts.length; i++) {
      if ((posts[i].id === id)) {
        posts.splice(i, 1);
        return true;
      }
    }
    return false;
  },
  deletedPosts() {
    const deletedAllPosts = posts.slice(0, posts.length);
    return deletedAllPosts;
  },
};