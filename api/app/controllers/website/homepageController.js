const homepageController = {
    homePage: (_, res) => {
        res.render('home');
    },

    error404: (_, res) => {
      res.render('404');
    }
};

module.exports = homepageController;
