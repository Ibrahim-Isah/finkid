import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import CategoryCard from '../components/CategoryCard';

const Category = () => {
	return (
		<ScrollView>
			<View style={styles.container}>
				<Text style={styles.heading}>Select Category</Text>
				<View>
					<CategoryCard
						type='junior'
						onPress={() => {
							console.log('pressed');
						}}
						title='Junior (Age 3 - 9)'
					/>
					<CategoryCard
						type='senior'
						onPress={() => {
							console.log('pressed');
						}}
						title='Senior (Age 10 - 18)'
					/>
				</View>
			</View>
		</ScrollView>
	);
};

export default Category;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		alignItems: 'center',
		marginVertical: 10,
	},
	heading: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
		marginTop: 10,
	},
});
