'use strict';

exports.addModel = function (req, res, T) {
    console.log('POST');
    console.log(req.body);

    let model = new T(req.body);

    model.save()
        .then(resp => res.status(200).send({ message: `${T.modelName} successfully created.`, model: resp }))
        .catch(err => res.status(500).send({ message: `There was an error creating a  ${T.modelName}, please try again later.`, error: err.message }));
};

exports.deleteModelById = function (req, res, T) {
    console.log('DELETE');
    console.log(req.query.id);

    T.findByIdAndRemove(req.query.id)
        .then((resp) => {
            if (resp) {
                let modelName = T.modelName;
                res.status(200).send({ message: `${T.modelName} successfully removed.`, model: resp });
            }
            else {
                res.status(200).send({ message: `Can't find ${T.modelName} to remove with id: ${req.query.id} .` });
            }
        })
        .catch(err => res.status(500).send({ message: `There was an error removing ${T.modelName}, please try again later.`, error: err.message }));
};

exports.updateModelById = function (req, res, T) {
    console.log('UPDATE');
    console.log(req.body);

    T.findById(req.body.id).exec()
        .then((model) => {
            if (model) {
                //var model = updateModel(model, req.body);
                model.update(req.body)
                    .then(resp => res.status(200).send({ message: `${T.modelName} successfully updated.` }))
            }
            else {
                res.status(200).send({ message: `Can't find ${T.modelName} to update with id: ${req.body.id} .` });
            }
        })
        .catch(err => res.status(500).send({ message: `There was an error updating ${T.modelName}, please try again later.`, error: err.message }));
};

exports.findAllModels = function (req, res, T) {
    console.log('GET');

    T.find()
        .then(resp => res.status(200).jsonp(resp))
        .catch(err => res.status(500).send(`There was an error searching all ${T.modelName}, please try again later. Error: ${err.message}`));
};

exports.findAllModelsPopulate = function (req, res, T, population) {
    console.log('GET');
    T.find().populate(population)
        .then(resp => res.status(200).jsonp(resp))
        .catch(err => res.status(500).send(`There was an error searching all ${T.modelName}, please try again later. Error: ${err.message}`));
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