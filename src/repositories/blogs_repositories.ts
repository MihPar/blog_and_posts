import { blogs } from "../db/db_blogs";

export const blogsRepositories = {
  createNewBlogs(
    id: string,
    name: string,
    description: string,
    websiteUrl: string
  ) {
    const newBlogs = {
      id: id,
      name: name,
      description: description,
      websiteUrl: websiteUrl,
    };
    blogs.push(newBlogs);
    return blogs;
  },
  findBlogsId(id: string) {
    const blog = blogs.find((b) => b.id === id);
    return blog;
  },
  updateBlog(
    id: string,
    name: string,
    description: string,
    websiteUrl: string
  ) {
    const blog = blogs.find((b) => b.id === id);
    if (blog) {
      blog.name = name;
      blog.description = description;
      blog.websiteUrl = websiteUrl;
      return true;
    } else {
      return false;
    }
  },
  deletedBlogsId(id: string) {
	for(let i = 0; i < blogs.length; i++) {
		if(blogs[i].id === id) {
			blogs.splice(i, 1)
			return true
		}
	}
	return false
  },
  deletedAllBlogs() {
	const deletedAllBlogs = blogs.splice(0, blogs.length)
	return deletedAllBlogs
  }
};
