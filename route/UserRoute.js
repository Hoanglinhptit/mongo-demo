module.exports = (app) => {
    const services = require('../controllers/UserControllers')
    app.route('/user')
        .get(services.getListUser)
        .post(services.addUser)

    app.route('/user/:_id')
        .get(services.getUser)
        .put(services.editUser)
        .delete(services.deleteUser)
}