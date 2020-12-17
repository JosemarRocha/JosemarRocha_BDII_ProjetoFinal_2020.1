import {Router} from 'express'
import AnimesController from './Controllers/AnimesController';

const routes = Router();

routes.post("/mongo/create", AnimesController.create)
routes.get("/mongo/show", AnimesController.index)
routes.put("/mongoedit/:id", AnimesController.update)
routes.delete("/mongodel/:id", AnimesController.delete)

export default routes;