import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { contents } from '../../utils/contents';
import { ScrollView } from 'react-native-gesture-handler';
import GeneralHeader from '../../components/GeneralHeader';
import { NextButton, PreviousButton } from '../../components/NextPrev';
import Readlist from '../../components/Readlist';
import Tabular from '../../components/Tabular';
import { SafeAreaView } from 'react-native-safe-area-context';

const Read = ({ route, navigation }: any) => {
	const { chapter } = route.params;
	const [currentChapter, setCurrentChapter] = useState<any>({});
	const [current, setCurrent] = useState<number>(0);
	const cards = currentChapter?.content?.card || [];

	useEffect(() => {
		if (chapter) {
			const chapterObj = contents.find((chap) => chap.name === chapter);
			setCurrentChapter(chapterObj);
		}
	}, [chapter]);

	const back = () => {
		setCurrent((curr) => (curr > 0 ? curr - 1 : 0));
	};
	const next = async () => {
		if (current + 1 < cards?.length) {
			setCurrent((y) => y + 1);
		} else {
			// navigation.navigate('Workbook');
			navigation.navigate('Senior');
		}
	};

	return (
		<View style={styles.container}>
			<GeneralHeader title={chapter} />
			<ScrollView contentContainerStyle={styles.content}>
				<View
					style={{
						margin: 20,
					}}
				>
					<Text style={styles.title}>{cards[current]?.title || chapter}</Text>
					<Text style={styles.text}>{cards[current]?.text}</Text>
				</View>
				{cards[current]?.list && <Readlist data={cards[current]?.list || []} />}
				{cards[current]?.table && <Tabular data={cards[current]?.table} />}
			</ScrollView>
			<View style={styles.both}>
				<PreviousButton onPress={back} />
				<NextButton onPress={next} />
			</View>
		</View>
	);
};

export default Read;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
		width: '100%',
		marginTop: 30,
	},
	content: {
		flexGrow: 1,
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
	},
	title: {
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 28,
		fontWeight: 'bold',
	},
	text: {
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 10,
		marginVertical: 15,
		fontSize: 18,
	},
	next: {
		display: 'flex',
		flexDirection: 'row',
		bottom: 0,
		justifyContent: 'flex-end',
		width: '100%',
		margin: 10,
	},
	both: {
		display: 'flex',
		flexDirection: 'row',
		bottom: 0,
		justifyContent: 'space-between',
		width: '100%',
		margin: 10,
	},
});
