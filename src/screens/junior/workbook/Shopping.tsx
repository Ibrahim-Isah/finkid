import React, { useState, useEffect } from 'react';
import { sizeHeight, sizeWidth } from '../../../utils/size';
import { Image, View, StyleSheet, Dimensions, Text } from 'react-native';
import { SOUND } from '../Sound';
import { Audio } from 'expo-av';
import { playDone } from '../../../utils/sounds';
import CustomAlert from '../../../components/CustomAlert';
import Draggable from '../../../components/draggable';
import { PRIMARY_COLOR } from '../../../constants/colors';

const options = [
	{
		image: require('../../../../assets/images/5naira.png'),
		name: 'Five',
		value: 5,
	},
	{
		image: require('../../../../assets/images/10naira.png'),
		name: 'Ten',
		value: 10,
	},
	{
		image: require('../../../../assets/images/20naira.png'),
		name: 'Twenty',
		value: 20,
	},
	{
		image: require('../../../../assets/images/50naira.png'),
		name: 'Fifty',
		value: 50,
	},
];

type Props = {
	ex: any;
	finish: () => void;
};

const Shopping = (props: Props) => {
	const { ex, finish } = props;
	const [selected, setSeleted] = useState<Object[]>([]);
	const [total, setTotal] = useState(0);
	const [modalVisible, setModalVisible] = React.useState(false);
	const [modalMessage, setModalMessage] = React.useState('');
	const [dropArea, setDropArea] = React.useState({ startY: 0, endY: 0 });
	const { height } = Dimensions.get('window');

	const [sound, setSound] = useState<any>();

	async function playSound(type: string) {
		const { sound } = await Audio.Sound.createAsync(
			type === 'correct' ? SOUND[5].sound : SOUND[4].sound
		);
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

	const checkDrop = (event: any, gestureState: any, bounds: any, item: any) => {
		if (
			gestureState.moveY < dropArea?.endY &&
			gestureState.moveY > dropArea?.startY
		) {
			if (selected.find((i: any) => i.name === item.name) === undefined) {
				setSeleted([...selected, item]);
			}
		} else {
			setSeleted(selected.filter((i: any) => i.name !== item.name));
		}
	};
	useEffect(() => {
		let calc = 0;
		selected.map((item: any) => {
			calc += item.value;
		});

		if (calc === 0) {
			setTotal(0);
		} else if (calc === 25) {
			setModalVisible(true);
			setModalMessage('Congratulations, You are correct!!!');
			playDone();
			setTimeout(() => {
				finish();
			}, 1000);
		} else if (calc > 25) {
			setModalVisible(true);
			setModalMessage('Good try, but you are not correct!!!');
			playSound('incorrect');
		}
		setTotal(calc);
	}, [selected]);

	return (
		<View style={{ height: height * 0.7 }}>
			<View style={styles.row}>
				<Image
					source={require('../../../../assets/images/bunny.png')}
					style={styles.Img}
				/>
				<View>
					<Text style={styles.text}>Price:</Text>
					<Text style={styles.text}>25 Naira</Text>
					<View style={styles.centeredView}>
						<CustomAlert
							modalVisible={modalVisible}
							setModalVisible={setModalVisible}
							message={modalMessage}
						/>
					</View>
				</View>
			</View>

			<View
				style={styles.dropZone}
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
							setDropArea({ startY: pageY, endY: pageY + height });
						}
					);
				}}
			>
				<Text style={styles.text}>Drop coin here to pay</Text>
				<Text style={styles.text}>Total Paid: {total} Naira</Text>
			</View>

			<View style={styles.row}>
				{options.map((op, index) => (
					<Draggable
						key={op.name}
						imageSource={op.image}
						renderSize={34}
						renderWidth={sizeWidth(20)}
						renderHeight={sizeHeight(6)}
						x={30 + index * sizeWidth(22)}
						y={50}
						onDragRelease={(event, gestureState, bounds) =>
							checkDrop(event, gestureState, bounds, op)
						}
					/>
				))}
			</View>
		</View>
	);
};

export default Shopping;
let styles = StyleSheet.create({
	Img: {
		resizeMode: 'contain',
		width: sizeWidth(50),
		height: sizeHeight(15),
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: sizeHeight(30),
	},
	dropZone: {
		height: sizeHeight(20),
		backgroundColor: PRIMARY_COLOR,
		textAlign: 'center',
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	text: {
		fontSize: 18,
	},
});
