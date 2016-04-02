var config = {};

config.app = {
    port : 3000
}

config.database = {
    dbname : 'vichatter',
    dburl : 'mongodb://localhost:27017/'
}

module.exports.database = config.database;
module.exports.app = config.app;
