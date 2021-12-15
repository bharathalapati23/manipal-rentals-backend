//import express from 'express'
const express = require('express')
const { postListingInfo } = require('../controllers/qrCodeEntry.js')

const router = express.Router();

router.post('/', postListingInfo)

module.exports = router