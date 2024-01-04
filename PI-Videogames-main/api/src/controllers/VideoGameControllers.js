const axios = require("axios");
const { where } = require("sequelize");
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Gender } = require("../db");
//------Funciones DB
const createVideogame = async (
  nombre,
  descripción,
  plataformas,
  rating,
  fechadelanzamiento,
  imagen
) => {
  const newVideogame = await Videogame.create({
    nombre,
    descripción,
    plataformas,
    rating,
    fechadelanzamiento,
    imagen,
  });
  return newVideogame;
};

const getDBinfo = async () => {
  return await Videogame.findAll({
    include: [
      {
        model: Gender,
        attributes: ["nombre"],
        through: {
          attributes: [],
        },
      },
    ],
  });
};
const getVideogames = async () => {
  const videogamesDB = await Videogame.findAll();
  return videogamesDB;
};

const getVideogamesId = async (id) => {
  const videogameFound = await Videogame.findByPk(id);
  return videogameFound;
};

///----funciones api
const getAPIinfo = async () => {
  ///datos de la api

  try {
    var gets = [1, 2, 3, 4].map(
      async (e) =>
        await axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}&page_size=25&page=${e}`
        )
    );
    let allGets = await Promise.all(gets);
    let apiURL = allGets.reduce((prev, curr) => {
      return prev.concat(curr.data.results);
    }, []);

    const apiDATA = apiURL.map((el) => {
      return {
        id: el.id,
        name: el.name,
        image: el.background_image,
        rating: el.rating,
        genres: el.genres.map((el) => el.name),
        platforms: el.platforms.map((el) => el.platform.name),
        //description: el.description_raw,
        released: el.released,
      };
    });
    return apiDATA;
  } catch (error) {
    console.log(error);
  }
};

const getGamesByName = async (name) => {
  const apiURL = await axios.get(
    `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=15`
  );
  // (`https://api.rawg.io/api/games?6&page_size=100&key${name}&key=${API_KEY}`)
  const apiDATA = await apiURL.data.results.map((el) => {
    return {
      id: el.id,
      name: el.name,
      image: el.background_image,
      rating: el.rating,
      platforms: el.platforms.map((i) => {
        return i.platform.name;
      }),
      genres: el.genres.map((i) => {
        return i.name;
      }),
    };
  });
  return apiDATA;
};

//---- funcion que obtiene datos de api  y db
const getAllGames = async () => {
  const APIinfo = await getAPIinfo();
  const DBinfo = await getDBinfo();
  const infoTotal = APIinfo.concat(DBinfo);
  return infoTotal;
};

const getGameById=async (id)=>{

  if (!id.includes("-")){
    const detail = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
    const dat = await detail.data;
    let formated = [
      {
        id: dat.id,
        name: dat.name,
        description: dat.description,
        image: dat.background_image,
        released: dat.released,
        rating: dat.rating,
        genres: dat.genres.map((el) => el.name),
        platforms: dat.platforms.map((el) => el.platform.name),
      },
    ];
    return formated
  }
  const juegosdb=await getVideogamesId(id)
  return juegosdb
}

module.exports = {
  getAPIinfo,
  getDBinfo,
  getAllGames,
  getGamesByName,
  createVideogame,
  getGameById
};
