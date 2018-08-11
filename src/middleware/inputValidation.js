import { Router } from 'express';
import Debug from 'debug';
import validator from 'validator';

import * as string from '../string';
import { messageRes } from '../lib/util';

const validate = (message) => {
    const errorGrid = getErrorGrid();

    if (!message) return errorGrid;

    errorGrid.from = validator.isEmail(message.from);
    errorGrid.to = Array.isArray(message.to) && message.to.every(((item) => validator.isEmail(item)));
    errorGrid.cc = Array.isArray(message.cc) && message.cc.every(((item) => validator.isEmail(item)));
    errorGrid.bcc = Array.isArray(message.bcc) && message.bcc.every(((item) => validator.isEmail(item)));
    errorGrid.subject = message.subject && typeof message.subject==='string' && message.subject.length > 0;
    errorGrid.text = message.text && typeof message.text==='string' &&  message.text.length > 0;

    return errorGrid;
};

const getErrorGrid = () => {
    // false means not pass
    return {
        from: false,
        to: false,
        cc: false,
        bcc: false,
        subject: false,
        text: false
    };
}

const genNotifications = (grid) => {
    let result = '';
    for (let key in grid) {
        if (!grid[key]) {
            result += string[`INVALID_${key.toUpperCase()}`] + '\n';
        }
    }
    return result;
}

export default ({ config, db }) => {
    let api = Router();
    const debug = Debug('mail-cop:input validation');

    api.post('/mails', (req, res, next) => {

        const errorGrid = validate(req.body.message);
        const result = genNotifications(errorGrid);

        debug(result);

        // if there is error, stop here
        if (result.length > 0) {
            messageRes(false, res, result);
        }
        else {
            next();
        }

    });

    return api;
}