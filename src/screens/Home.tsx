import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import { tUser } from '../types';
import CustomLoading from '../components/CustomLoading';
import { PRIMARY_COLOR } from '../constants/colors';

const Home = ({ navigation }: any) => {
	const [user, setUser] = useState<any>({});
	useEffect(() => {
		async function getUser() {
			const response: any = await SecureStore.getItemAsync('FINKID_USER');
			const userResponse = JSON.parse(response);

			if (userResponse) {
				setUser(userResponse);
				return;
			}
			setUser(null);
		}

		getUser();
	}, []);

	const handleContinue = () => {
		if (!user) {
			navigation.navigate('EditProfile');
			return;
		}
		navigation.navigate('Category');
		return;
	};

	return (
		<View
			style={{
				flex: 1,
			}}
		>
			<Image
				source={require('../../assets/images/home.png')}
				style={styles.illustration}
			/>
			<View style={styles.intro}>
				<Text style={styles.introHeader}>
					Welcome to Finkid{user ? `, ${user.firstName}` : ''}
				</Text>
				<Text style={styles.introDetails}>
					Finkid is a kid-friendly mobile app that helps children learn about
					financial literacy in a fun and interactive way.
				</Text>
			</View>
			<View style={styles.buttonContainer}>
				<Pressable onPress={handleContinue} style={styles.button}>
					<Text style={styles.buttonText}>
						{user ? 'Select Category' : 'Get Started'}
					</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	illustration: {
		width: '100%',
		height: '60%',
		flex: 2.5,
	},
	button: {
		backgroundColor: PRIMARY_COLOR,
		borderRadius: 15,
		paddingHorizontal: 20,
		paddingVertical: 15,
		width: '60%',
		marginTop: 10,
		alignItems: 'center',
		elevation: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: 'bold',
	},
	intro: {
		margin: 20,
		flex: 1,
		justifyContent: 'center',
	},
	introHeader: {
		fontSize: 24,
		fontWeight: 'bold',
		color: PRIMARY_COLOR,
	},
	introDetails: {
		fontSize: 18,
		fontWeight: 'normal',
		marginVertical: 10,
	},
	buttonContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
});
