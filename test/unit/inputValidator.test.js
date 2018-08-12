import { expect } from 'chai';

import { validate } from '../../src/lib/inputValidator';
import * as sample from './sampleInput.json';

describe('Input Validator Tools', function () {
    it('should reject when FROM is not valid', function () {
        expect(validate(sample.fromInvalid.message)).to.deep.equal(sample.fromInvalidGrid);
    });

    it('should reject when TO is not valid', function () {
        expect(validate(sample.toInvalid.message)).to.deep.equal(sample.toInvalidGrid);
    });

    it('should reject when CC is not valid', function () {
        expect(validate(sample.ccInvalid.message)).to.deep.equal(sample.ccInvalidGrid);
    });

    it('should reject when BCC is not valid', function () {
        expect(validate(sample.bccInvalid.message)).to.deep.equal(sample.bccInvalidGrid);
    });

    it('should reject when SUBJECT is not valid', function () {
        expect(validate(sample.subjectInvalid.message)).to.deep.equal(sample.subjectInvalidGrid);
    });

    it('should reject when TEXT is not valid', function () {
        expect(validate(sample.textInvalid.message)).to.deep.equal(sample.textInvalidGrid);
    });


});