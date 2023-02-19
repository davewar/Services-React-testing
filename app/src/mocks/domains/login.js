import { rest } from 'msw';
let baseUrl = process.env.REACT_APP_BACKEND_URL;

export const handlers = [
	rest.post(`${baseUrl}/user/login`, (req, res, ctx) => {
		console.log('dw - userlogin post handler');

		// console.log(req.text());

		console.log('PW', req.method());
		console.log('Headers dw', req.headers());
		console.log('body used dw', req.bodyUsed());

		console.log('cookierss dw', req.cookies());

		return res(
			ctx.json({
				msg: 'Hello',
			})
		);
	}),
];
