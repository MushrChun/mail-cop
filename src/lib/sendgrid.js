import request from 'request-promise';
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

    sendMessage() {


        this.debug('in sendmessage');

        const data = {
            "personalizations": [
                {
                    "to": [
                        {
                            "email": "mushrchun@gmail.com"
                        }
                    ],
                    "cc": [
                        {
                            "email": "mushrchun@outlook.com"
                        }
                    ],
                    "bcc": [
                        {
                            "email": "mushrchun.i@icloud.com"
                        }
                    ],
                    "subject": "Test"
                }
            ],
            "from": {
                "email": "mushrchun@gmail.com"
            },
            "content": [
                {
                    "type": "text/plain",
                    "value": "Testing"
                }
            ]
        }
        const option = {
            ...this.basicOption,
            body: data
        }
        this.debug(option);
        request(option)
            .then(repos => {
                console.log(repos);
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export default SendGrid;