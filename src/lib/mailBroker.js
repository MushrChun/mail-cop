import Debug from 'debug';
import Promise from 'bluebird';
import Mailgun from './mailgun';
import SendGrid from './sendgrid';
import * as string from '../string';
import { FailGrid } from './failGrid';

class MailBroker {

    constructor() {
        this.mailGun = new Mailgun();
        this.sendGrid = new SendGrid();
        this.debug = Debug('mail-cop:Broker');

        this.providers = [
            'sendgrid', 'mailgun' 
        ];
    }

    sendMessage(messageBody, failGrid = new FailGrid()) {
        const firstProvider = this.providers[0];
        this.debug('firstProvider: ', firstProvider);
        switch (firstProvider) {
            case 'mailgun': {

                if(!failGrid.allowRedo('mailgun')) return Promise.reject(string.FAIL);

                return this.mailGun.sendMessage(messageBody)
                    .then(success => {
                        this.debug('in mailgun success: ', success);
                        return Promise.resolve(string.SUCCESS);
                    })
                    .catch(err => {
                        this.debug('in mailgun fail: ', err);
                        failGrid.accumulate('mailgun');
                        this.rotateProvider();
                        return this.sendMessage(messageBody, failGrid);
                    });
            }
            case 'sendgrid': {

                if(!failGrid.allowRedo('sendgrid')) return Promise.reject(string.FAIL);

                return this.sendGrid.sendMessage(messageBody)
                    .then(success => {
                        this.debug('in sendgrid success: ', success);
                        return Promise.resolve(string.SUCCESS);
                    })
                    .catch(err => {
                        this.debug('in sendgrid fail: ', err);
                        failGrid.accumulate('sendgrid');
                        this.rotateProvider();
                        return this.sendMessage(messageBody, failGrid);
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