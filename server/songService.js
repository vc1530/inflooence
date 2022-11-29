const SongModel = require("./songModel");
 
exports.getAllSongs = async () => {
  return await SongModel.find();
};
 
exports.createSong = async (song) => {
  return await SongModel.create(song);
};
exports.getSongByID = async (id) => {
  return await SongModel.findById(id);
};

exports.updateSong = async (id, song) => {
  return await SongModel.findByIdAndUpdate(id, song);
};
 
exports.deleteSong = async (id) => {
  return await SongModel.findByIdAndDelete(id);
};