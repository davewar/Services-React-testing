import { render, screen } from '@testing-library/react';
import Pages from './Pages';

import user from '@testing-library/user-event';
import { UserContext } from '../contexts/user';
import '@testing-library/jest-dom';
import { HelmetProvider } from 'react-helmet-async'; //meta title data -see Seo component.

const mycustomRender = (ui, { providerProps, ...renderOptions }) => {
	return render(
		<UserContext.Provider value={providerProps}>
			<HelmetProvider>{ui}</HelmetProvider>
		</UserContext.Provider>,
		renderOptions
	);
};

let providerProps = {
	user: '',
	accessToken: '',
	isUser: false,
	isEditor: false,
	isAdmin: false,
	role: '',
	logUserOut: jest.fn(function () {
		providerProps.isLogged = false;
	}),
	isLogged: false,
};

describe('.Pages', () => {
	// beforeEach(() => {
	// 	window.location.pathname = '/';
	// });

	test('Component renders correctly, expect public link to navigate to correct page - login', async () => {
		user.setup();
		mycustomRender(<Pages />, { providerProps });
		expect(window.location.pathname).toBe('/');
		let item = screen.getByRole('link', { name: 'Log In' });
		await user.click(item);
		expect(window.location.pathname).toBe('/login');
	});

	test('Component renders correctly, expect public link to navigate to correct page -services', async () => {
		user.setup();
		mycustomRender(<Pages />, { providerProps });
		expect(window.location.pathname).toBe('/login');
		let item = screen.getByRole('link', {
			name: 'link to Services website page',
		});
		await user.click(item);
		expect(window.location.pathname).toBe('/services');
	});

	test('Component renders correctly, expect public link to navigate to correct page - contact us', async () => {
		user.setup();
		mycustomRender(<Pages />, { providerProps });
		expect(window.location.pathname).toBe('/services');
		let item = screen.getByRole('link', {
			name: 'link to contact us website page',
		});
		await user.click(item);
		expect(window.location.pathname).toBe('/contact');
	});

	test('Component renders correctly, "RequireAuth component" protects private page "dashboard" , expect if no token user redirect to home', async () => {
		window.history.pushState({}, '', '/dashboard');
		// providerProps.accessToken = '123456';
		// providerProps.role = 1;

		user.setup();
		mycustomRender(<Pages />, { providerProps });

		expect(window.location.pathname).toBe('/');
	});

	test('Component renders correctly, "RequireAuth component" protects private page "dashboard" , expect if accesstoken but no role then user redirected to unauthorised page', async () => {
		window.history.pushState({}, '', '/dashboard');
		providerProps.accessToken = '123456';
		// providerProps.role = 1;

		user.setup();
		mycustomRender(<Pages />, { providerProps });

		expect(window.location.pathname).toBe('/unauthorized');
	});

	test('Component renders correctly, "RequireAuth component" protects private page "dashboard" , expect if accesstoken and a valid role then user redirected to dashboard page', async () => {
		window.history.pushState({}, '', '/dashboard');
		providerProps.accessToken = '123456';
		providerProps.role = 0;

		user.setup();
		mycustomRender(<Pages />, { providerProps });

		expect(window.location.pathname).toBe('/dashboard');
	});
});
