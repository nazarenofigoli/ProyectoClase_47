const indexController = {
    home: (req, res) => {
        res.render("home");
    },
    favoritas: (req, res) => {
        res.render("favoritas");
    },
};

module.exports = indexController;
