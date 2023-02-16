export const TESTUSERS = [
	{
		id: 0,
		name: 'I am basic user',
		email: 'testdw@testmocha.com', //basic user
		validated: 'true',
		IncorrectPW: 0,
		role: 0,
		active: 'true',
		createdAt: '2023-01-22T10:10:27.601+00:00',
		updatedAt: '2023-02-12T18:28:46.480+00:00',
	},
	{
		id: 1,
		name: 'I am editor test user',
		email: '1testdw@testmocha.com', //editor
		validated: 'true',
		IncorrectPW: 0,
		role: 1,
		active: 'true',
		createdAt: '2023-01-22T10:10:27.601+00:00',
		updatedAt: '2023-02-12T18:28:46.480+00:00',
	},
	{
		id: 2,
		name: 'I am admin user',
		email: '2testdw@testmocha.com', //admin user
		validated: 'true',
		IncorrectPW: 0,
		role: 2,
		active: 'true',
		createdAt: '2023-01-22T10:10:27.601+00:00',
		updatedAt: '2023-02-12T18:28:46.480+00:00',
	},
];

export const CUSTOMERS = [
	{
		id: 11,
		name: 'newnameforCustomer1',
		businessName: 'bus1',
		email: 'customer1@gmail.com',
		telephone: '0132212345678',
		address: {
			addressLine1: '11 street road',
			addressLine2: '',
			addressLine3: '',
			town: 'Erith',
			county: 'Kent',
			postcode: 'DA2',
		},
		createdBy: '1@testmocha.com',
		createdAt: '2023-01-22T10:10:27.601+00:00',
		updatedAt: '2023-02-12T18:28:46.480+00:00',
	},
	{
		id: 12,
		name: 'newnameforCustomer2',
		businessName: 'bus2',
		email: 'customer2@gmail.com',
		telephone: '01322987654321',
		address: {
			addressLine1: '12 street road',
			addressLine2: '',
			addressLine3: '',
			town: 'Dartford',
			county: 'Surrey',
			postcode: 'SS2',
		},
		createdBy: '1@testmocha.com',
		createdAt: '2023-01-25T10:10:27.601+00:00',
		updatedAt: '2023-02-26T18:28:46.480+00:00',
	},
];
