//const app = require('./src/app');
//const { PORT } = require('./src/config/env');

//app.listen(PORT, () => {
    //console.log(`Server is running on http://localhost:${PORT}`);
//});

// OTHER CODE 

const app = require('./src/app');
const { PORT } = require('./src/config/env');

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

