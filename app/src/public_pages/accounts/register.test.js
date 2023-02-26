import { render, screen, waitFor, act } from '@testing-library/react';
import Register from './Register';
import { BrowserRouter } from 'react-router-dom';
import user from '@testing-library/user-event';
import { UserContext } from '../../contexts/user';
import '@testing-library/jest-dom';

// https://stackoverflow.com/questions/56828017/testing-usecontext-with-react-testing-library

let providerProps;

const mycustomRender = (ui, { providerProps, ...renderOptions }) => {
	return render(
		<UserContext.Provider value={providerProps}>
			<BrowserRouter>{ui}</BrowserRouter>
		</UserContext.Provider>,
		renderOptions
	);
};

describe.only('.Register', () => {
	test('Component renders correctly if user NOT logged in', async () => {
		user.setup();

		providerProps = {
			user: '',
			accessToken: '12345678910',
			isUser: false,
			isEditor: false,
			isAdmin: false,
			role: '',
			logUserOut: jest.fn(function () {
				providerProps.isLogged = false;
			}),
			isLogged: false,
		};

		mycustomRender(<Register />, { providerProps });

		screen.debug();
	});
});
