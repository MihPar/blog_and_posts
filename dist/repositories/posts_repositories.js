"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepositories = void 0;
const db_posts_1 = require("../db/db_posts");
exports.postsRepositories = {
    findPosts(title) {
        if (title) {
            const filteredPosts = db_posts_1.posts.filter(function (p) {
                return p.title.indexOf(title) > -1;
            });
            return filteredPosts;
        }
        else {
            return db_posts_1.posts;
        }
    },
    createPost(id, title, shortDescription, content, blogId, blogName) {
        const newPost = {
            id: new Date().toISOString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blogName
        };
        db_posts_1.posts.push(newPost);
        return newPost;
    },
    findPostId(id) {
        const post = db_posts_1.posts.find(p => p.id === id);
        return post;
    },
    updatePostId(id, title, shortDescription, content, blogId) {
        const updatePost = db_posts_1.posts.find(p => p.id = id);
        if (updatePost) {
            updatePost.title = title;
            updatePost.shortDescription = shortDescription;
            updatePost.content = content;
            updatePost.blogId = blogId;
            return true;
        }
        else {
            return false;
        }
    },
    deletePost(id) {
        for (let i = 0; i < db_posts_1.posts.length; i++) {
            if (db_posts_1.posts[i].id = id) {
                db_posts_1.posts.splice(i, 1);
                return true;
            }
        }
        return false;
    },
    postsRepositories() {
        const deletedAllPosts = db_posts_1.posts.slice(0, db_posts_1.posts.length);
        return deletedAllPosts;
    }
};
