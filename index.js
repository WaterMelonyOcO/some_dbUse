const { Sequelize, DataTypes, Op } = require("sequelize");

const db = new Sequelize("social_net", "haker", "123", {
  host: "localhost",
  dialect: "mysql",
  port: "/var/run/mysqld/mysqld.sock",
});

function testConnection() {
  db.authenticate().then(() => {
    console.log("db connect is great");
    return true;
  });
  return false;
}

async function findAllThere(table) {
  const res = await table.findAll();
  return res;
}
async function findByPkMy(table, id) {
  const res = await table.findByPk(id);
  return res;
}
async function findIf(table, ...condition) {
    const res = condition.forEach((elem) => {
    let sub = Object.keys(elem);
    sub.forEach(async (f) => {
        await table.findAll({
        where: {
          [f]: elem[f],
        },
      });
    });
  });
  return res;
}

const User = db.define("User", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const News = db.define("News", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  author: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

User.sync().then(async () => {
  console.log(findIf(User, { id: 1 }));
  News.sync();
});
