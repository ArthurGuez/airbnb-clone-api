'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Place extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
      this.belongsTo(models.City);
      this.hasMany(models.Booking);
    }
  }
  Place.init(
    {
      city_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      rooms: DataTypes.INTEGER,
      bathrooms: DataTypes.INTEGER,
      max_guests: DataTypes.INTEGER,
      price_by_night: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Place',
    }
  );

  return Place;
};
