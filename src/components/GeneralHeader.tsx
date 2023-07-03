import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { PRIMARY_COLOR } from '../constants/colors';

type Props = {
	title: string;
};

const GeneralHeader = ({ title }: any) => {
	const navigation: any = useNavigation();
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.goBack()}
			>
				<Ionicons name='ios-arrow-back' size={24} color='#FFFFFF' />
			</TouchableOpacity>

			<Text style={styles.title}>{title}</Text>

			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.navigate('Root')}
			>
				<Ionicons name='ios-home' size={24} color='#FFFFFF' />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		height: 60,
		width: '100%',
	},
	button: {
		borderRadius: 20,
		paddingHorizontal: 12,
		paddingVertical: 8,
		backgroundColor: PRIMARY_COLOR,
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold',
	},
});

// const GeneralHeader = (props: Props) => {
// 	const { title } = props;
// 	return <Text style={styles.heading}>{title}</Text>;
// };

export default GeneralHeader;

// const styles = StyleSheet.create({
// 	heading: {
// 		fontSize: 24,
// 		fontWeight: 'bold',
// 		marginBottom: 20,
// 		marginTop: 10,
// 	},
// });
