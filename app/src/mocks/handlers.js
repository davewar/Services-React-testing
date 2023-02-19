import { rest } from 'msw';
import { handlers as loginHandlers } from './domains/login';
import { handlers as contactformHandlers } from './domains/contactform';

import { TESTUSERS } from './data/users';

// export const handlers = [...loginHandlers, ...contactformHandlers];

export const handlers = [
	rest.post('http://localhost:5000/api/email/', (req, res, ctx) => {
		console.log('api/email hit via msw');

		return res(
			ctx.json({
				msg: 'Thank you for your enquiry. We will be in contact with you shortly.',
			})
		);
	}),

	rest.post('http://localhost:5000/user/login', async (req, res, ctx) => {
		console.log('user/login hit via msw handler');

		let { password, email } = await req.json();
		// console.log('DW....', password, email);

		let userid = TESTUSERS[0].id;
		let username = TESTUSERS[0].name;
		let userrole = TESTUSERS[0].role;
		let accesstoken =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOGNmM2FmYjM3ZWY5OTFkMDc1NTg3NyIsImlhdCI6MTY3NjYyMjk1MCwiZXhwIjoxNjc2NjIzODUwfQ.eW1ABFO-zjF0G1s5HsSisW6TJYap3DF1qaZ5Z32EXoI';

		// valid user - incorrect pw
		if (password === '1234567' && email === TESTUSERS[0].email) {
			return res(
				ctx.status(400),
				ctx.json({
					errors: 'Incorrect login. Please try again',
				})
			);
		}

		// no user found
		if (email !== TESTUSERS[0].email) {
			return res(
				ctx.status(400),
				ctx.json({
					errors: 'Incorrect login. Please try again',
				})
			);
		}

		// valid user all gd
		if (password === '123456789' && email === TESTUSERS[0].email) {
			return res(
				ctx.json({
					msg: {
						accesstoken,
						user: { id: userid, name: username, role: userrole },
					},
				})
			);
		}

		// return res(
		// 	ctx.json({
		// 		msg: {
		// 			accesstoken,
		// 			user: { id: userid, name: username, role: userrole },
		// 		},
		// 	})
		// );
	}),

	rest.get('http://localhost/user/infor', async (req, res, ctx) => {
		console.log('user/infor called via msw');

		// let {email} = req.body

		let userid = TESTUSERS[0].id;
		let username = TESTUSERS[0].name;
		let userrole = TESTUSERS[0].role;

		// let accesstoken =
		// 	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOGNmM2FmYjM3ZWY5OTFkMDc1NTg3NyIsImlhdCI6MTY3NjYyMjk1MCwiZXhwIjoxNjc2NjIzODUwfQ.eW1ABFO-zjF0G1s5HsSisW6TJYap3DF1qaZ5Z32EXoI';

		return res(
			ctx.status(200),
			ctx.json({
				user: { name: username, role: userrole },
			})
		);

		// if no user

		// return res(
		// 	ctx.json({
		// 		msg: 'User does not exist.',
		// 	})
		// );
	}),
];
