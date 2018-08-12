import { Router } from 'express';
import Debug from 'debug';

import { messageRes } from '../lib/util';
import { validate, genNotifications} from '../lib/inputValidator';


export default ({ config, db }) => {
    let api = Router();
    const debug = Debug('mail-cop:InputValidation');

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