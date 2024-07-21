module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      phone: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.ENUM,
        values: ['Teacher', 'Student', 'Institute']
      },
      password: {
        type: Sequelize.STRING
      }
    });
  
    return User;
  };
  