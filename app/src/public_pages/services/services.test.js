import { render, screen } from '@testing-library/react';
import Services from './Services';
import { BrowserRouter } from 'react-router-dom';

import '@testing-library/jest-dom';

const MockServices = () => {
	return (
		<BrowserRouter>
			<Services />
		</BrowserRouter>
	);
};

describe('Services', () => {
	test('Component renders correctly', () => {
		render(<MockServices />);

		let tOne = screen.getByRole('heading', {
			name: /welcome to dw servicing/i,
		});

		let tTwo = screen.getByText(/We are located in south east kent and/i);
		let tThree = screen.getByText(
			/tell us what you need and let us show you how we can help\. we provide a free quotation with no obligation for all our services\./i
		);

		expect(tOne).toBeInTheDocument();
		expect(tTwo).toBeInTheDocument();
		expect(tThree).toBeInTheDocument();

		let heading1 = screen.getByRole('heading', { name: /excel/i });
		let heading2 = screen.getByRole('heading', { name: /access/i });
		let heading3 = screen.getByRole('heading', { name: /bi tools/i });
		let heading4 = screen.getByRole('heading', { name: /website dev/i });
		expect(heading1).toHaveTextContent('Excel');
		expect(heading2).toHaveTextContent('Access');
		expect(heading3).toHaveTextContent('BI Tools');
		expect(heading4).toHaveTextContent('Website Dev');

		let img1 = screen.getByRole('img', { name: /excel/i });
		let img2 = screen.getByRole('img', { name: /access/i });
		let img3 = screen.getByRole('img', { name: /business inteligence/i });
		let img4 = screen.getByRole('img', { name: /bi/i });
		expect(img1).toBeInTheDocument();
		expect(img2).toBeInTheDocument();
		expect(img3).toBeInTheDocument();
		expect(img4).toBeInTheDocument();

		// Total ul items
		let tFour = screen.getAllByRole('list');
		expect(tFour.length).toBe(4);

		// total li
		let tFive = screen.getAllByRole('listitem');
		expect(tFive.length).toBe(21);
	});
});
