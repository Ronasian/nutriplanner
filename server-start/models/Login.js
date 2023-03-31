const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Login extends Model {
  checkPassword(loginPw) {
  return bcrypt.compareSync(loginPw, this.password);
}} 


Login.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true,
            },
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [10],
            },
          },
        },

        {
          ooks: {
          beforeCreate: async (newMemberData) => {
            newMemberData.password = await bcrypt.hash(newMemberData.password, 12);
            return newUserData;
          },
          beforeUpdate: async (updatedMemberData) => {
            updatedMemberData.password = await bcrypt.hash(updatedMemberData.password, 12);
            return updatedMemberData;
          },
        },
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: 'login', 
        }
      );
      
      module.exports = Login;
    
