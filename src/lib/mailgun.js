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

    sendMessage(messageBody, rotator) {


        this.debug('in sendmessage');

        const data = {
            from: 'mushrchun@gmail.com',
            to: 'mushrchun@gmail.com',
            cc: 'mushrchun@gmail.com',
            bcc: 'mushrchun@gmail.com',
            subject: 'Test',
            text: 'Testing'
        };
        const option = {
            ...this.basicOption,
            qs: data
        }
        this.debug(option);
        // return request(option);
        return Promise.resolve({message: 'success vis mailgun'});
    }
}

export default Mailgun;