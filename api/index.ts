import axios from 'axios';
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
export const fetchUser = async (props) => {
	const config = {
		headers: {
			Authorization: `Bearer ${props?.accessToken}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/users/${props.id}`, config)
			.then((res) => res.data);
		// console.log('fetchuser data', data);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
export const fetchTransactions = async (props) => {
	const config = {
		headers: {
			Authorization: `Bearer ${props?.accessToken}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/transactions`, config)
			.then((res) => res.data);
		console.log('fetch banks data', data);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
export const fetchBanks = async (props) => {
	try {
		const data = await axios
			.get(`https://nigerianbanks.xyz`)
			.then((res) => res.data);
		// console.log('fetchuser data', data);
		return data;
	} catch (error) {
		console.log(error?.message);
		return error;
	}
};
export const fetchBank = async (props) => {
	const config = {
		headers: {
			Authorization: `Bearer ${props?.accessToken}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/services/banks`, config)
			.then((res) => res.data);
		// console.log('fetchuser data', data);
		return data;
	} catch (error) {
		console.log(error?.message);
		return error;
	}
};
export const getBank = async () => {
	const ux = 'faruqhassan176@gmail.com';
	const key = 'fFV6s*@L~GM5G0dF';
	const iv = 't%v(i36i%d&YEPzL';

	try {
		// Request 1: Obtain Authorization Token
		const createToken = await axios.post(
			'https://collabo.fsi.ng/fsi-gateway/api/auth/sys-login',
			{
				ux,
				iv,
				key,
			}
		);
		const { Authorization } = createToken.data;
		console.log(Authorization, createToken.data);

		// Request 2: Use Authorization Token
		const response = await axios.post(
			`/fsi-gateway/api/flutterwave/banks/banks-list/NG`,
			{
				headers: { CUSTOMER_AUTHORIZATION: Authorization },
			}
		);
		return (data = response.data);
	} catch (error) {
		console.log(error?.message);
		return error;
	}
};
export const fetchTransaction = async (props) => {
	const config = {
		headers: {
			Authorization: `Bearer ${props?.accessToken}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/transactions/${props.id}`, config)
			.then((res) => res.data);
		// console.log('fetchuser data', data);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
export const verifyAccount22 = async (props) => {
	// const config = {
	// 	headers: {
	// 		Authorization: `Bearer ${props?.accessToken}`,
	// 	},
	// };
	const { account_bank, amount, account_number, requestId } = props;
	// if (!account_number || !amount,  || !account_bank) {
	// 	return res.status(422).json({ message: 'Please enter valid credentials' });
	// }
	const ux = 'faruqhassan176@gmail.com';
	const key = 'fFV6s*@L~GM5G0dF';
	const iv = 't%v(i36i%d&YEPzL';

	try {
		// Create token
		const createToken = await axios.post(
			'https://collabo.fsi.ng/fsi-gateway/api/auth/sys-login',
			{
				ux,
				iv,
				key,
			}
		);
		const { Authorization } = createToken.data;

		const response = await axios.post(
			`https://collabo.fsi.ng//fsi-gateway/api/flutterwave/transfers/create-transfer`,
			{
				requestId,
				account_number,
				account_bank,
				amount,
				currency: 'NGN',
				transLocation: '1.234566, 1.4837379',
				narration: 'Transfer to account',
				reference: '0000000342c5bbaf91fa',
			},
			{
				headers: {
					CUSTOMER_AUTHORIZATION: Authorization,
				},
			}
		);

		if (response.data.status !== false) {
			return response.data;
		} else {
			throw { error: response.data };
		}
	} catch (error) {
		console.log(error?.message);
		return error;
	}
};

export const verifyAccount3 = async (props) => {
	const apiToken = 'Yu3OJtW6z80ccmVjYcEmqlZipTuT4UYs2xc6jgpM2df870e6';

	// https://nubapi.com/bank-json

	try {
		const { account, bank } = props;
		const response = await fetch(
			`http://nubapi.test/api/verify?account_number=${account}&bank_code=${bank}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${apiToken}`, // Replace with your actual Bearer token
				},
			}
		);

		if (!response.ok) {
			throw new Error('Request failed');
		}
		const data = await response.json();
		console.log('verify data', data);

		return data;
	} catch (error) {
		console.error(...error);
		return error;
	}
};

export const verifyAccount = async (props) => {
	try {
		const { account, bank } = props;
		const response = await axios
			.post(`${apiUrl}/payment/verify-account`, { account, bank })
			.then((res) => res.data);
		return response;
	} catch (error) {
		console.error(error);
		return error;
	}
};
export const Transfer = async (props) => {
	const config = {
		headers: {
			Authorization: `Bearer ${props?.accessToken}`,
		},
	};

	const { account_bank, amount, account_number, requestId } = props.data;
	// if (!account_number || !amount,  || !account_bank) {
	// 	return res.status(422).json({ message: 'Please enter valid credentials' });
	// }
	const ux = 'faruqhassan176@gmail.com';
	const key = 'fFV6s*@L~GM5G0dF';
	const iv = 't%v(i36i%d&YEPzL';

	try {
		// Create token
		const createToken = await axios.post(
			'https://collabo.fsi.ng/fsi-gateway/api/auth/sys-login',
			{
				ux,
				iv,
				key,
			}
		);
		const { Authorization } = createToken.data;

		const response = await axios.post(
			`https://collabo.fsi.ng//fsi-gateway/api/flutterwave/transfers/create-transfer`,
			{
				requestId,
				account_number,
				account_bank,
				amount,
				currency: 'NGN',
				transLocation: '1.234566, 1.4837379',
				narration: 'Transfer to account',
				reference: '0000000342c5bbaf91fa',
			},
			{
				headers: {
					CUSTOMER_AUTHORIZATION: Authorization,
				},
			}
		);

		if (response.data.status !== false) {
			return response.data;
		} else {
			throw { error: response.data };
		}
	} catch (error) {
		console.log(error?.message);
		return error;
	}
};
