// Create web server application

// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Comments = require('../models/comments');
const authenticate = require('../authenticate');

// Create express router
const commentRouter = express.Router();

// Configure router to use body-parser
commentRouter.use(bodyParser.json());

// Configure router to use authentication middleware
commentRouter.use(authenticate.verifyUser);

// Configure router to use authentication middleware
commentRouter.route('/')
    .get((req, res, next) => {
        // Get all comments
        Comments.find({})
            .populate('author')
            .then((comments) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comments);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        // Create new comment
        Comments.create(req.body)
            .then((comment) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comment);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res) => {
        // Update all comments
        res.statusCode = 403;
        res.end('PUT operation not supported on /comments');
    })
    .delete((req, res, next) => {
        // Delete all comments
        Comments.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

// Configure router to use authentication middleware
commentRouter.route('/:commentId')
    .get((req, res, next) => {
        // Get comment by id
        Comments.findById(req.params.commentId)
            .populate('author')
            .then((comment) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comment);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res) => {
        // Create new comment
        res.statusCode = 403;
        res.end('POST operation not supported on /comments/' +