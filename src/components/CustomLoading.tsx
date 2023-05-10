import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const CustomLoading = () => {
	return (
		<View style={styles.container}>
			<Image
				source={require('../../assets/images/splash.png')}
				style={styles.logo}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ffffff',
	},
	logo: {
		width: '100%',
		height: '100%',
	},
});

export default CustomLoading;
