import { render } from '@testing-library/react';
import UserProvider from './contexts/user';

const customRender = (ui, options) =>
	render(ui, { wrapper: UserProvider, ...options });

export * from '@testing-library/react';
export { customRender as render };
