import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import GeneralHeader from '../../components/GeneralHeader';
import { PRIMARY_COLOR } from '../../constants/colors';
import { chaptersList } from '../../utils/data';
import { sizeWidth } from '../../utils/size';

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
		<SafeAreaView>
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={(item) => item.title}
				ListHeaderComponent={() => <GeneralHeader title='Select Chapter' />}
			/>
		</SafeAreaView>
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
