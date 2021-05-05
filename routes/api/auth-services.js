const {

    resetPasswordRequestController,
    resetPasswordController,
  } = require("../controllers/auth-services");
  
  const router = require("express").Router();
  

  router.post("/auth/requestResetPassword", resetPasswordRequestController);
  router.post("/auth/resetPassword", resetPasswordController);
  
  module.exports = router;