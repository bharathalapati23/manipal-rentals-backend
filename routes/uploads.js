//import express from 'express'
const express = require('express')
const { getPosts, createPost } = require('../controllers/uploads.js')

const router = express.Router();

router.get('/', getPosts)

router.post('/', createPost)

module.exports = router