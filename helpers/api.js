'use strict'

exports.addModel = function (req, res, T) {
    console.log('POST')
    console.log(req.body)
    

    let model = new T(req.body);
    
    model.save()
        .then(resp => res.status(200).send({ message: `${T.modelName} successfully created. ${T.modelName}: ${resp}` }))
        .catch(err => res.status(500).send(`There was an error creating a  ${T.modelName}. Please try again later: ${err.message}`));
};

exports.deleteModelById = function (req, res, T) {
    console.log('DELETE')
    console.log(req.query.id)

    T.findByIdAndRemove(req.query.id)
        .then((resp, error) => {
            if (resp)
                res.status(200).send({ message: `${T.modelName} successfully removed. ${T.modelName}: ${resp}`})
            else
                res.status(200).send({ message: `Can't find ${T.modelName} to remove. ${T.modelName}: ${resp}` })

            console.log(error);
        })
        .catch(err => res.status(500).send(500, `There was an error removing ${T.modelName}. Please try again later: ${err.message}`));
}

exports.updateModelById = function (req, res, T) {
    console.log('UPDATE')
    console.log(req.query.id)
    console.log(req.body);

    T.findById(req.query.id).exec()
        .then((model, error) => {
            if (error) return res.status(200).send(`${T.modelName} not found with id: ${req.query.id}`)
            if (model) {
                console.log(` ${T.modelName} found, ${T.modelName}: ${model}`);
                updateModel(model, req);
                model.save()
                    .then(resp => res.status(200).send({ message: `${T.modelName} successfully updated. ${T.modelName}: ${resp} `}))
            }
        })
        .catch(err => res.status(500).send(`There was an error updating ${T.modelName}. Please try again later: ${err.message}`))
};

exports.findAllModels = function (req, res, T) {
    console.log('GET')

    T.find()
        .then(resp => res.status(200).jsonp(resp))
        .catch(err => res.status(500).send(`There was an error searching all ${T.modelName}. Please try again later: ${err.message}`));
};

function updateModel(oldModel, newModel) {
    for (var index = 0; index < Object.keys(oldModel).length; index++) {
        var element = Object.keys(oldModel)[index];
        //Set element if this is not defined        
        oldModel[element] = newModel[element] || oldModel[element];
    }
    return oldModel;
};