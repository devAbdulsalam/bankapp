import images from '@/constants/Images';
export const onBoardingData = [
	{
		id: 1,
		image: images.treasure,
		title: 'Welcome to User Savings App',
		discription: 'Easily manage your savings and spending in one place.',
	},
	{
		id: 2,
		image: images.financial,
		title: 'Track Your Spending',
		discription:
			'Add your spending and automatically save a percentage of the amount.',
	},
	{
		id: 3,
		image: images.savings,
		title: 'Monitor Your Savings',
		discription:
			'Keep track of your total savings and transaction history effortlessly.',
	},
];
export const REGISTER_SCREEN = {
	title: "Let's\nGet Started",
	description: 'To register for an account, kindly enter your details',
};
export const LOG_IN_SCREEN = {
	title: "Let's\nGet Started",
	description: 'To log in your account, kindly enter your details',
};
export const FORGOT_PASSWORD_SCREEN = {
	title: 'Forgot password',
	description: 'Kindly enter your email address to reset your password',
};
export const CHANGE_PASSWORD_SCREEN = {
	title: 'Change password',
	description: 'Kindly enter your new password',
};
export const accounts = [
	{ id: 1, name: 'Current', balance: '5000', number: '1424154545' },
	{ id: 2, name: 'Savings', balance: '2000', number: '1424154546' },
];
export const services = [
	{
		id: 1,
		name: 'Deposits',
		icon: 'money-bill-transfer',
		iconType: 'FontAwesome6',
		link: '/finance/deposits',
	},
	{
		id: 4,
		name: 'Transfer',
		icon: 'send-o',
		iconType: 'FontAwesome',
		link: 'finance/transfer',
	},
	{
		id: 3,
		name: 'Savings',
		icon: 'sack-dollar',
		iconType: 'FontAwesome6',
		link: '/finance/savings',
	},
	{
		id: 4,
		name: 'Transfer',
		icon: 'arrow-right-arrow-left',
		iconType: 'FontAwesome6',
		link: '/finance/transfer',
	},
	{
		id: 5,
		name: 'Statements',
		icon: 'list',
		iconType: 'FontAwesome',
		link: '/(app)/transactions',
	},
	{
		id: 6,
		name: 'More',
		icon: 'more-horizontal',
		iconType: 'Feather',
		link: '/services',
	},
];

export const settingData = [
	{
		id: 1,
		name: 'Avatar',
		icon: 'user',
		link: '/account/avatar',
		iconType: 'EvilIcons',
	},
	{
		id: 2,
		name: 'Notifications',
		icon: 'bell',
		link: '/notifications',
		iconType: 'FontAwesome6',
	},
	{
		id: 3,
		name: 'Change pin',
		icon: 'pushpino',
		link: 'account/change-pin',
		iconType: 'AntDesign',
	},
	{
		id: 4,
		name: 'Language',
		icon: 'world-o',
		link: 'account',
		iconType: 'Fontisto',
	},
	{
		id: 5,
		name: 'Privacy policy',
		icon: 'privacy-tip',
		link: 'account',
		iconType: 'MaterialIcons',
	},
	{
		id: 6,
		name: 'Terms and condition',
		icon: 'list-alt',
		link: 'account',
		iconType: 'FontAwesome5',
	},
	{
		id: 7,
		name: 'Customer support',
		icon: 'headset',
		link: 'account',
		iconType: 'FontAwesome6',
	},
];
export const transactions = [
	{ id: 1, name: 'Airtime', amount: '5000', type: 'Deposit', description: '' },
	{ id: 2, name: 'Bill', amount: '5000', type: 'Transfer', description: '' },
	{ id: 3, name: 'Current', amount: '5000', type: 'Transfer', description: '' },
	{ id: 4, name: 'Airtime', amount: '5000', type: 'Deposit', description: '' },
	{ id: 5, name: 'Current', amount: '5000', type: 'Transfer', description: '' },
	{ id: 6, name: 'Airtime', amount: '5000', type: 'Deposit', description: '' },
	{ id: 7, name: 'Current', amount: '5000', type: 'Transfer', description: '' },
	{ id: 8, name: 'Airtime', amount: '5000', type: 'Deposit', description: '' },
];
