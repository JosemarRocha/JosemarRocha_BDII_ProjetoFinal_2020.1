import {Document, Schema, model} from 'mongoose';

interface Anime extends Document{
    name: string,
    genres: [string],
    year: number,
    director: string,
}

const AnimeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },

    genres:{
        type: Array,
        required: [true, 'Genre field is required']
    },

    year:{
        type: Number,
        required: [true, 'Year field is required']  
    },

    director:{
        type: String,
        required: [true, 'Director field is required']
    }
})

export default model<Anime>('Anime', AnimeSchema);