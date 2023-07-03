import React, { useState, useRef } from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const NextButton = ({ onPress }: { onPress: () => void }) => {
	const [animation] = useState(new Animated.Value(1));

	const handlePress = () => {
		Animated.sequence([
			Animated.timing(animation, {
				toValue: 0.8,
				duration: 100,
				useNativeDriver: true,
			}),
			Animated.timing(animation, {
				toValue: 1,
				duration: 100,
				useNativeDriver: true,
			}),
		]).start(() => {
			onPress();
		});
	};

	const animatedStyle: any = {
		transform: [{ scale: animation }],
	};

	return (
		<TouchableOpacity
			style={[styles.button, animatedStyle]}
			onPress={handlePress}
		>
			<Ionicons name='ios-arrow-forward' size={24} color='#FFFFFF' />
		</TouchableOpacity>
	);
};

export const PreviousButton = ({ onPress }: { onPress: () => void }) => {
	const [animation] = useState(new Animated.Value(1));

	const handlePress = () => {
		Animated.sequence([
			Animated.timing(animation, {
				toValue: 0.8,
				duration: 100,
				useNativeDriver: true,
			}),
			Animated.timing(animation, {
				toValue: 1,
				duration: 100,
				useNativeDriver: true,
			}),
		]).start(() => {
			onPress();
		});
	};

	const animatedStyle: any = {
		transform: [{ scale: animation }],
	};

	return (
		<TouchableOpacity
			style={[styles.button, animatedStyle]}
			onPress={handlePress}
		>
			<Ionicons name='ios-arrow-back' size={24} color='#FFFFFF' />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#007AFF',
		borderRadius: 20,
		paddingHorizontal: 12,
		paddingVertical: 8,
		margin: 5,
	},
});
