import { Router } from 'express';

import validationMiddleware from './inputValidation';


export default ({ config, db }) => {
	let routes = Router();

	// add middleware here
	routes.use('/api',validationMiddleware({ config, db }));

	return routes;
}
