import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import React from 'react';
import { sizeHeight, sizeWidth } from '../../../utils/size';
import CustomAlert from '../../../components/CustomAlert';
import { playDone } from '../../../utils/sounds';
import CoinWorkbook from './CoinWorkbook';

type Props = {
	ex: any;
	finish: () => void;
};

const TenNaira = (props: Props) => {
	const { ex, finish } = props;
	const [modalVisible, setModalVisible] = React.useState(false);

	const next = () => {
		setModalVisible(true);
		playDone();
		setTimeout(() => {
			finish();
		}, 1000);
	};
	return (
		<View style={{ ...styles.exercise, flex: 1 }}>
			<View style={styles.center}>
				<Image
					source={require('../../../../assets/images/10nairafull.png')}
					style={styles.dimeImg}
				/>
			</View>
			<View style={styles.centeredView}>
				<CustomAlert
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					message='Congratulations, Task Completed!!!'
					android={{
						container: {
							backgroundColor: '#11ac32',
						},
						title: {
							color: '#fff',
						},
						message: {
							color: '#fff',
							fontSize: 18,
						},
						button: {
							color: '#fff',
						},
					}}
					ios={{
						container: {
							backgroundColor: '#11ac32',
						},
						title: {
							color: '#fff',
						},
						message: {
							color: '#fff',
							fontSize: 18,
						},
						button: {
							color: '#fff',
						},
					}}
				/>
			</View>
			<View style={[styles.qtn, styles.center, { flex: 1 }]}>
				<Text
					style={{
						color: '#000',
						fontSize: 18,
					}}
				>
					{ex.question || 'Question'}
				</Text>
			</View>
			<View
				style={{
					flex: 1,
				}}
			>
				<CoinWorkbook
					ex={ex}
					finish={() => {
						next();
					}}
				/>
			</View>
		</View>
	);
};

export default TenNaira;

const width = Dimensions.get('window').width;
const phoneWidth = width < 500 ? true : false;

const styles = StyleSheet.create({
	exercise: {
		padding: phoneWidth ? 10 : 50,
		display: 'flex',
		marginBottom: 20,
		justifyContent: 'flex-start',
		marginHorizontal: 20,
	},
	qtn: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		textAlign: 'center',
	},
	qtnText: { color: '#000' },
	set: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-end',
	},
	innerSet: {
		flexDirection: 'row',
		paddingVertical: 30,
		justifyContent: 'flex-end',
		height: 100,
		alignItems: 'center',
	},
	innerSetMobile: {
		flexDirection: 'row',
		paddingVertical: 30,
		justifyContent: 'space-between',
		height: 100,
		alignItems: 'center',
	},
	center: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	left: {},
	right: {},
	coin: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	img: {
		resizeMode: 'contain',
		width: sizeWidth(8),
		height: sizeHeight(6),
	},
	dimeImg: {
		resizeMode: 'contain',
		width: sizeWidth(45),
		height: sizeHeight(12),
	},
	input: {
		height: 40,
		marginHorizontal: 12,
		marginVertical: 3,
		borderWidth: 1,
		padding: 10,
		width: 200,
	},
	inputKid: {
		margin: 15,
		height: 10,
		minWidth: 20,
		borderColor: '#7a42f4',
		fontWeight: 'bold',
		borderWidth: 2,
		borderRadius: 6,
		padding: 2,
	},
	inputMobile: {
		height: 40,
		marginHorizontal: 12,
		marginVertical: 3,
		borderWidth: 1,
		padding: 10,
		width: 'auto',
	},
	frow: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
});
