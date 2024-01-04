const { getGameById } = require("../controllers/VideoGameControllers");
module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const juego = await getGameById(id);
    res.status(200).send(juego);
  } catch (error) {
    console.log(error);
  }
};
