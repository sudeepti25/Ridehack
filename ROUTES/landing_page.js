const express = require('express');
const router = express.Router();
const db = require('../CONNECTIONS/Connect');

router.get('/landing_page', (req, res) => {
    res.render('landing_page');
});
