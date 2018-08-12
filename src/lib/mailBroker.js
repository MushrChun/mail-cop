import Debug from 'debug';
import Promise from 'bluebird';
import Mailgun from './mailgun';
import SendGrid from './sendgrid';
import * as string from '../string';
import RedoJudger from './redoJudger';

class MailBroker {

    constructor( mailGun = new Mailgun(), sendGrid = new SendGrid() ) {
        this.mailGun = mailGun;
        this.sendGrid = sendGrid;
        this.debug = Debug('mail-cop:Broker');

        this.providers = [
            'sendgrid', 'mailgun'
        ];
    }

    sendMessage(messageBody, redoJudger = new RedoJudger()) {
        const firstProvider = this.providers[0];
        this.debug('firstProvider: ', firstProvider);
        switch (firstProvider) {
            case 'mailgun': {

                if (!redoJudger.allowRedo('mailgun')) return Promise.reject(string.FAIL_MAILGUN);

                return this.mailGun.sendMessage(messageBody)
                    .then(success => {
                        this.debug('in mailgun success: ', success);
                        return Promise.resolve(string.SUCCESS_MAILGUN);
                    })
                    .catch(err => {
                        this.debug('in mailgun fail: ', err);
                        redoJudger.accumulate('mailgun');
                        this.rotateProvider();
                        return this.sendMessage(messageBody, redoJudger);
                    });
            }
            case 'sendgrid': {

                if (!redoJudger.allowRedo('sendgrid')) return Promise.reject(string.FAIL_SENGGRID);

                return this.sendGrid.sendMessage(messageBody)
                    .then(success => {
                        this.debug('in sendgrid success: ', success);
                        return Promise.resolve(string.SUCCESS_SENGGRID);
                    })
                    .catch(err => {
                        this.debug('in sendgrid fail: ', err);
                        redoJudger.accumulate('sendgrid');
                        this.rotateProvider();
                        return this.sendMessage(messageBody, redoJudger);
                    });
            }
            default: {
                this.debug('none suitable provider');
                return Promise.reject(string.FAIL_BOTH);
            }
        }
    }

    // Move the first provider to the tail
    rotateProvider() {
        this.providers.push(this.providers.shift());
    }
}

export default MailBroker;