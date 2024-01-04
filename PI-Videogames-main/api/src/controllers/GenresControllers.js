const axios = require("axios");
const { where } = require("sequelize");
require("dotenv").config();
const { API_KEY } = process.env;
const { Gender } = require("../db");

const getAllGenres = async () => {
  try {
    let genres = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );

    genres.data.results.map((el) =>
      Gender.findOrCreate({ where: { nombre: el.name } })
    );

    const genresDb = await Gender.findAll();
    return genresDb;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllGenres,
};
