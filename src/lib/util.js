
import * as string from '../string';

/**	Creates a callback that proxies node callback style arguments to an Express Response object.
 *	@param {express.Response} res	Express HTTP Response
 *	@param {number} [status=200]	Status code to send on success
 *
 *	@example
 *		list(req, res) {
 *			collection.find({}, toRes(res));
 *		}
 */
export function toRes(res, status = 200) {
	return (err, thing) => {
		if (err) return res.status(500).send(err);

		if (thing && typeof thing.toObject === 'function') {
			thing = thing.toObject();
		}
		res.status(status).json(thing);
	};
}

// if hasErr ture, the status code should  be 5XX, internal error
export const messageRes = (hasInternalErr, res, message) => {
	if (hasInternalErr) {
		const payload = {
			status: 500,
			message: string.SERVICE_BROKEN
		}
		res.status(500).json({ payload });
	}
	else {
		if (message) {
			const payload = {
				status: 400,
				message
			}
			res.status(400).json({ payload });
		} else {
			const payload = {
				status: 200,
				message: string.SUCCESS
			}
			res.status(200).json({ payload });
		}
	}
}