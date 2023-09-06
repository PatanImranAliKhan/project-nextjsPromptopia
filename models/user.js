import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is Required']
    },
    username: {
        type: String,
        required: [true, 'username is Required']
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    }
})

const User = models.User || model('User', userSchema);

export default User;