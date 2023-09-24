"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepositories = void 0;
const db_blogs_1 = require("../db/db_blogs");
const db_posts_1 = require("../db/db_posts");
exports.postsRepositories = {
    createPost(title, shortDescription, content, blogId) {
        const blog = db_blogs_1.blogs.find(b => b.id === blogId);
        if (!blog)
            return null;
        const newPost = {
            id: new Date().toISOString(),
            title,
            shortDescription,
            content,
            blogId,
            blogName: blog.name,
        };
        db_posts_1.posts.push(newPost);
        return db_posts_1.posts;
    },
    findPostId(id) {
        const post = db_posts_1.posts.find((p) => p.id === id);
        return post;
    },
    updatePostId(id, title, shortDescription, content, blogId) {
        const findPost = db_posts_1.posts.find((p) => p.id === id);
        if (findPost) {
            findPost.title = title;
            findPost.shortDescription = shortDescription;
            findPost.content = content;
            findPost.blogId = blogId;
            return true;
        }
        else {
            return false;
        }
    },
    deletePost(id) {
        for (let i = 0; i < db_posts_1.posts.length; i++) {
            if ((db_posts_1.posts[i].id === id)) {
                db_posts_1.posts.splice(i, 1);
                return true;
            }
        }
        return false;
    },
    deletedPosts() {
        const deletedAllPosts = db_posts_1.posts.slice(0, db_posts_1.posts.length);
        return deletedAllPosts;
    },
};
