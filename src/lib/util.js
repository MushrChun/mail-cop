
import * as string from '../string';

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