"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter.get('/', function (req, res) {
    res.send('Hello blogs');
});