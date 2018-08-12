import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import MailBroker from '../../src/lib/mailBroker';
import * as string from '../../src/string';
import { SendGridFailFake, SendGridSuccessFake, MailgunFailFake, MailgunSuccessFake } from '../fakes/mailProviderFakes'

chai.use(chaiAsPromised);
const expect = chai.expect;


describe('MailBroker', function () {

  describe('One provider goes down', function () {
    it('should send via SendGrid when Mailgun goes down', function () {
      const mailBroker = new MailBroker(new MailgunFailFake(), new SendGridSuccessFake());
      return expect(mailBroker.sendMessage()).to.eventually.equal(string.SUCCESS_SENGGRID);
    });

    it('should send via Mailgun when SendGird goes down', function () {
      const mailBroker = new MailBroker(new MailgunSuccessFake(), new SendGridFailFake());
      return expect(mailBroker.sendMessage()).to.eventually.equal(string.SUCCESS_MAILGUN);
    });
  });

  describe('Both providers go down', function () {
    it('should return fail to send notification', function () {
      const mailBroker = new MailBroker(new MailgunFailFake(), new SendGridFailFake());
      return expect(mailBroker.sendMessage()).to.be.eventually.rejected.then(err => {
        expect(err).to.be.oneOf([string.FAIL_MAILGUN, string.FAIL_SENGGRID]);
      });
    });
  });

  describe('No provider go down', function () {
    it('should go with any SendGrid or Mailgun', function () {
      const mailBroker = new MailBroker(new MailgunSuccessFake(), new SendGridSuccessFake());
      return expect(mailBroker.sendMessage()).to.be.eventually.oneOf([string.SUCCESS_MAILGUN, string.SUCCESS_SENGGRID]);
    });
  });
});