import Debug from 'debug';
import Promise from 'bluebird';
import Mailgun from './mailgun';
import SendGrid from './sendgrid';
import * as string from '../string';

class MailBroker {

    constructor() {
        this.mailGun = new Mailgun();
        this.sendGrid = new SendGrid();
        this.debug = Debug('mail-cop:Broker');

        this.providers = [
            'mailgun', 'sendgrid'
        ];
    }

    sendMessage(messageBody) {
        const firstProvider = this.providers[0];
        switch (firstProvider) {
            case 'mailgun': {
                return this.mailGun.sendMessage(messageBody)
                    .then(success => {
                        this.debug(success)
                        return Promise.resolve(string.SUCCESS);
                    })
                    .catch(err => {
                        this.rotateProvider();
                        return this.sendMessage(messageBody);
                    });
            }
            case 'sendgrid': {
                return this.sendGrid.sendMessage(messageBody)
                    .then(success => {
                        this.debug(success)
                        return Promise.resolve(success);
                    })
                    .catch(err => {
                        this.rotateProvider();
                        return this.sendMessage(messageBody);
                    });
            }
            default: this.debug('none suitable provider');
        }
    }

    // Move the first provider to the tail
    rotateProvider() {
        this.providers.push(this.providers.shift());
    }
}

export default MailBroker;