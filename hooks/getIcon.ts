import {
	EvilIcons,
	FontAwesome6,
	AntDesign,
	Fontisto,
	MaterialIcons,
	MaterialCommunityIcons,
	Ionicons,
	Entypo,
	FontAwesome,
	Feather,
	FontAwesome5,
} from '@expo/vector-icons';

export const getIconComponent = (iconType: string) => {
	switch (iconType) {
		case 'EvilIcons':
			return EvilIcons;
		case 'Feather':
			return Feather;
		case 'MaterialCommunityIcons':
			return MaterialCommunityIcons;
		case 'Ionicons':
			return Ionicons;
		case 'Entypo':
			return Entypo;
		case 'FontAwesome':
			return FontAwesome;
		case 'FontAwesome6':
			return FontAwesome6;
		case 'AntDesign':
			return AntDesign;
		case 'Fontisto':
			return Fontisto;
		case 'MaterialIcons':
			return MaterialIcons;
		case 'FontAwesome5':
			return FontAwesome5;
		default:
			return FontAwesome6;
	}
};
