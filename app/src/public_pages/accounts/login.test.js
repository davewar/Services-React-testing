import { render, screen, waitFor } from '@testing-library/react';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';
import user from '@testing-library/user-event';

import { TESTUSERS } from '../../mocks/data/users';

import { rest } from 'msw';
import { server } from '../../mocks/server';

import UserProvider from '../../contexts/user';

// import usecontext wrapper
// import myCustomRender from '../../myCustomRender';

// import { expect, jest, test } from '@jest/globals';

const MockLogin = () => {
	return (
		<BrowserRouter>
			<Login />
		</BrowserRouter>
	);
};

describe.only('Login', () => {
	test('Component renders correctly', async () => {
		user.setup();

		render(<MockLogin />, { wrapper: UserProvider });

		await user.type(getEmail(), TESTUSERS[0].email);
		user.tab();
		await user.type(getPasswordInput(), '123456789');
		user.tab();

		expect(getEmail()).toHaveValue(TESTUSERS[0].email);
		expect(getPasswordInput()).toHaveValue('123456789');
		expect(getPasswordInput()).toHaveAttribute('type', 'password');
		expect(getPassWVis_btn()).toBeInTheDocument();

		await user.click(screen.getByRole('button', { name: /submit/i }));
		let resData = '';

		// screen.debug();

		// await waitFor(async () => {
		// 	resData = await screen.findByText(
		// 		'Thank you for your enquiry. We will be in contact with you shortly.',
		// 		{
		// 			exact: false,
		// 		}
		// 	);
		// 	expect(resData).toBeInTheDocument();
		// });

		// http://localhost:3000/dashboard
	});
});

function getEmail() {
	return screen.getByRole('textbox', { name: /email/i });
}

function getPasswordInput() {
	return screen.getByPlaceholderText('Enter password');
}

function getPassWVis_btn() {
	return screen.getByRole('button', {
		name: /click to change password visibility/i,
	});
}

function getSubmitBtn() {
	return screen.getByRole('button', { name: /submit/i });
}

function getForgotPasswordLInk() {
	return screen.getByRole('link', {
		name: /Forgotten Password/i,
	});
}
