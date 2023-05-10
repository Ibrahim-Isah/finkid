import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import CategoryCard from '../components/CategoryCard';
import GeneralHeader from '../components/GeneralHeader';

const Category = ({ navigation }: any) => {
	return (
		<ScrollView>
			<View style={styles.container}>
				<GeneralHeader title='Select Category' />
				<View>
					<CategoryCard
						type='junior'
						onPress={() => {
							navigation.navigate('Junior');
						}}
						title='Junior (Age 3 - 9)'
					/>
					<CategoryCard
						type='senior'
						onPress={() => {
							navigation.navigate('Senior');
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
});
