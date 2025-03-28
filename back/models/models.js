import joi from 'joi';
import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema({
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
    status: {
        type: String,
        enum: ['attente', 'accepté','refusé'],
        default: 'attente'
    }
}, {
    timestamps: true
}
);

const Candidate = mongoose.model('candidature', candidateSchema);

export default Candidate;