import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SOUND } from '../Sound';
import { Audio } from 'expo-av';
// import Draggable from 'react-native-draggable';
import CustomAlert from '../../../components/CustomAlert';
import { sizeHeight, sizeWidth } from '../../../utils/size';
import Draggable from '../../../components/draggable';
import { PRIMARY_COLOR } from '../../../constants/colors';

const { width, height } = Dimensions.get('window');
const itemHeight = height < 730 ? height / 9 : height / 7;

const options = [
	{ image: require('../../../../assets/images/10naira.png'), name: 'Ten' },
	{ image: require('../../../../assets/images/50naira.png'), name: 'Fifty' },
	{ image: require('../../../../assets/images/5naira.png'), name: 'Five' },
	{ image: require('../../../../assets/images/20naira.png'), name: 'Twenty' },
];
type Props = {
	ex: any;
	finish: () => void;
};
const DragGameTwo = (props: Props) => {
	const { finish } = props;
	const [selected, setSeleted] = useState<Object[]>([]);
	const [reverse, setReverse] = useState<boolean>(true);
	const [modalVisible, setModalVisible] = React.useState(false);
	const [modalMessage, setModalMessage] = React.useState('');
	const [FiveNaira, setFiveNaira] = useState(null);
	const [TenNaira, setTenNaira] = useState(null);

	const [X, setX] = useState(null);

	const [TwentyNaira, setTwentyNaira] = useState(null);
	const [FiftyNaira, setFiftyNaira] = useState(null);
	const [sorted, setSorted] = useState({
		FiveNaira: false,
		TenNaira: false,
		TwentyNaira: false,
		FiftyNaira: false,
	});
	const [sound, setSound] = useState<any>();

	async function playSound(type: string) {
		const it = SOUND.find((x) => x.action === type);
		const { sound } = await Audio.Sound.createAsync(it?.sound);
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

	const checkDrop = (
		event: any,
		gestureState: any,
		bounds: any,
		id: string
	) => {
		if (X! < gestureState.moveX) {
			if (
				gestureState.moveY >= TwentyNaira! &&
				gestureState.moveY < FiftyNaira!
			) {
				if (id === 'Twenty') {
					setSorted({
						...sorted,
						TwentyNaira: true,
					});
					playSound('correct');
					//setModalVisible(true);
					//setModalMessage('Awesome, You found a penny!');
					setSeleted([...selected, id]);
					return;
				} else {
					playSound('buzz');
					setModalVisible(true);
					setModalMessage('False , Try again!');
				}
			}
			if (
				gestureState.moveY >= FiftyNaira! &&
				gestureState.moveY <= TenNaira!
			) {
				if (id === 'Fifty') {
					setSorted({
						...sorted,
						FiftyNaira: true,
					});
					playSound('correct');
					//setModalVisible(true);
					//setModalMessage('Nice, You found a Nickel');
					setReverse(false);
					setSeleted([...selected, id]);
					return;
				} else {
					playSound('buzz');
					setModalVisible(true);
					setModalMessage('False , Try again!');
				}
			}
			if (gestureState.moveY >= TenNaira! && gestureState.moveY <= FiveNaira!) {
				if (id === 'Ten') {
					setSorted({
						...sorted,
						TenNaira: true,
					});
					playSound('correct');
					//setModalVisible(true);
					//setModalMessage('Awesome, you found Dime!');
					setSeleted([...selected, id]);
					return;
				} else {
					playSound('buzz');
					setModalVisible(true);
					setModalMessage('False , Try again!');
				}
			}
			if (
				gestureState.moveY >= FiveNaira! &&
				gestureState.moveY <= FiveNaira! + itemHeight
			) {
				if (id === 'Five') {
					setSorted({
						...sorted,
						FiveNaira: true,
					});
					playSound('correct');
					//setModalVisible(true);
					//setModalMessage("Awesome, you've found a quarter");
					setSeleted([...selected, id]);
					return;
				} else {
					playSound('buzz');
					setModalVisible(true);
					setModalMessage('False , Try again!');
				}
			}
		} else {
		}
	};
	return (
		<>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row-reverse',
					justifyContent: 'space-between',
				}}
			>
				<View
					onLayout={(event: any) => {
						event.target.measure(
							(
								x: any,
								y: any,
								width: any,
								height: any,
								pageX: any,
								pageY: any
							) => {
								setTwentyNaira(y + pageY);
								setX(pageX);
							}
						);
					}}
					style={styles.dropC}
				>
					<View style={styles.item}>
						<Text style={styles.noteText}>20 Naira</Text>
					</View>
					<View
						onLayout={(event: any) => {
							event.target.measure(
								(
									x: any,
									y: any,
									width: any,
									height: any,
									pageX: any,
									pageY: any
								) => {
									setFiftyNaira(pageY);
								}
							);
						}}
						style={[{ ...styles.item, backgroundColor: '#6A809E' }]}
					>
						<Text style={styles.noteText}>50 Naira</Text>
					</View>
					<View
						onLayout={(event: any) => {
							event.target.measure(
								(
									x: any,
									y: any,
									width: any,
									height: any,
									pageX: any,
									pageY: any
								) => {
									setTenNaira(pageY);
								}
							);
						}}
						style={[{ ...styles.item, backgroundColor: '#C25D60' }]}
					>
						<Text style={styles.noteText}>10 Naira</Text>
					</View>
					<View
						onLayout={(event: any) => {
							event.target.measure(
								(
									x: any,
									y: any,
									width: any,
									height: any,
									pageX: any,
									pageY: any
								) => {
									setFiveNaira(pageY);
								}
							);
						}}
						style={[{ ...styles.item, backgroundColor: '#D0B99F' }]}
					>
						<Text style={styles.noteText}>5 Naira</Text>
					</View>
				</View>
				<View style={styles.centeredView}>
					<CustomAlert
						modalVisible={modalVisible}
						setModalVisible={setModalVisible}
						message={modalMessage}
					/>
				</View>
				<View style={styles.column}>
					{options.map((op, index) => (
						<View key={op.name} style={styles.drag}>
							<Draggable
								imageSource={op.image}
								renderSize={60}
								renderWidth={sizeWidth(36)}
								renderHeight={sizeHeight(10)}
								x={20}
								y={10 + index * sizeHeight(15)}
								onDragRelease={(event, gestureState, bounds) =>
									checkDrop(event, gestureState, bounds, op.name)
								}
								//shouldReverse={reverse}
							/>
						</View>
					))}
				</View>
			</View>

			{sorted.FiveNaira &&
				sorted.TenNaira &&
				sorted.TwentyNaira &&
				sorted.FiftyNaira && (
					<View style={{ justifyContent: 'center', marginHorizontal: 'auto' }}>
						<Pressable style={styles.button} onPress={finish}>
							<Text style={styles.buttonText}>
								Congratulations, You've pass this challenge!!!
							</Text>
						</Pressable>
					</View>
				)}
		</>
	);
};

export default DragGameTwo;

const styles = StyleSheet.create({
	column: {
		width: '45%',
	},
	dropZone: {
		height: height / 2,
		width: width / 2,
	},
	item: {
		backgroundColor: '#4D6151',
		padding: height > 1200 ? 50 : 30,
		margin: height > 1200 ? 30 : 15,
		color: '#fff',
		height: itemHeight,
		width: width / 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	drag: {
		marginBottom: height > 1200 ? 120 : 20,
		width: '100%',
	},
	text: {
		marginTop: 25,
		marginLeft: 5,
		marginRight: 5,
		textAlign: 'center',
		color: '#fff',
		fontSize: 25,
		fontWeight: 'bold',
	},
	bodytext: {
		color: '#000',
		margin: 10,
	},
	noteText: {
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	dropC: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: 'white',
		justifyContent: 'center',
		width: '50%',
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: 'bold',
	},
	button: {
		backgroundColor: PRIMARY_COLOR,
		borderRadius: 10,
		paddingHorizontal: 20,
		paddingVertical: 15,
		width: '100%',
		marginTop: 10,
		alignItems: 'center',
	},
});
