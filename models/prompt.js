import { Schema, model, models } from 'mongoose';

const promptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is Required']
    },
    tag: {
        type: String,
        required: [true, 'Tags are Required']
    }
})

promptSchema.pre('save', function() {
    console.log("This creator: "+ this.creator);
    if(this.creator=="") {
        const err = new Error("Creator details was not mentioned");
        next(err);
    }
})

const Prompt = models.Prompt || model('Prompt', promptSchema);

export default Prompt;