'use strict';

exports.addModel = function (req, res, T, condition) {
    console.log(req.body);
    T.findOne(condition).then(function (resp) {
        console.log(resp);
        if (!resp) {
            let model = new T(req.body);

            model.save()
                .then(resp => res.status(200).send({ message: `${T.modelName} successfully created.`, model: resp, success: true }))
                .catch(err => res.status(500).send({ message: `There was an error creating a  ${T.modelName}, please try again later.`, error: err.message }));
        }
        else {
            let con = Object.keys(condition);
            let text = "";
            if (con == '$or') {
                for (let i = 0; i < condition.$or.length - 1; i++) {
                    text = text.concat(Object.keys(condition.$or[i]));
                    text = text.concat(' or ');
                }
                text = text.concat(Object.keys(condition.$or[condition.$or.length - 1]));
            }
            else
                text = con;
            res.status(200).send({ message: `this ${text} is already in use.`, success: false });
        }
    });
};

exports.deleteModelByName = function (req, res, T) {
    console.log(req.query.username);
    T.find({ username: req.query.username }).remove()
        .then((resp) => {
            if (resp) {
                let modelName = T.modelName;
                res.status(200).send({ message: `${T.modelName} successfully removed.`, model: resp });
            }
            else {
                res.status(400).send({ message: `Can't find ${T.modelName} to remove with id: ${req.query.id} .` });
            }
        })
        .catch(err => res.status(500).send({ message: `There was an error removing ${T.modelName}, please try again later.`, error: err.message }));
};

exports.deleteModelById = function (req, res, T) {
    console.log(req.query.id);
    T.findByIdAndRemove(req.query.id)
        .then((resp) => {
            if (resp) {
                let modelName = T.modelName;
                res.status(200).send({ message: `${T.modelName} successfully removed.`, model: resp });
            }
            else {
                res.status(400).send({ message: `Can't find ${T.modelName} to remove with id: ${req.query.id} .` });
            }
        })
        .catch(err => res.status(500).send({ message: `There was an error removing ${T.modelName}, please try again later.`, error: err.message }));
};

exports.updateModelById = function (req, res, T) {
    console.log(req.body);

    T.findById(req.body._id).exec()
        .then((model) => {
            if (model) {
                model.update(req.body)
                    .then(resp => res.status(200).send({ message: `${T.modelName} successfully updated.` }))
            }
            else {
                res.status(200).send({ message: `Can't find ${T.modelName} to update with id: ${req.body.id} .` });
            }
        })
        .catch(err => {console.log(err);res.status(500).send({ message: `There was an error updating ${T.modelName}, please try again later.`, error: err.message })});
};

exports.findAllModels = function (req, res, T) {
    T.find()
        .then(resp => res.status(200).jsonp(resp))
        .catch(err => res.status(500).send(`There was an error searching all ${T.modelName}, please try again later. Error: ${err.message}`));
};

exports.findAllModelsPopulate = function (req, res, T, population) {
    T.find().populate(population)
        .then(resp => res.status(200).jsonp(resp))
        .catch(err => res.status(500).send(`There was an error searching all ${T.modelName}, please try again later. Error: ${err.message}`));
};

exports.findOneModel = function (req, res, T, condition, population) {
    T.findOne(condition).populate(population)
        .then(resp => res.status(200).jsonp(resp))
        .catch(err => res.status(500).send(`There was an error searching all ${T.modelName}, please try again later. Error: ${err.message}`));
};
exports.findModels = function (req, res, T, condition, population) {
    T.find(condition)
        .then(resp => res.status(200).jsonp(resp))
        .catch(err => res.status(500).send(`There was an error searching all ${T.modelName}, please try again later. Error: ${err.message}`));
}
exports.findByDistance = (req,res, T,conditions) => {
    let resp = [];
    T.find(conditions).then(list => {
        for (let i = 0;(i < list.length)&&(resp.length < 10);i++) {
            let dis = getKilometros(req.body.location.lat,req.body.location.lng,list[i].locations[0].lat,list[i].locations[0].lng)
            if(( dis < req.body.distanceMax)&&( dis > req.body.distanceMin))
                resp.push(list[i]);
        }
        res.status(200).jsonp(resp)
    })
    .catch(err => res.status(500).send(`There was an error searching ${T.modelName}, please try again later. Error: ${err.message}`));



}
var getKilometros = function(lat1,lon1,lat2,lon2)
{
    let rad = function(x) {return x*Math.PI/180;}
    let R = 6378.137; //Radio de la tierra en km
    let dLat = rad( lat2 - lat1 );
    let dLong = rad( lon2 - lon1 );
    let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c;
    return d.toFixed(3); //Retorna tres decimales
};


//NOT WORKS, HOW CAN I DO A PARTIAL MAPPING?
function updateModel(oldModel, newModel) {
    for (let index = 0; index < Object.keys(oldModel).length; index++) {
        let element = Object.keys(oldModel)[index];

        //Set element if this is not defined        
        oldModel[element] = newModel[element] || oldModel[element];

    }
    return oldModel;
}