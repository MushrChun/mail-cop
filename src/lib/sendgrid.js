import request from 'request-promise';
import Debug from 'debug';

import mailConfig from '../config.mail.json';


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

        const ccArray = messageBody.cc.filter((val => val)).map(item => { return { email: item } });
        if(ccArray.length > 0) data.personalizations[0].cc = ccArray;

        const bccArray = messageBody.bcc.filter((val => val)).map(item => { return { email: item } });
        if(bccArray.length > 0) data.personalizations[0].bcc = bccArray;

        const option = {
            ...this.basicOption,
            body: data
        }
        this.debug(JSON.stringify(option));
        // return Promise.reject();
        return request(option);

    }
}

export default SendGrid;