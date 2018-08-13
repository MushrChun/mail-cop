import validator from 'validator';

import * as string from '../string';


export const validate = (message) => {
    const errorGrid = getErrorGrid();

    if (!message) return errorGrid;

    errorGrid.from = validator.isEmail(message.from);
    errorGrid.to = Array.isArray(message.to) && message.to.every(((item) => validator.isEmail(item)));
    errorGrid.cc = Array.isArray(message.cc) && message.cc.every(((item) => validator.isEmail(item) || validator.isEmpty(item)));
    errorGrid.bcc = Array.isArray(message.bcc) && message.bcc.every(((item) => validator.isEmail(item) || validator.isEmpty(item)));
    errorGrid.subject = !!message.subject && typeof message.subject==='string' && message.subject.length > 0;
    errorGrid.text = !!message.text && typeof message.text==='string' &&  message.text.length > 0;

    return errorGrid;
};

export const getErrorGrid = () => {
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

export const genNotifications = (grid) => {
    let result = '';
    for (let key in grid) {
        if (!grid[key]) {
            result += string[`INVALID_${key.toUpperCase()}`] + '\n';
        }
    }
    return result;
}