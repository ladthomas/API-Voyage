require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    //SECRET_KEY: process.env.SECRET_KEY || 'your_secret_key'
    SECRET_KEY: process.env.SECRET_KEY || 'fallback_secret_key',
    DATABASE_NAME: process.env.DATABASE_NAME || 'packing_list.db'
};
