import { version } from '../../package.json';
import { Router } from 'express';
import Mailgun from '../lib/mailgun';
import SendGrid from '../lib/sendgrid';

export default ({ config, db }) => {
	let api = Router();

	api.post('/', (req, res) => {
		console.log('sending a mail');

		const mailGun = new Mailgun();
		// const sendGrid = new SendGrid();
		// mailGun.sendMessage();
		// sendGrid.sendMessage();
		res.json({ version });
	});

	return api;
}