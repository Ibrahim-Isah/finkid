import {
	StyleSheet,
	Text,
	View,
	Image,
	Pressable,
	TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import GeneralHeader from '../../components/GeneralHeader';
import { ScrollView } from 'react-native-gesture-handler';
import FiveNaira from './workbook/FiveNaira';
import { juniorData } from '../../utils/data';
import { Audio } from 'expo-av';
import { SOUND } from './Sound';
import CustomAlert from '../../components/CustomAlert';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TenNaira from './workbook/TenNaira';
import TwentyNaira from './workbook/TwentyNaira';
import FiftyNaira from './workbook/FiftyNaira';
import DragGame from './workbook/DragGame';
import DragGameTwo from './workbook/DragGameTwo';
import DragGameThree from './workbook/DragGameThree';
import Shopping from './workbook/Shopping';
import Lemonade from './workbook/Lemonade';
import { NextButton, PreviousButton } from '../../components/NextPrev';

const Junior = ({ navigation }: any) => {
	const [sound, setSound] = useState<any>(null);
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [pg, setPg] = useState<number>(1);
	const isDone = Array(4).fill(false);
	const item = juniorData.find((x) => x.page === pg);

	async function playSound() {
		const { sound } = await Audio.Sound.createAsync(SOUND[0].sound, {
			isLooping: true,
		});
		setSound(sound);
		await sound.playAsync();
	}
	useEffect(() => {
		return sound
			? () => {
					sound.unloadAsync();
			  }
			: undefined;
	}, [sound]);
	useEffect(() => {
		playSound();
		return () => setSound(null);
	}, []);
	return (
		<View style={styles.container}>
			<Image
				source={require('../../../assets/images/freetrail2.png')}
				style={styles.background}
			/>

			<SafeAreaView style={styles.secondaryContainer}>
				<View
					style={{
						alignItems: 'center',
					}}
				>
					<GeneralHeader title={item?.title || 'Category Challenges'} />
				</View>
				<View style={styles.centeredView}>
					<CustomAlert
						modalVisible={modalVisible}
						setModalVisible={setModalVisible}
						title={'Exercise'}
						message={'Task not done, Are you sure you want to go to next task?'}
						buttons={[
							{
								text: 'no',
							},
							{
								text: 'Yes',
								func: () => {
									setPg((p) => p + 1);
									return;
								},
							},
						]}
					/>
				</View>

				{[1, 2, 3, 4].includes(pg) ? (
					<ScrollView contentContainerStyle={styles.grow}>
						<Text
							style={{
								fontSize: 18,
								fontWeight: 'normal',
								marginHorizontal: 10,
							}}
						>
							{item?.text || 'Financial challenges below'}
						</Text>
						{item?.exercise?.map((ex, index) => {
							switch (item.page) {
								case 1:
									return (
										<FiveNaira
											key={index}
											ex={ex}
											finish={() => {
												setPg((p) => p + 1);
											}}
										/>
									);
								case 2:
									return (
										<TenNaira
											key={index}
											ex={ex}
											finish={() => {
												setPg((p) => p + 1);
											}}
										/>
									);
								case 3:
									return (
										<TwentyNaira
											key={index}
											ex={ex}
											finish={() => {
												setPg((p) => p + 1);
											}}
										/>
									);
								case 4:
									return (
										<FiftyNaira
											key={index}
											ex={ex}
											finish={() => {
												setPg((p) => p + 1);
											}}
										/>
									);
								case 5:
									return (
										<DragGame
											key={index}
											ex={ex}
											finish={() => {
												setPg((p) => p + 1);
											}}
										/>
									);
								case 6:
									return (
										<DragGameTwo
											key={index}
											ex={ex}
											finish={() => {
												setPg((p) => p + 1);
											}}
										/>
									);
								case 7:
									return (
										<DragGameThree
											key={index}
											ex={ex}
											finish={() => {
												setPg((p) => p + 1);
											}}
										/>
									);
								case 8:
									return (
										<Shopping
											key={index}
											ex={ex}
											finish={() => {
												setPg((p) => p + 1);
											}}
										/>
									);
								case 9:
									return (
										<Lemonade
											key={index}
											ex={ex}
											finish={() => {
												setPg((p) => p + 1);
											}}
										/>
									);
								default:
									return (
										<FiveNaira
											key={index}
											ex={ex}
											finish={() => {
												setPg((p) => p + 1);
											}}
										/>
									);
							}
						})}
					</ScrollView>
				) : (
					<View style={styles.grow}>
						<Text
							style={{
								fontSize: 18,
								fontWeight: 'normal',
								marginHorizontal: 10,
							}}
						>
							{item?.text || 'Financial challenges below'}
						</Text>
						{item?.exercise?.map((ex, index) => {
							switch (item.page) {
								case 1:
									return (
										<FiveNaira
											key={index}
											ex={ex}
											finish={() => {
												setPg((p) => p + 1);
											}}
										/>
									);
								case 2:
									return (
										<TenNaira
											key={index}
											ex={ex}
											finish={() => {
												setPg((p) => p + 1);
											}}
										/>
									);
								case 3:
									return (
										<TwentyNaira
											key={index}
											ex={ex}
											finish={() => {
												setPg((p) => p + 1);
											}}
										/>
									);
								case 4:
									return (
										<FiftyNaira
											key={index}
											ex={ex}
											finish={() => {
												setPg((p) => p + 1);
											}}
										/>
									);
								case 5:
									return (
										<DragGame
											key={index}
											ex={ex}
											finish={() => {
												setPg((p) => p + 1);
											}}
										/>
									);
								case 6:
									return (
										<DragGameTwo
											key={index}
											ex={ex}
											finish={() => {
												setPg((p) => p + 1);
											}}
										/>
									);
								case 7:
									return (
										<DragGameThree
											key={index}
											ex={ex}
											finish={() => {
												setPg((p) => p + 1);
											}}
										/>
									);
								case 8:
									return (
										<Shopping
											key={index}
											ex={ex}
											finish={() => {
												setPg((p) => p + 1);
											}}
										/>
									);
								case 9:
									return (
										<Lemonade
											key={index}
											ex={ex}
											finish={() => {
												setPg((p) => p + 1);
											}}
										/>
									);
								default:
									return (
										<FiveNaira
											key={index}
											ex={ex}
											finish={() => {
												setPg((p) => p + 1);
											}}
										/>
									);
							}
						})}
					</View>
				)}

				<View
					style={
						pg > 1
							? {
									display: 'flex',
									flexDirection: 'row',
									bottom: 0,
									justifyContent: 'space-between',
							  }
							: {
									display: 'flex',
									flexDirection: 'row',
									bottom: 0,
									justifyContent: 'flex-end',
							  }
					}
				>
					{pg > 1 && <PreviousButton onPress={() => setPg((p) => p - 1)} />}

					<NextButton
						onPress={() => {
							if (pg >= 9 || !pg) {
								navigation.navigate('Category');
								return;
							} else if (isDone[pg - 1] !== true && pg !== 9 && pg !== 12) {
								setModalVisible(true);
								return;
							} else {
								setPg((p) => p + 1);
							}
						}}
					/>
				</View>
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						marginVertical: 5,
					}}
				>
					{sound ? (
						<TouchableOpacity
							style={{ ...styles.button, backgroundColor: '#007AFF' }}
							onPress={() => setSound(null)}
						>
							<Icon name='pause' size={24} color='#FFFFFF' />
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							style={{ ...styles.button, backgroundColor: '#000000' }}
							onPress={playSound}
						>
							<Icon name='play' size={24} color='#FFFFFF' />
						</TouchableOpacity>
					)}
				</View>
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
	button: {
		borderRadius: 20,
		paddingHorizontal: 12,
		paddingVertical: 8,
	},
	secondaryContainer: {
		flex: 1,
		width: '100%',
	},
	background: {
		position: 'absolute',
		zIndex: -10,
		width: '100%',
		height: '100%',
	},
	grow: {
		flexGrow: 1,
		width: '100%',
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
});
