import { render, screen, waitFor, wait } from '@testing-library/react';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';
import user from '@testing-library/user-event';

import { TESTUSERS } from '../../mocks/data/users';

import UserProvider from '../../contexts/user';

// import { expect, jest, test } from '@jest/globals';

// global.fetch = jest.fn();

describe.skip('Login', () => {
	test('Component renders correctly', async () => {
		let handleSignin = jest.fn();
		user.setup();

		const MockLogin = () => {
			return (
				<BrowserRouter>
					<Login onSubmit={handleSignin} />
				</BrowserRouter>
			);
		};

		render(<MockLogin />, { wrapper: UserProvider });

		await user.type(getEmail(), TESTUSERS[0].email);
		await user.type(getPasswordInput(), '123456789');

		expect(getEmail()).toHaveValue(TESTUSERS[0].email);
		expect(getPasswordInput()).toHaveValue('123456789');

		await user.click(screen.getByRole('button', { name: /submit/i }));

		console.log(handleSignin.mock);
		// await waitFor(() => expect(handleSignin).toHaveBeenCalledTimes(1));
	});
});

function getEmail() {
	return screen.getByRole('textbox', { name: /email/i });
}

function getPasswordInput() {
	return screen.getByPlaceholderText('Enter password');
}
