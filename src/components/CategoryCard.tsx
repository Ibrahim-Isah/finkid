import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
	type: 'junior' | 'senior';
	title: string;
	onPress: () => void;
};
const CategoryCard = (props: Props) => {
	const { type, title, onPress } = props;
	return (
		<TouchableOpacity onPress={onPress} style={styles.container}>
			{type == 'junior' ? (
				<Image
					source={require('../../assets/images/junior.png')}
					style={styles.bgImage}
				/>
			) : (
				<Image
					source={require('../../assets/images/senior.png')}
					style={styles.bgImage}
				/>
			)}
			{type == 'junior' ? (
				<Image
					source={require('../../assets/images/juniorfront.png')}
					style={styles.image}
				/>
			) : (
				<Image
					source={require('../../assets/images/seniorfront.png')}
					style={styles.image}
				/>
			)}

			<Text style={styles.text}>{title}</Text>
		</TouchableOpacity>
	);
};

export default CategoryCard;

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		width: 300,
		height: 300,
		marginVertical: 20,
		borderRadius: 30,
	},
	bgImage: {
		width: '100%',
		height: '100%',
		position: 'absolute',
	},
	image: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		width: '80%',
		height: '80%',
	},
	text: {
		color: '#fff',
		margin: 10,
		fontSize: 24,
	},
});
