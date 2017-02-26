'use strict';
module.exports = function(sequelize, DataTypes) {
  var StockMarket = sequelize.define('StockMarket', {
    ticker_symbol: DataTypes.STRING,
    user_id: DataTypes.BIGINT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return StockMarket;
};