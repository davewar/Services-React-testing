import { rest } from 'msw';
import { handlers as loginHandlers } from './domains/login';
import { handlers as contactformHandlers } from './domains/contactform';

import { TESTUSERS } from './data/users';

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

	rest.post('http://localhost:5000/user/login', (req, res, ctx) => {
		console.log('user/login hit');

		// let {email} = req.body

		let userid = TESTUSERS[0].id;
		let username = TESTUSERS[0].name;
		let userrole = TESTUSERS[0].role;

		let accesstoken =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOGNmM2FmYjM3ZWY5OTFkMDc1NTg3NyIsImlhdCI6MTY3NjYyMjk1MCwiZXhwIjoxNjc2NjIzODUwfQ.eW1ABFO-zjF0G1s5HsSisW6TJYap3DF1qaZ5Z32EXoI';

		return res(
			ctx.json({
				msg: {
					accesstoken,
					user: { id: userid, name: username, role: userrole },
				},
			})
		);
	}),
];
