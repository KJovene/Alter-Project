import joi from 'joi';
import mongoos from 'mongoose';

const candidateSchema = new mongoos.Schema({
    entreprise: {
        type: String,
        validate: {
            validator: function(v) {
                return joi.string()
                .required()
                .validate(v);
            },
        },
        required: [true, 'Veuillez entrer le nom de l\'entreprise']
    },
    poste: {
        type: String,
        validate: {
            validator: function(v) {
                return joi.string()
                .required()
                .validate(v);
            },
        },
        required: [true, 'Veuillez entrer le poste souhaité']
    },
    lien:{
        type: String,
        validate: {
            validator: function(v) {
                return joi.string()
                .required()
                .validate(v);
            },
        },
        required: [true, 'Veuillez entrer le lien de l\'offre']
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
    }
});

const Candidate = mongoos.model('Candidate', candidateSchema);

export default Candidate;