import {Request, Response} from 'express';
import Animes from '../model/AnimeModel';

export default{
    async create (request: Request, response: Response){
        const {
            name,
            year,
            director,
            genres
        } = request.body;
        console.log(request.body);

        await Animes.create({
            name,
            year,
            director,
            genres
        }).then(function(data){
            return response.status(201).send(data)
        })
    },

    async index(request: Request, response: Response){
        await Animes.find()
            .then(function(data){
                return response.status(200).send(data)
        })
    },

    async update(request: Request, response: Response){
        const dados = request.body;
        const id = request.params.id;

        await Animes.findByIdAndUpdate(id, dados)
            .then(function(old_anime){
                Animes.findOne({_id: request.params.id})
                    .then(function(new_anime){
                        return response.status(200).send(new_anime);
            })
        })
    },

    async delete(request: Request, response: Response){
        return await Animes.findByIdAndRemove({_id: request.params.id}).then((anime)=>{
            response.send(anime);
        })
    }
}