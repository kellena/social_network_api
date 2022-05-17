const res = require('express/lib/response');
const { User } = require('../models')

module.exports = {

    getUsers(req, res) {

        User.find()

            .then((users) => res.json(users))
            .catch((err)=> res.status(500).json(err));

    },

    getSingleUser (req,res){

        User.findOne( {_id: req.params.userId} )

            .select('-__v')
            .then((user)=>

                !user
                    ? res.status(404).json({message: 'No user found with that ID'})
                    : res.json(user)
            )

        .catch((err)=> res.status(505).json(err));
    },

    // write out create/update/delete user, write out create/delete friend

};