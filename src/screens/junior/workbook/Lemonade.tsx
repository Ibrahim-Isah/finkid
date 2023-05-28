import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Pressable, StyleSheet, Image } from 'react-native';
import { Animated, View, Text } from 'react-native';
import { SOUND } from '../Sound';
import { sizeHeight, sizeWidth } from '../../../utils/size';
import { Audio } from 'expo-av';
import { playDone } from '../../../utils/sounds';
import { PRIMARY_COLOR } from '../../../constants/colors';

const Lemonade = ({ finish }: any) => {
	const anim = useRef(new Animated.Value(0));
	const quiz = {
		answer: 50,
		options: [42, 35, 75, 50],
	};
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const [selectedOption, setSelectedOption] = useState('');
	const [sound, setSound] = useState<any>();

	async function playSound(type: string) {
		const { sound }: any = await Audio.Sound.createAsync(
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

	const shake = useCallback(() => {
		return Animated.loop(
			Animated.sequence([
				Animated.timing(anim.current, {
					toValue: -3,
					duration: 60,
					useNativeDriver: false,
				}),
				Animated.timing(anim.current, {
					toValue: 3,
					duration: 60,
					useNativeDriver: false,
				}),
				Animated.timing(anim.current, {
					toValue: 0,
					duration: 60,
					useNativeDriver: false,
				}),
			]),
			{ iterations: 4 }
		).start();
	}, []);

	const press = (a?: string | number, i?: number) => {
		if (typeof i === 'number') {
			setSelectedIndex(i);
		}

		if (a && a != quiz.answer) {
			playSound('wrong');
			setSelectedOption('#f83e26');
			shake();
			setTimeout(() => {
				setSelectedOption('');
				setSelectedIndex(null);
			}, 1500);
		} else {
			setSelectedOption('#26f842');
			playDone();
			setTimeout(() => {
				setSelectedOption('');
				setSelectedIndex(null);
				finish();
			}, 1000);
		}
	};
	return (
		<View style={styles.container}>
			<View style={styles.center}>
				<Image
					source={require('../../../../assets/images/lulu.jpg')}
					style={styles.Img}
				/>
			</View>
			<View style={styles.options}>
				{quiz.options.map((option: string | number, i: number) => {
					return (
						<Pressable key={i} onPress={() => press(option, i)}>
							<View>
								<Animated.View
									style={[
										styles.items,
										{
											backgroundColor:
												selectedIndex === i ? selectedOption : PRIMARY_COLOR,
											transform:
												selectedIndex === i
													? [
															{
																translateX: anim.current,
															},
													  ]
													: [
															{
																translateX: 0,
															},
													  ],
										},
									]}
								>
									<Text
										style={{
											color: '#fff',
											fontSize: 18,
										}}
									>
										{option} glasses
									</Text>
									{selectedOption === '#f83e26' ? (
										selectedIndex === i ? (
											<MaterialIcons name='close' size={24} color='#fff' />
										) : (
											<MaterialIcons
												name='radio-button-unchecked'
												color='#fff'
												size={30}
											/>
										)
									) : selectedOption === '#26f842' ? (
										selectedIndex === i ? (
											<MaterialIcons name='check' color='#fff' size={30} />
										) : (
											<MaterialIcons
												name='radio-button-unchecked'
												color='#fff'
												size={30}
											/>
										)
									) : (
										<MaterialIcons
											name='radio-button-unchecked'
											color='#fff'
											size={30}
										/>
									)}
								</Animated.View>
							</View>
						</Pressable>
					);
				})}
			</View>
		</View>
	);
};

export default Lemonade;

const styles = StyleSheet.create({
	// items: {
	// 	display: 'flex',
	// 	flexDirection: 'row',
	// 	justifyContent: 'space-between',
	// 	backgroundColor: '#3f3f3f',
	// 	padding: 20,
	// 	marginVertical: 8,
	// 	marginHorizontal: 16,
	// },
	Img: {
		resizeMode: 'contain',
		width: sizeWidth(45),
		height: sizeHeight(20),
		// marginVertical: 20,
	},

	// center: {
	// 	textAlign: 'center',
	// 	alignItems: 'center',
	// 	justifyContent: 'center',
	// },

	container: {
		flexDirection: 'row',
		padding: 5,
		marginVertical: 10,
	},
	options: {
		flex: 1,
	},
	items: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#3f3f3f',
		padding: 10,
		marginVertical: 4,
		marginHorizontal: 10,
	},
	coin: {
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},

	center: {
		textAlign: 'center',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
