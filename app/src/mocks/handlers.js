import { rest } from 'msw';

export const handlers = [
	rest.post('http://localhost:5000/api/email/', (req, res, ctx) => {
		// console.log(req.body, 'api/email');

		return res(
			ctx.json({
				msg: 'Thank you for your enquiry. We will be in contact with you shortly.',
			})
		);
	}),
];

// https://kentcdodds.com/blog/stop-mocking-fetch
