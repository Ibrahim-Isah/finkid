import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
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
		<View style={{ flex: 1 }}>
			<Image
				source={require('../../assets/images/freetrail2.png')}
				style={styles.background}
			/>
			<View style={{ flex: 1, justifyContent: 'center' }}>
				<View style={styles.container}>
					<View style={styles.headerTextContainer}>
						<Text style={styles.headerText}>Random Quotes and Facts</Text>
						<Text style={styles.subText}>
							Swipe left or right for more quotes
						</Text>
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
		</View>
	);
};

export default Carousel;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: width * 0.08,
		paddingHorizontal: width * 0.05,
		minHeight: height * 0.7,
		backgroundColor: '#3D9FC177',
		borderRadius: 10,
		margin: 'auto',
	},
	headerText: {
		fontSize: 22,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	subText: {
		fontSize: 14,
		textAlign: 'center',
		fontStyle: 'italic',
	},
	headerTextContainer: {
		alignItems: 'center',
		marginVertical: height * 0.04,
	},
	wrapper: {
		backgroundColor: 'transparent',
	},
	background: {
		position: 'absolute',
		zIndex: -10,
		width: '100%',
		height: '100%',
	},
});
