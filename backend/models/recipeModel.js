const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    name: {
      type: String,
      required: [true, 'Please add a recipe name']
    },
    description: {
      type: String
    },
    instructions: {
      type: String,
      required: [true, 'Please add instructions']
    },
    ingredients: [{
      amount: {
        type: String
      },
      ingredient: {
        type: String
      }
    }],
    categories: [{
      type: String
    }],
  }, 
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Recipe', recipeSchema)