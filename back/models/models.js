import joi, { date } from 'joi';
import mongoos from 'mongoose';

const candidateSchema = new mongoos.Schema({
    entreprise: {
        type: String,
        required: true
    },
    poste: {
        type: String,
        required: true
    },
    lien:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true
    }
});

const Candidate = mongoos.model('Candidate', candidateSchema);

const validateCandidate = (candidate) => {
    const schema = joi.object({
        entreprise: joi.string()
        .required()
        .messages({
            'string.empty': `entreprise cannot be an empty field`}),
        poste: joi.string()
        .required()
        .messages({
            'string.empty': `poste cannot be an empty field`}
        ),
        lien: joi.string()
        .required()
        .messages({
            'string.empty': `lien cannot be an empty field`}
        ),
        date: joi.date(),
        status: joi.string()
        .required()
        .messages({
            'string.empty': `status cannot be an empty field`}
        )
    });
    return schema.validate(candidate);
}

export default { Candidate, validateCandidate };