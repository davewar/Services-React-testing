import { rest } from 'msw';
import { handlers as loginHandlers } from './domains/login';
import { handlers as contactformHandlers } from './domains/contactform';

// export const handlers = [...loginHandlers, ...contactformHandlers];

export const handlers = [
	rest.post('http://localhost:5000/api/email/', (req, res, ctx) => {
		// console.log(req.body, 'api/email');

		return res(
			ctx.json({
				msg: 'Thank you for your enquiry. We will be in contact with you shortly.',
			})
		);
	}),

	rest.post('http://localhost/user/login', (req, res, ctx) => {
		console.log(req.body, 'user/login');
		let userid = 123;
		let username = 'steve';
		let userrole = 0;

		return res(
			ctx.status(200),
			ctx.json({
				accesstoken: '123',
				user: { id: userid, name: username, role: userrole },
			})
		);
	}),
];

// https://kentcdodds.com/blog/stop-mocking-fetch
