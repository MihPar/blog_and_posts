"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepositories = void 0;
const db_blogs_1 = require("../db/db_blogs");
exports.blogsRepositories = {
    createNewBlog(name, description, websiteUrl) {
        const newBlog = {
            id: new Date().toISOString(),
            name,
            description,
            websiteUrl,
        };
        db_blogs_1.blogs.push(newBlog);
        return newBlog;
    },
    findBlogId(id) {
        const blog = db_blogs_1.blogs.find((b) => b.id === id);
        return blog;
    },
    updateBlog(id, name, description, websiteUrl) {
        const blog = db_blogs_1.blogs.find((b) => b.id === id);
        if (blog) {
            blog.name = name;
            blog.description = description;
            blog.websiteUrl = websiteUrl;
            return true;
        }
        else {
            return false;
        }
    },
    deletedBlogId(id) {
        for (let i = 0; i < db_blogs_1.blogs.length; i++) {
            if (db_blogs_1.blogs[i].id === id) {
                db_blogs_1.blogs.splice(i, 1);
                return true;
            }
        }
        return false;
    },
    deletedBlogs() {
        const deletedAllBlogs = db_blogs_1.blogs.splice(0, db_blogs_1.blogs.length);
        return deletedAllBlogs;
    }
};
