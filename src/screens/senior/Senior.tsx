import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import GeneralHeader from '../../components/GeneralHeader';
import { chaptersList } from '../../utils/data';
import { sizeWidth } from '../../utils/size';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { PRIMARY_COLOR } from '../../constants/colors';

const Item = ({ title, icon }: any) => (
	<View>
		<View style={styles.item}>
			<Text
				style={{
					color: '#fff',
					fontSize: sizeWidth(6),
				}}
			>
				{title}
			</Text>
			<Icon name={icon} color='#fff' size={30} />
		</View>
	</View>
);

const Senior = ({ navigation }: any) => {
	const [data, setData] = useState<{ title: string; icon: string }[]>();

	useEffect(() => {
		return setData(chaptersList);
	}, []);

	const renderItem = ({ item }: { item: { title: string; icon: string } }) => (
		<Pressable
			onPress={() => navigation.navigate('Intro', { chapter: item.title })}
		>
			{item.title !== 'Workbook' && (
				<Item title={item.title} icon={item.icon} />
			)}
		</Pressable>
	);
	return (
		<ScrollView>
			<View style={styles.container}>
				<View
					style={{
						alignItems: 'center',
					}}
				>
					<GeneralHeader title='Select Chapter' />
				</View>
				<FlatList
					data={data}
					renderItem={renderItem}
					keyExtractor={(item) => item.title}
				/>
			</View>
		</ScrollView>
	);
};

export default Senior;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		marginVertical: 10,
	},
	item: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: PRIMARY_COLOR,
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
});
