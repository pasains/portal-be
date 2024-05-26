"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post_router = void 0;
const __1 = require("..");
const express_1 = require("express");
exports.post_router = (0, express_1.Router)();
exports.post_router.get("/api/post/", (req, res) => {
    const data = __1.contentData.map((item) => {
        return { id: item.id, slug: item.slug, title: item.title, location: item.location, content: item.content, description: item.description, picture: item.picture };
    });
    res.json(data);
});
exports.post_router.get("/api/post/:page", (req, res) => {
    const page = req.params.page;
    const data = __1.contentData.find((item) => item.slug === page);
    res.json(data);
});
