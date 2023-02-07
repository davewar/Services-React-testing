import { render, screen } from '@testing-library/react';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';

const MockHome = () => {
	return (
		<BrowserRouter>
			<Home />
		</BrowserRouter>
	);
};

describe('Home', () => {
	test('Component renders correctly', () => {
		render(<MockHome />);

		// screen.debug();

		const myValue = screen.getByRole('heading', {
			name: /technical solutions for your business needs/i,
		});

		expect(myValue).toBeInTheDocument();
	});
});
