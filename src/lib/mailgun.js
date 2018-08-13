import request from 'request-promise';

import mailConfig from '../config.mail.json';
import Debug from 'debug';


class Mailgun {

    constructor() {
        this.API_KEY = mailConfig.MailgunApiKey;
        this.DOMAIN_NAME = mailConfig.MailgunDomainName;

        this.basicOption = {
            method: 'POST',
            json: true,
            auth: {
                user: 'api',
                pass: this.API_KEY
            },
            uri: `https://api.mailgun.net/v3/${this.DOMAIN_NAME}/messages`
        }
        this.debug = Debug('mail-cop:Mailgun');
    }

    sendMessage(messageBody) {

        const data = {
            from: `<${messageBody.from}>`,
            to: messageBody.to.join(','),
            subject: messageBody.subject,
            text: messageBody.text
        };

        const ccArray = messageBody.cc.filter((val => val.length > 0));
        if (ccArray.length > 0) data.cc = ccArray.join(',');

        const bccArray = messageBody.bcc.filter((val => val.length > 0));
        if (bccArray.length > 0) data.bcc = bccArray.join(',');

        const option = {
            ...this.basicOption,
            qs: data
        }
        this.debug(JSON.stringify(option));
        // return Promise.reject();
        return request(option);
    }
}

export default Mailgun;