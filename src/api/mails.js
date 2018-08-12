import { Router } from 'express';
import MailBroker from '../lib/mailBroker';
import { messageRes } from '../lib/util';
import Debug from 'debug';

export default ({ config, db }) => {
	let api = Router();
	const broker = new MailBroker();
	const debug = Debug('mail-cop:MailRouter');

	api.post('/', (req, res) => {

		const messageBody = req.body.message;
		broker
			.sendMessage(messageBody)
			.then( success => {
				debug(success);
				messageRes(false, res);
			})
			.catch( err=> {
				debug(err);
				messageRes(true, res);
			});
	});

	return api;
}