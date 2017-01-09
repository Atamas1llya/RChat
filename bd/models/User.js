import mongoose, {Schema} from 'mongoose';

const UserSchema = new Schema({
    login: {type: String, require: true, unique: true},
    password: {type: String, require: true}
})
export default mongoose.model('User', UserSchema);
