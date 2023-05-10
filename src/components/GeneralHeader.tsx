import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
type Props = {
	title: string;
};
const GeneralHeader = (props: Props) => {
	const { title } = props;
	return <Text style={styles.heading}>{title}</Text>;
};

export default GeneralHeader;

const styles = StyleSheet.create({
	heading: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
		marginTop: 10,
	},
});
