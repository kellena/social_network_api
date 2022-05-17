const { User, Thoughts } = require('../models');

module.exports = {

    getThoughts(req, res) {

        Thoughts.find()

            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));

    },

    getSingleThought(req, res) {

        Thoughts.findOne({ _id: req.params.thoughtsId })

            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({ message: 'No thoughts found with that id' })
                    : res.json(thoughts)
            )

            .catch((err) => res.status(500).json(err));

    },

    // create thoughts and reactions, create delete reaction function

};