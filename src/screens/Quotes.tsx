import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import Carousel from '../components/Carousel';
import { randomFactsAndQuotes } from '../services/data';

const Quotes = () => {
	const [quotes, setQuotes] = useState([
		{
			quote: '',
			author: '',
		},
	]);

	// useEffect(() => {
	//     setQuotes(randomFactsAndQuotes.sort(() => Math.random() - 0.5)),
	// }, []);

	useEffect(() => {
		if (randomFactsAndQuotes) {
			setQuotes(randomFactsAndQuotes.sort(() => Math.random() - 0.5));
		}
	}, []);
	return (
		<Carousel>
			{quotes?.map(
				(
					item: {
						quote: string;
						author: string;
					},
					index: number
				) => (
					<View style={styles.container} key={index}>
						<Text style={styles.quote}>{item.quote}</Text>
						<Text style={styles.author}>
							{item.author == 'Unknown' ? '' : item.author}
						</Text>
					</View>
				)
			)}
		</Carousel>
	);
};

export default Quotes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	quote: { justifyContent: 'center', fontSize: 24 },
	author: {
		margin: 15,
		alignSelf: 'flex-end',
		fontStyle: 'italic',
		fontSize: 20,
	},
});
