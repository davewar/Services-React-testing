import { render, screen, waitFor } from '@testing-library/react';
import Error from './Error';
import { BrowserRouter } from 'react-router-dom';
import user from '@testing-library/user-event';

const MockError = () => {
	return (
		<BrowserRouter>
			<Error />
		</BrowserRouter>
	);
};

describe.skip('.Error', () => {
	test('Component renders correctly', async () => {
		user.setup();
		window.history.pushState({}, '', '/blah');

		render(<MockError />);

		// console.log('BEFORE', window.location.pathname);

		let heading = screen.getByRole('heading', {
			name: /Oops!/i,
		});

		let linkItem = screen.getByRole('link', { name: /Visit Our Homepage/i });

		expect(heading).toBeInTheDocument();
		expect(linkItem).toBeInTheDocument();

		await user.click(linkItem);
		// console.log('AFTER', window.location.pathname);
		expect(window.location.pathname).toBe('/');
	});
});
