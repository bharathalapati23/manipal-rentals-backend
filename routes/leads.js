//import express from 'express'
const express = require('express')
//import { getLeads } from '../controllers/leads.js' 
const { postLeads } = require('../controllers/leads.js')

const router = express.Router();

router.post('/', postLeads)

module.exports = router
//export default router