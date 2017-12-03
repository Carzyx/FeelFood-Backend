const Ingredient = require('../models/ingredient'), Dish =require('../models/dish'),ApiHelper = require('../helpers/api');


exports.addIngredient = (req, res) => {
    let conditions={name: req.body.name};
    console.log(conditions);
    ApiHelper.addModel(req, res, Ingredient,conditions);
};

exports.deleteIngredientById= (req, res) => ApiHelper.deleteModelById(req, res, Ingredient);

exports.updateIngredientById = (req, res) => ApiHelper.updateModelById(req, res, Ingredient);

exports.findAllIngredients = (req, res) => ApiHelper.findAllModels(req, res, Ingredient);

exports.findIngredient=(req,res)=>
{
    let conditions={name: req.query.name};
    ApiHelper.findOneModel(req,res,Ingredient,conditions);
}

exports.findIngredients=(req,res)=>{
    let conditions={name: req.body.name};
    ApiHelper.findModels(req,res,Ingredient,conditions);
}