// Iteration #3
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

// GET route for celebrities/create:
router.get("/celebrities/create", (req, res) => res.render("celebrities/new-celebrity"));

// POST route for celebrities/create:
router.post("/celebrities/create", (req, res) => {
    const { name } = req.body;
    Celebrity.findOne({ name })
      .then((celebrityFromDB) => {
        if (!celebrityFromDB) {
          Celebrity.create({ name })
          .then(() => res.redirect('/celebrities'));
        } else {
          res.render("/celebrities/create", { message: "It seems this celebrity is already registered." });
          return;
        }
      })
      .catch((err) => console.log(`Error while creating a new celebrity: ${err}`));
  });

module.exports = router;