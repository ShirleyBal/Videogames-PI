const { getAllGames, getGamesByName } = require('../controllers/VideoGameControllers');

module.exports = async (req, res) => {
  const { name } = req.query;
  let allGames = await getAllGames();
  try {
    if (name) {
      const foundGamesAPI = await getGamesByName(name);
      const gamesByNameDB = await getDBinfo();
      let foundGamesDB = gamesByNameDB.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      let allResults = foundGamesAPI.concat(foundGamesDB);
      if (allResults.length) {
        res.status(200).send(allResults);
      } else {
        res.status(404).json(["Sorry, game not found"]);
      }
    } else {
      res.status(200).send(allGames);
    }
  } catch (error) {
    console.log(error);
    res.status(401).send("Bad request");
  }
};
