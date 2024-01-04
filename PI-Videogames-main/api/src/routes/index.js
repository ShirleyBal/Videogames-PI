const { Router } = require('express');
const { getAllGames, getGamesByName } = require('../controllers/VideoGameControllers');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

//de controllers cambiar el nombre
//const deleteFav = require("../controllers/deleteFav");
// const getCharById = require("../controllers/getCharById");
// const login = require("../controllers/login");
// const postFav = require("../controllers/postFav");
// const postUser = require("../controllers/postUser");
const {getVideoGamesHandler,getGenresHandler,getVideoGameByIdHandler}=require('../handlers')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames/:id', getVideoGameByIdHandler )
router.get('/videogames', getVideoGamesHandler)
router.get('/genres', getGenresHandler)


router.post('/videogame', async (req, res) => {
    const { name, description, released, rating, createdAtDb, genres, image} = req.body
    const vidGameCreated = await Videogame.create({
        name, description, released, rating, createdAtDb, image
    })
    let genreDB = await Gender.findAll({
        where: {
            nombre: genres
        }
    })
    await vidGameCreated.addGenre(genreDB)
    res.send('Videogame created succesfully')
})




module.exports = router;
