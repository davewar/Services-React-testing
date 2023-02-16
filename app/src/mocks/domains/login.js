import { rest } from 'msw';
let baseUrl = process.env.REACT_APP_BACKEND_URL;

export const handlers = [
	rest.post(`${baseUrl}/user/login`, (req, res, ctx) => {
		console.log('dw - userlogin post handler');

		return res(
			ctx.json({
				msg: 'Hello',
			})
		);
	}),
];
