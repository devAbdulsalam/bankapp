import images from '@/constants/Images';
import { COLORS } from '@/constants/Colors';
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

export const savingsData = [
	{ id: 1, name: 'Automatic Savings', balance: '5000', number: '1424154545' },
	{ id: 2, name: 'Locked Savings', balance: '2000', number: '1424154546' },
	{ id: 3, name: 'Fixed Savings', balance: '2000', number: '1424154546' },
	{ id: 4, name: 'Savings Goals', balance: '2000', number: '1424154546' },
	{ id: 5, name: 'Fixed Savings', balance: '2000', number: '1424154546' },
	{ id: 6, name: 'Budget', balance: '2000', number: '1424154546' },
];

export const services = [
	{
		id: 1,
		name: 'Deposits',
		icon: 'money-bill-transfer',
		iconType: 'FontAwesome6',
		link: '/finance/deposite',
		color: COLORS.yellow,
		backgroundColor: COLORS.lightyellow,
	},
	{
		id: 4,
		name: 'Transfer',
		icon: 'send-o',
		iconType: 'FontAwesome',
		link: 'finance/transfer',
		color: COLORS.purple,
		backgroundColor: COLORS.lightpurple,
	},

	{
		id: 3,
		name: 'My Savings',
		icon: 'sack-dollar',
		iconType: 'FontAwesome6',
		link: '/finance/savings',
		color: COLORS.primary,
		backgroundColor: COLORS.lightGreen,
	},

	{
		id: 9,
		name: 'Expense',
		icon: 'arrow-right-arrow-left',
		iconType: 'FontAwesome6',
		link: '/services',
		color: COLORS.red,
		backgroundColor: COLORS.lightRed,
	},
	{
		id: 4,
		name: 'Rewards',
		icon: 'hand-coin-outline',
		iconType: 'MaterialCommunityIcons',
		color: COLORS.yellow,
		backgroundColor: COLORS.lightyellow,
		link: '/rewards',
	},
	{
		id: 5,
		name: 'Statements',
		icon: 'list',
		iconType: 'FontAwesome',
		link: '/(app)/transactions',
		color: COLORS.purple,
		backgroundColor: COLORS.lightpurple,
	},
	{
		id: 6,
		name: 'Receipt',
		icon: 'more-horizontal',
		iconType: 'Feather',
		link: '/finance/receipt',
		color: COLORS.red,
		backgroundColor: COLORS.lightRed,
	},
	{
		id: 7,
		name: 'Reminder',
		icon: 'alarm',
		iconType: 'MaterialIcons',
		link: '/services',
		color: COLORS.primary,
		backgroundColor: COLORS.lightGreen,
	},
	{
		id: 8,
		name: 'Savings Planner',
		icon: 'dotchart',
		iconType: 'AntDesign',
		link: '/services',
		color: COLORS.yellow,
		backgroundColor: COLORS.lightyellow,
	},
	{
		id: 10,
		name: 'More',
		icon: 'more-horizontal',
		iconType: 'Feather',
		link: '/services',

		color: COLORS.purple,
		backgroundColor: COLORS.lightpurple,
	},
];

export const settingData = [
	{
		id: 1,
		name: 'Avatar',
		icon: 'user-circle',
		link: '/account/avatar',
		iconType: 'FontAwesome5',
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
		name: 'Payment',
		icon: 'wallet',
		link: 'account',
		iconType: 'AntDesign',
	},
	{
		id: 6,
		name: 'Security',
		icon: 'lock',
		link: 'account',
		iconType: 'AntDesign',
	},
	{
		id: 7,
		name: 'Privacy policy',
		icon: 'shield-alert-outline',
		link: 'account',
		iconType: 'MaterialCommunityIcons',
	},
	{
		id: 8,
		name: 'Terms and condition',
		icon: 'list-alt',
		link: 'account',
		iconType: 'FontAwesome5',
	},
	{
		id: 9,
		name: 'Customer support',
		icon: 'headset',
		link: 'account',
		iconType: 'FontAwesome6',
	},
];
export const transactions = [
	{
		id: 1,
		name: 'Airtime',
		amount: '5000',
		type: 'Deposit',
		description: '',
		logo: 'https://nigerianbanks.xyz/logo/access-bank-diamond.png',
	},
	{ id: 2, name: 'Bill', amount: '5000', type: 'Transfer', description: '' },
	{ id: 3, name: 'Current', amount: '5000', type: 'Transfer', description: '' },
	{ id: 4, name: 'Airtime', amount: '5000', type: 'Deposit', description: '' },
	{
		id: 5,
		name: 'Current',
		amount: '5000',
		type: 'Transfer',
		description: '',
		logo: 'https://nigerianbanks.xyz/logo/access-bank-diamond.png',
	},
	{ id: 6, name: 'Airtime', amount: '5000', type: 'Deposit', description: '' },
	{ id: 7, name: 'Current', amount: '5000', type: 'Transfer', description: '' },
	{ id: 8, name: 'Airtime', amount: '5000', type: 'Deposit', description: '' },
];
