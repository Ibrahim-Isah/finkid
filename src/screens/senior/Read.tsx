import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { contents } from '../../utils/contents';
import { ScrollView } from 'react-native-gesture-handler';
import GeneralHeader from '../../components/GeneralHeader';
import { NextButton, PreviousButton } from '../../components/NextPrev';

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
			console.log('Nothing to Navigate to');
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.content}>
			<View style={styles.container}>
				<View
					style={{
						alignItems: 'center',
					}}
				>
					<GeneralHeader title={chapter} />
				</View>
				<View
					style={{
						margin: 20,
					}}
				>
					<Text style={styles.title}>{cards[current]?.title || chapter}</Text>
					<Text style={styles.text}>{cards[current]?.text}</Text>
				</View>
			</View>
			<View style={styles.both}>
				<PreviousButton onPress={back} />
				<NextButton onPress={next} />
			</View>
		</ScrollView>
	);
};

export default Read;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		marginVertical: 10,
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
