import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { PRIMARY_COLOR } from '../constants/colors';

const Item = ({ title }: any) => (
	<View style={styles.item}>
		<Text style={styles.text}>{title}</Text>
	</View>
);

const Readlist = (props: any) => {
	const { data } = props;
	return data?.map((x: string) => <Item key={x} title={x} />);
};

export default Readlist;

const styles = StyleSheet.create({
	item: {
		backgroundColor: PRIMARY_COLOR,
		padding: 20,
		marginVertical: 8,
		width: '100%',
	},
	text: {
		color: 'white',
		fontSize: 22,
	},
});
