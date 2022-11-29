const songService = require("./songService");
 
exports.getAllSongs = async (req, res) => {
  try {
    const songs = await blogService.getAllSongs();
    res.json({ data: songs, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSong = async (req, res) => {
  try {
    const song = await songService.createSong(req.body);
    res.json({ data: song, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.getSongByID = async (req, res) => {
  try {
    const song = await songService.getSongByID(req.params.id);
    res.json({ data: song, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.updateSong = async (req, res) => {
  try {
    const song = await songService.updateSong(req.params.id, req.body);
    res.json({ data: song, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.deleteSong = async (req, res) => {
  try {
    const song = await songService.deleteSong(req.params.id);
    res.json({ data: song, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};