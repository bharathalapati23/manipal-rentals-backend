//import express from 'express'
const express = require('express')
//import { getPosts, createPost } from '../controllers/posts.js' 
const { getPosts, createPost, getSinglePost } = require('../controllers/posts.js')

const router = express.Router();

router.get('/', getPosts)

router.post('/', createPost)

router.get('/singlePost', getSinglePost)

module.exports = router
//export default router