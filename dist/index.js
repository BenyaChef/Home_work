"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const video_router_1 = require("./routes/video-router");
const test_router_1 = require("./routes/test-router");
const base_router_1 = require("./routes/base-router");
exports.app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const parserMiddleware = (0, body_parser_1.default)();
exports.app.use(parserMiddleware);
exports.app.use('/', base_router_1.baseRouter);
exports.app.use('/testing', test_router_1.testRouter);
exports.app.use('/videos', video_router_1.videoRouter);
exports.app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
