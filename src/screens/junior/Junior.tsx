import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import GeneralHeader from '../../components/GeneralHeader';
import { ScrollView } from 'react-native-gesture-handler';
import FiveNaira from './workbook/FiveNaira';

const Junior = () => {
	return (
		<View style={styles.container}>
			<Image
				source={require('../../../assets/images/freetrail2.png')}
				style={styles.background}
			/>
			<SafeAreaView style={styles.secondaryContainer}>
				<GeneralHeader title='Junior Candidate' />
				<ScrollView contentContainerStyle={styles.grow}>
					<FiveNaira />
				</ScrollView>
			</SafeAreaView>
		</View>
	);
};

export default Junior;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
		width: '100%',
	},
	secondaryContainer: {
		flex: 1,
	},
	background: {
		position: 'absolute',
		zIndex: -10,
		width: '100%',
		height: '100%',
	},
	grow: {
		flexGrow: 1,
	},
});
