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

    createThought(req, res) {

        Thoughts.create(req.body)

            .then((thoughts) => {

                return User.findOneAndUpdate(
                    { username: req.body.username },
                    { $push: { thoughts: thoughts._id } },
                    { new: true }
                );

            })

            .then((user) =>

                !user
                    ? res
                        .status(404)
                        .json({ message: 'No user found with this ID' })
                    : res.json({ message: 'Thought has been created!' })
                )

            .catch((err) => {
                console.error(err);
            });

    },

    updateThought(req,res){

        Thoughts.findOneAndUpdate(

            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        
            .then((thought)=>

                !thought
                    ? res.status(404).json({message: "No thought found with this ID"})
                    : res.json(thought)
            )

          .catch((err)=> res.status(500).json(err));

    },

    deleteThought(req, res){
        
        Thoughts.findOneAndDelete({ _id: req.params.thoughtId })

            .then((thoughts)=>

                !thoughts
                    ? res.status(404).json({message: "No thought found with this ID"})
                    : res.json({message: "Thought has been deleted"})

            )

            .catch((err)=> res.status(500).json(err));
    
    },

    createReaction(req, res) {

        Thoughts.findOneAndUpdate({_id: req.params.thoughtId}, {$addToSet: {reactions: req.body}}, {runValidators: true, new: true})
            
            .then((reactions)=>

                !reactions
                    ? res.status(404).json({message: "No thought found with this ID"})
                    : res.json(reactions)

            )

        .catch((err)=> res.status(500).json(err));

    },

    deleteReaction(req, res) {
    
        Thoughts.findOneAndUpdate({_id: req.params.thoughtId}, {$pull: {reactions: { reactionId: req.body.reactionId }}}, {runValidators: true, new: true})
    
            .then((reactions)=>

                !reactions
                    ? res.status(404).json({message: "No thought found with this ID"})
                    : res.json(reactions)
                
            )

        .catch((err)=> res.status(500).json(err)); 
        
    }

};