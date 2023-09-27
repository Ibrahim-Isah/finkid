import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/colors';

type ButtonsProps = {
	title: string;
	onPress: () => void;
	pl?: number;
	pr?: number;
	pb?: number;
	pt?: number;
	ml?: number;
	mr?: number;
	mb?: number;
	mt?: number;
	border?: boolean;
	borderColor: string;
	borderRadius?: number;
	borderWidth?: number;
	variant?: 'primary' | 'secondary';
	color?: string;
	fontSize?: number;
	fontWeight?: number;
	textAlign?: string;
	justifyContent?: string;
	alignItems?: string;
};

const CustomButton = (props: ButtonsProps) => {
	const {
		title,
		onPress,
		pl,
		pr,
		pb,
		pt,
		ml,
		mr,
		mb,
		mt,
		border,
		borderColor,
		borderRadius,
		borderWidth,
		variant,
		color,
		fontSize,
		fontWeight,
		textAlign,
		justifyContent,
		alignItems,
	} = props;
	const [propStyles, setPropStyles] = useState({
		text: {
			color: color || 'white',
			fontSize: fontSize || 16,
			fontWeight: fontWeight || 500,
			textAlign: textAlign || 'center',
			justifyContent: justifyContent || 'center',
			alignItems: alignItems || 'center',
		},
		button: {
			borderRadius: borderRadius || 0,
			borderWidth: borderWidth || 0,
			borderColor: borderColor || 'white',
			backgroundColor:
				variant === 'secondary' ? SECONDARY_COLOR : PRIMARY_COLOR,
		},
	});
	return (
		<View>
			<Pressable onPress={onPress}>
				<View>
					<Text>{title}</Text>
				</View>
			</Pressable>
		</View>
	);
};

export default CustomButton;

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
	},
});
