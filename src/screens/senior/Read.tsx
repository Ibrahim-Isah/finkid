import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { contents } from '../../utils/contents';
import { ScrollView } from 'react-native-gesture-handler';
import GeneralHeader from '../../components/GeneralHeader';

const Read = ({ route, navigation }: any) => {
	const { chapter } = route.params;
	const [currentChapter, setCurrentChapter] = useState<any>({});
	const [card, setCard] = useState<any>(currentChapter.intro);

	useEffect(() => {
		if (chapter) {
			const chapterObj = contents.find((chap) => chap.name === chapter);
			setCurrentChapter(chapterObj);
		}
	}, [chapter]);

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
				{currentChapter.title && (
					<Text style={styles.title}>{currentChapter.title}</Text>
				)}

				<Text style={styles.text}>{currentChapter.intro}</Text>
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
});
