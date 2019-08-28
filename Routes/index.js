const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

//Welcome Paage
router.get('/', (req, res) => res.render("welcome"));

//Dashbord Page
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render("dashboard", {name: req.user.name})
});

module.exports = router;