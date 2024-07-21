module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "Mangu@800",
    DB: "appointment_system",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };