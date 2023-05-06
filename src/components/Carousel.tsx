import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import { LinearGradient } from 'expo-linear-gradient';

type CarouselProps = {
	children: React.ReactElement[] | React.ReactElement;
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Carousel = ({ children }: CarouselProps) => {
	return (
		<LinearGradient colors={['#3D9FC1', '#8DC641']} style={{ flex: 1 }}>
			<View style={{ flex: 1, justifyContent: 'center' }}>
				<View style={styles.container}>
					<View style={styles.headerTextContainer}>
						<Text style={styles.headerText}>Random Quotes and Facts</Text>
					</View>
					<Swiper
						style={styles.wrapper}
						showsButtons={false}
						autoplay={true}
						showsPagination={false}
						autoplayTimeout={5}
					>
						{children}
					</Swiper>
				</View>
			</View>
		</LinearGradient>
	);
};

export default Carousel;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: width * 0.08,
		paddingHorizontal: width * 0.05,
		minHeight: height * 0.8,
		backgroundColor: '#ffffff',
		borderRadius: 10,
		margin: 'auto',
	},
	headerText: {
		fontSize: 22,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	headerTextContainer: {
		alignItems: 'center',
		marginVertical: height * 0.04,
	},
	wrapper: {
		backgroundColor: 'transparent',
	},
});
