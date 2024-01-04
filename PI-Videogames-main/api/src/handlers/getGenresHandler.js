const { getAllGenres } = require("../controllers/GenresControllers");
module.exports = async (req, res) => {
  try {
    const allGenres = await getAllGenres();
    res.status(200).send(allGenres);
  } catch (error) {
    console.log(error);
    res.status(401).send("Bad request");
  }
};
