var express = require("express");
var router = express.Router();
var data = require('../data/bookAPI.json');

router.get("/", function(req, res, next) {
    console.log(data);
    res.send(data);
});

module.exports = router;