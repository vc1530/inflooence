const express = require("express");
const {
  getAllSongs,
  createSong,
  getSongByID,
  updateSong,
  deleteSong,
} = require("./songController");
 
const router = express.Router();

// router.get("/", function (req, res) {
//   res.send("Wiki home page");
// });

router.route("/").get(getAllSongs).post(createSong);
router.route("/:id").get(getSongByID).put(updateSong).delete(deleteSong);
 
module.exports = router;