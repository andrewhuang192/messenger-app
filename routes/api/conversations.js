var express = require('express');
var router = express.Router();
var conversationsCtrl = require('../../controllers/api/conversations');

/* GET /api/conversations */
router.get("/", conversationsCtrl.index);


module.exports = router;