"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolutionDB = exports.errorsArray = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const validation_videos_input_value_1 = require("./valadation/validation-videos-input-value");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const createdDate = new Date();
exports.errorsArray = [];
exports.resolutionDB = [
    'P144',
    'P240',
    'P360',
    'P480',
    'P720',
    'P1080',
    'P1440',
    'P2160'
];
let videoDB = [{
        id: 1,
        title: 'Through hardship to the stars',
        author: 'Richard Viktorov',
        canBeDownloaded: true,
        minAgeRestriction: 14,
        createdAt: '1981-04-23T12:00:53.661Z',
        publicationDate: '1981-04-24T12:00:53.661Z',
        availableResolutions: [exports.resolutionDB[0]]
    }];
const parserMiddleware = (0, body_parser_1.default)();
app.use(parserMiddleware);
app.delete('/testing/all-data', (req, res) => {
    videoDB.splice(0);
    res.send(204);
});
app.get('/videos/', (req, res) => {
    res.status(200).send(videoDB);
});
app.get('/videos/:id', (req, res) => {
    const video = videoDB.find(v => v.id === +req.params.id);
    if (video) {
        res.status(200).send(video);
    }
    else {
        res.sendStatus(404);
    }
});
app.post('/videos', (req, res) => {
    (0, validation_videos_input_value_1.validationVideoTitle)(req.body.title);
    (0, validation_videos_input_value_1.validationVideoAuthor)(req.body.author);
    (0, validation_videos_input_value_1.validationAvailableResolutions)(req.body.availableResolutions);
    (0, validation_videos_input_value_1.validationCanBeDownloaded)(req.body.canBeDownloaded);
    (0, validation_videos_input_value_1.validationMinAgeRestriction)(req.body.minAgeRestriction);
    (0, validation_videos_input_value_1.validationCreatedAt)(req.body.createdAt);
    (0, validation_videos_input_value_1.validationPublicationDate)(req.body.publicationDate);
    if (exports.errorsArray.length > 0) {
        res.status(400).json({ errorsMessages: exports.errorsArray });
        exports.errorsArray.splice(0);
        return;
    }
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: req.body.canBeDownloaded || false,
        minAgeRestriction: req.body.minAgeRestriction || null,
        createdAt: createdDate.toISOString(),
        publicationDate: new Date(createdDate.setDate(createdDate.getDate() + 1)).toISOString(),
        availableResolutions: req.body.availableResolutions
    };
    videoDB.push(newVideo);
    res.status(201).send(newVideo);
});
app.put('/videos/:id', (req, res) => {
    const video = videoDB.find(v => v.id === +req.params.id);
    if (!video) {
        res.send(404);
        return;
    }
    (0, validation_videos_input_value_1.validationVideoTitle)(req.body.title);
    (0, validation_videos_input_value_1.validationVideoAuthor)(req.body.author);
    (0, validation_videos_input_value_1.validationAvailableResolutions)(req.body.availableResolutions);
    (0, validation_videos_input_value_1.validationCanBeDownloaded)(req.body.canBeDownloaded);
    (0, validation_videos_input_value_1.validationMinAgeRestriction)(req.body.minAgeRestriction);
    (0, validation_videos_input_value_1.validationCreatedAt)(req.body.createdAt);
    (0, validation_videos_input_value_1.validationPublicationDate)(req.body.publicationDate);
    if (exports.errorsArray.length > 0) {
        res.status(400).json({ errorsMessages: exports.errorsArray });
        exports.errorsArray.splice(0);
        return;
    }
    video.title = req.body.title;
    video.author = req.body.author;
    video.canBeDownloaded = req.body.canBeDownloaded || false;
    video.minAgeRestriction = req.body.minAgeRestriction || null;
    video.publicationDate = req.body.publicationDate;
    video.availableResolutions = req.body.availableResolutions;
    res.sendStatus(204);
});
app.delete('/videos/:id', (req, res) => {
    let video = videoDB.find(v => v.id === +req.params.id);
    if (!video) {
        res.sendStatus(404);
        return;
    }
    videoDB = videoDB.filter(v => v.id !== +req.params.id);
    res.sendStatus(204);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
