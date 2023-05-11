import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Pressable, StyleSheet, Image, View, Text } from 'react-native';
import { Animated } from 'react-native';
import { SOUND } from '../Sound';
import { Audio } from 'expo-av';
import { playCorrect } from '../../../utils/sounds';
import { PRIMARY_COLOR } from '../../../constants/colors';

const CoinWorkbook = (props: any) => {
	const { ex, finish } = props;

	const anim = useRef(new Animated.Value(0));
	const quiz = ex?.objectives;
	const [curr, setCurr] = useState(0);
	const [selectedOption, setSelectedOption] = useState('');
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const [sound, setSound] = useState<any>();

	const [wrong, setWrong] = useState<[{ id: string; answer: string }] | []>([]);

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

		if (a && a != quiz[curr].answer) {
			playSound('wrong');
			setSelectedOption('#f83e26');
			shake();
			setTimeout(() => {
				setSelectedOption('');
				setSelectedIndex(null);
			}, 1500);
		} else {
			setSelectedOption('#26f842');
			playCorrect();
			setTimeout(() => {
				setSelectedOption('');
				if (curr >= quiz.length - 1 || quiz[curr] === undefined) {
					finish();
				} else {
					setCurr((c) => c + 1);
				}
				setSelectedIndex(null);
			}, 1000);
		}
	};
	return (
		<View style={styles.container}>
			<View style={styles.coin}>
				{Array(quiz[curr].answer)
					.fill(0)
					.map((_: any, index: React.Key | null | undefined) =>
						ex.type === '5naira' ? (
							<Image
								key={index}
								source={require('../../../../assets/images/5naira.png')}
								style={styles.img}
							/>
						) : ex.type === '10naira' ? (
							<Image
								key={index}
								source={require('../../../../assets/images/10naira.png')}
								style={styles.img}
							/>
						) : ex.type === '20naira' ? (
							<Image
								key={index}
								source={require('../../../../assets/images/20naira.png')}
								style={styles.img}
							/>
						) : (
							<Image
								key={index}
								source={require('../../../../assets/images/20nairabk.png')}
								style={styles.img}
							/>
						)
					)}
			</View>
			<View style={styles.options}>
				{quiz[curr].options.map((option: number, i: number) => {
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
											fontSize: 20,
											color: '#fff',
										}}
									>
										{ex.type === '5naira'
											? option * 5 + ' naira'
											: ex.type === '10naira'
											? option * 10 + ' naira'
											: ex.type === '20naira'
											? option * 20 + ' naira'
											: option * 50 + ' naira'}
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

export default CoinWorkbook;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: 5,
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
	img: {
		resizeMode: 'contain',
		width: 100,
		height: 70,
	},

	center: {
		textAlign: 'center',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
