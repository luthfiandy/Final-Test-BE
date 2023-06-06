'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class siswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  siswa.init({
    nama: DataTypes.STRING,
    tanggal_Lahir: DataTypes.STRING,
    tempat_Lahir: DataTypes.STRING,
    kelas: DataTypes.INTEGER,
    no_Hp: DataTypes.INTEGER,
    nama_Ortu: DataTypes.STRING,
    no_Hp_Ortu: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'siswa',
  });
  return siswa;
};