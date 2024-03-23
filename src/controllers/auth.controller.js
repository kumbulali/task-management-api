module.exports.register = async (req, res) => {
    try {
        res.send('Register');
    } catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
};

module.exports.login = async (req, res) => {
    try {
        res.send('Login');
    } catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
};