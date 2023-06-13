module.exports = (app) => {
    const userRoute = require('./UserRoute');

    userRoute(app);
}