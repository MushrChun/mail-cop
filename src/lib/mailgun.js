import request from 'request-promise';
import Promise from 'bluebird';
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
            uri:`https://api.mailgun.net/v3/${this.DOMAIN_NAME}/messages`
        }
        this.debug = Debug('mail-cop:Mailgun');
    }

    sendMessage(messageBody) {

        const data = {
            from: messageBody.from,
            to: messageBody.to.join(','),
            cc: messageBody.cc.join(','),
            bcc: messageBody.bcc.join(','),
            subject: messageBody.subject,
            text: messageBody.text
        };
        const option = {
            ...this.basicOption,
            qs: data
        }
        this.debug(JSON.stringify(option));
        // return request(option);
        return Promise.reject({message: 'fail via mailgun'});
        // return Promise.resolve({message: 'success vis mailgun'});
    }
}

export default Mailgun;