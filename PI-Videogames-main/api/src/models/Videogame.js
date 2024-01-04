const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripción: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    plataformas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
          isUrl: true
      }
    },
    fechadelanzamiento: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          isDate: true,
    }
    },
    rating: {
      type: DataTypes.DECIMAL(10,1),
      allowNull: false,
      validate: {
            min: 0,
            max: 5,
      }
    },
  },
  {
    timestamps: false,
  }
  );
};

// timestamps es para sacar las columnas de Creat Dat
//cuando creamos las tablas, asi no las crea.