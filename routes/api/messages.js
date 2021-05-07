var express = require('express');
var router = express.Router();
var messagesCtrl = require('../../controllers/api/messages');

/* GET /api/messages */
router.get("/", messagesCtrl.index);
// router.get('/:id', messagesCtrl.show);
router.post("/", messagesCtrl.create);
router.delete("/:id", messagesCtrl.delete);
router.put('/:id', messagesCtrl.update);

module.exports = router;