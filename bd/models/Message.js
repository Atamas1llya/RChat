import mongoose, {Schema} from 'mongoose';

const MessageSchema = new Schema({
    author: {type: String, require: true},
    rank: {type: String, require: true},
    text: {type: String, require: true},
    date: {type: String, require: true}
})

export default mongoose.model('Message', MessageSchema);
