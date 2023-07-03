import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { contents } from '../../utils/contents';
import { ScrollView } from 'react-native-gesture-handler';
import GeneralHeader from '../../components/GeneralHeader';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Intro = ({ route, navigation }: any) => {
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
		<View style={{ flex: 1 }}>
			<Image
				source={require('../../../assets/images/freetrail2.png')}
				style={styles.background}
			/>
			<View style={{ flex: 1, justifyContent: 'center' }}>
				<View style={styles.container}>
					<View style={styles.headerTextContainer}>
						<Text style={styles.headerText}>{currentChapter.title}</Text>
						<Text style={styles.subText}>Brief Introduction</Text>
						<View style={styles.wrapper}>
							<Text style={styles.text}>{currentChapter.intro}</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};

export default Intro;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: width * 0.08,
		paddingHorizontal: width * 0.05,
		minHeight: height * 0.7,
		backgroundColor: '#3D9FC177',
		borderRadius: 10,
		margin: 'auto',
	},
	headerText: {
		fontSize: 22,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	subText: {
		fontSize: 14,
		textAlign: 'center',
		fontStyle: 'italic',
	},
	text: { justifyContent: 'center', fontSize: 24, marginTop: 30 },
	headerTextContainer: {
		alignItems: 'center',
		marginVertical: height * 0.04,
	},
	wrapper: {
		backgroundColor: 'transparent',
	},
	background: {
		position: 'absolute',
		zIndex: -10,
		width: '100%',
		height: '100%',
	},
});
