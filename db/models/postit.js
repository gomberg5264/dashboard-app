'use strict';
module.exports = function(sequelize, DataTypes) {
  var Postit = sequelize.define('Postit', {
    note: DataTypes.STRING,
    user_id: DataTypes.BIGINT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Postit;
};