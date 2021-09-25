const express = require("express");
const postController = require("../controller/post_controller");

const router = express.Router();

router.get("/", postController.showIndex);

router.post("/add-post", postController.addPost);
router.get("/get-json/:serviceName", postController.getJson);

router.post("/add-post1",postController.addPost1);
router.get("/get-post1",postController.getPost1);

module.exports = router;
