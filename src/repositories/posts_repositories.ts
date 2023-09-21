import { obj, posts } from "../db/db_posts"


export const postsRepositories = {
  findPosts(
    id: string,
    title: string,
    shortDescription: string,
    content: string,
	blogId: string,
	blogName: string
  ) {
    if (title) {
      const filteredPosts = posts.filter(function (p: any) {
        return p.title.indexOf(title) > -1;
      });
      return filteredPosts;
    } else {
      return posts;
    }
  },
  createPost(
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
  ) {
    const newPost: obj = {
      id: new Date().toISOString(),
      title: title,
      shortDescription: shortDescription,
      content: content,
      blogId: blogId,
      blogName: blogName,
    };
    posts.push(newPost);
    return newPost;
  },
  findPostId(id: string) {
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
    const updatePost = posts.find((p) => (p.id = id));
    if (updatePost) {
      updatePost.title = title;
      updatePost.shortDescription = shortDescription;
      updatePost.content = content;
      updatePost.blogId = blogId;
      return true;
    } else {
      return false;
    }
  },
  deletePost(id: string) {
    for (let i = 0; i < posts.length; i++) {
      if ((posts[i].id = id)) {
        posts.splice(i, 1);
        return true;
      }
    }
    return false;
  },
  postsRepositories() {
    const deletedAllPosts = posts.slice(0, posts.length);
    return deletedAllPosts;
  },
};