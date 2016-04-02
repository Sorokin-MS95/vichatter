var config = {};

config.app = {
    port : 3000
}

config.database = {
    dbname : 'vichatter',
    dburl : 'mongodb://localhost:27017/'
}

config.jwt = {
    secret : "z1x2c3",
    ttl : "604800"
}

module.exports.jwt = config.jwt;
module.exports.database = config.database;
module.exports.app = config.app;
