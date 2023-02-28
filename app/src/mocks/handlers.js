import { rest } from 'msw';
// import { handlers as loginHandlers } from './domains/login';
// import { handlers as contactformHandlers } from './domains/contactform';
// export const handlers = [...loginHandlers, ...contactformHandlers];

import { TESTUSERS, CUSTOMERS } from './data/users';

// https://github.com/mswjs/headers-polyfill
// https://github.com/kentcdodds/bookshelf/blob/2e8f1af68e2030de5b89550e933773d6993c0492/src/test/server/server-handlers.js

export const handlers = [
	rest.post('http://localhost/user/reset', async (req, res, ctx) => {
		// console.log('user/reset called via msw');

		let { email, accesstoken } = await req.json();

		// no user found
		if (email === 'neilfoulds@madeupaddress.com') {
			return res(
				ctx.status(400),
				ctx.json({
					errors:
						'Invalid Authentication. Please check you entered your email address correctly and try again',
				})
			);
		}

		// user exists + accesstoken correct
		else if (email === TESTUSERS[0].email && accesstoken === '123') {
			return res(
				ctx.status(200),
				ctx.json({
					msg: 'Password successfully changed! Please log in to use your account',
				})
			);
		}

		// user exists but accesstoken incorrect (expired)
		else if (TESTUSERS[0].email && accesstoken !== '123') {
			return res(
				ctx.status(200),
				ctx.json({
					errors:
						'Invalid Authentication. Please request a new link via the SignIn button',
				})
			);
		}
	}),

	rest.post('http://localhost:5000/api/email/', (req, res, ctx) => {
		// console.log('api/email hit via msw');

		return res(
			ctx.json({
				msg: 'Thank you for your enquiry. We will be in contact with you shortly.',
			})
		);
	}),

	rest.post('http://localhost:5000/user/login', async (req, res, ctx) => {
		// console.log('user/login hit via msw handler');

		let { password, email } = await req.json();

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

		let userid = TESTUSERS[0].id;
		let username = TESTUSERS[0].name;
		let userrole = TESTUSERS[0].role;

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

	rest.post('http://localhost/user/forgot', async (req, res, ctx) => {
		// console.log('user/forgot hit via msw handler');

		let { email } = await req.json();

		if (email !== TESTUSERS[0].email) {
			// user does not exist
			return res(
				ctx.status(400),
				ctx.json({
					errors: 'Account does not exist',
				})
			);
		} else {
			// user exists
			return res(
				ctx.status(200),
				ctx.json({
					msg: 'Please check your email and reset your password using the link. You may need to check your spam/junk folder.',
				})
			);
		}
	}),

	rest.post('http://localhost/user/register', async (req, res, ctx) => {
		// console.log('user/register called via msw');

		let { email } = await req.json();

		if (email !== TESTUSERS[0].email) {
			//valid user
			return res(
				ctx.status(200),
				ctx.json({
					msg: 'Please check your email and activate your account using the link',
				})
			);
		} else if (email === TESTUSERS[0].email) {
			// account exists
			return res(
				ctx.status(400),
				ctx.json({
					errors: 'Account already exists',
				})
			);
		}
	}),

	// private

	rest.post(
		'http://localhost:5000/api/customer/create',
		async (req, res, ctx) => {
			console.log('PRIVATE ROUTE, customer/create called via msw');

			let { email } = await req.json();

			if (email === CUSTOMERS[0].email) {
				//valid user
				return res(
					ctx.status(200),
					ctx.json({
						msg: 'New customer added',
					})
				);
			} else if (email !== CUSTOMERS[0].email) {
				// account exists
				return res(
					ctx.status(400),
					ctx.json({
						errors: 'Account already exists',
					})
				);
			}
		}
	),
];
