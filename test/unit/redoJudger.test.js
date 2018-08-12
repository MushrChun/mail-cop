import { expect } from 'chai';

import RedoJudger from '../../src/lib/redoJudger';


describe('Reject redo accroding to maxRedo times', function () {
    it('should reject after one try when maxRedo is one', function () {
        const redoJudge = new RedoJudger();
        expect(redoJudge.allowRedo('test')).to.be.true;
        redoJudge.accumulate('test');
        expect(redoJudge.allowRedo('test')).to.be.false;
    });

    it('should reject after three tries when maxRedo is three', function () {
        const redoJudge = new RedoJudger(3);
        expect(redoJudge.allowRedo('test')).to.be.true;
        redoJudge.accumulate('test');
        expect(redoJudge.allowRedo('test')).to.be.true;
        redoJudge.accumulate('test');
        expect(redoJudge.allowRedo('test')).to.be.true;
        redoJudge.accumulate('test');
        expect(redoJudge.allowRedo('test')).to.be.false;
    });
});
