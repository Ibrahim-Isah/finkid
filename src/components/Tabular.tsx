import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Table, Row } from 'react-native-table-component';
import { PRIMARY_COLOR } from '../constants/colors';

const Tabular = (props: any) => {
	const { data } = props;

	return (
		<View
			style={{
				flex: 1,
				width: '80%',
				justifyContent: 'center',
			}}
		>
			<Table borderStyle={{ borderWidth: 1 }}>
				<Row
					data={['Category', 'Cost']}
					style={[styles.cell, styles.head]}
					textStyle={{
						color: 'white',
						textAlign: 'center',
					}}
				/>
				{data.map((d: any, index: number) => (
					<Row
						key={index}
						data={[d.Category, d.Cost]}
						style={styles.cell}
						textStyle={{
							textAlign: 'center',
						}}
					/>
				))}
			</Table>
		</View>
	);
};

export default Tabular;

const styles = StyleSheet.create({
	head: { backgroundColor: PRIMARY_COLOR },
	cell: {
		height: 40,
		backgroundColor: '#fff',
	},
	text: { margin: 6, textAlign: 'center' },
});
