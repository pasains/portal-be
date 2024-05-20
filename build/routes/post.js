"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routers = void 0;
const __1 = require("..");
const express_1 = require("express");
exports.routers = (0, express_1.Router)();
exports.routers.get("/api/post/title", (req, res) => {
    const data = __1.contentData.map((item) => {
        return { id: item.id, slug: item.slug, title: item.title, location: item.location, content: item.content, picture: item.picture };
    });
    res.json(data);
});
exports.routers.get("/api/post/:page", (req, res) => {
    const page = req.params.page;
    const data = __1.contentData.find((item) => item.slug === page);
    res.json(data);
});
