
import { Router } from 'express';

import { name, version } from '../../package.json';
import mails from './mails';


export default ({ config, db }) => {
	let api = Router();

	// mount the mail resource
	api.use('/mails', mails({ config, db }));

	api.get('/', (req, res) => {
		res.json({ 
			name,
			version
		});
	});

	return api;
}
