import request from 'request-promise';
import Promise from 'bluebird';
import mailConfig from '../config.mail.json';
import Debug from 'debug';

class SendGrid {

    constructor() {
        this.API_KEY = mailConfig.SendGirdApiKey;

        this.basicOption = {
            method: 'POST',
            json: true,
            headers: {
                Authorization: `Bearer ${this.API_KEY}`,
                'Content-Type': 'application/json'
            },
            uri: 'https://api.sendgrid.com/v3/mail/send'
        }
        this.debug = Debug('mail-cop:SendGrid');
    }

    sendMessage(messageBody) {

        const data = {
            "personalizations": [
                {
                    "to": messageBody.to.map(item => { return { email: item } }),
                    "cc": messageBody.cc.map(item => { return { email: item } }),
                    "bcc": messageBody.bcc.map(item => { return { email: item } }),
                    "subject": messageBody.subject
                }
            ],
            "from": {
                "email": messageBody.from
            },
            "content": [
                {
                    "type": "text/plain",
                    "value": messageBody.text
                }
            ]
        }
        const option = {
            ...this.basicOption,
            body: data
        }
        this.debug(JSON.stringify(option));
        // return request(option);

        return Promise.reject({message: 'fail via sendgrid'});
        // return Promise.resolve({ message: 'success via sendgrid' });
    }
}

export default SendGrid;