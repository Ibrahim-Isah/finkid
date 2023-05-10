import {
	StyleSheet,
	Text,
	View,
	Button,
	Image,
	ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { PRIMARY_COLOR } from '../constants/colors';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import { tUser } from '../types';

type Props = {
	navigation: any;
};
const defaultDetails = {
	firstName: null,
	lastName: null,
	age: null,
	gender: null,
	hobby: null,
	profilePicture: null,
};
const Profile = ({ navigation }: Props) => {
	const [profilePicture, setProfilePicture] = useState('');
	const [userDetails, setUserDetails] = useState<tUser>(defaultDetails);

	useEffect(() => {
		SecureStore.getItemAsync('FINKID_USER').then((response: any) => {
			const user: tUser = JSON.parse(response);
			if (user) {
				setUserDetails(user || defaultDetails);
				return;
			}
			setUserDetails(defaultDetails);
		});
	}, []);

	const selectProfilePicture = async () => {
		let result: any = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.cancelled) {
			const response = await fetch(result.assets[0].uri);
			const imageBase64 = await response.blob().then((blob) => {
				return new Promise((resolve, reject) => {
					const reader = new FileReader();
					reader.onload = () => {
						resolve(reader.result);
					};
					reader.onerror = reject;
					reader.readAsDataURL(blob);
				});
			});

			await SecureStore.setItemAsync(
				'FINKID_USER',
				JSON.stringify({
					...userDetails,
					profilePicture: imageBase64,
				})
			);
		}
	};

	const editProfile = () => {
		navigation.navigate('EditProfile');
	};
	return (
		<ScrollView>
			<View style={styles.container}>
				<Text style={styles.heading}>My Profile</Text>
				<View style={styles.profilePictureContainer}>
					{profilePicture ? (
						<Image
							source={{ uri: profilePicture }}
							style={styles.profilePicture}
						/>
					) : (
						<Image
							source={require('../../assets/images/placeholder.jpg')}
							style={styles.profilePicture}
						/>
					)}
				</View>
				<View style={styles.buttonContainer}>
					<Pressable onPress={selectProfilePicture} style={styles.upload}>
						<Text style={styles.uploadText}>Upload Picture</Text>
					</Pressable>
					<Pressable
						onPress={() => {
							navigation.navigate('EditProfile');
						}}
						style={styles.save}
					>
						<Text style={styles.saveText}>Edit Profile</Text>
					</Pressable>
				</View>
			</View>
			<View style={{ marginHorizontal: 30, marginVertical: 10 }}>
				<View style={styles.view}>
					<Text style={styles.title}>Firstname</Text>
					<Text style={styles.subtitle}>
						{userDetails.firstName || 'No User'}
					</Text>
				</View>
				<View style={styles.view}>
					<Text style={styles.title}>Lastname</Text>
					<Text style={styles.subtitle}>
						{userDetails.lastName || 'No User'}
					</Text>
				</View>
				{/* <View style={styles.view}>
					<Text style={styles.title}>Email</Text>
					<Text style={styles.subtitle}>
						{userDetails.email || 'No User'}
					</Text>
				</View> */}
				<View style={styles.view}>
					<Text style={styles.title}>Age</Text>
					<Text style={styles.subtitle}>{userDetails.age || 'No User'}</Text>
				</View>
				<View style={styles.view}>
					<Text style={styles.title}>Gender</Text>
					<Text style={styles.subtitle}>{userDetails.gender || 'No User'}</Text>
				</View>
				<View style={styles.view}>
					<Text style={styles.title}>Hobbies</Text>
					<Text style={styles.subtitle}>{userDetails.hobby || 'No User'}</Text>
				</View>
			</View>
		</ScrollView>
	);
};

export default Profile;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		alignItems: 'center',
		marginVertical: 10,
	},
	heading: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
		marginTop: 10,
	},
	input: {
		width: '100%',
		height: 50,
		borderWidth: 1,
		borderColor: PRIMARY_COLOR,
		backgroundColor: '#FFFFFF',
		borderRadius: 5,
		padding: 10,
		marginVertical: 10,
	},
	profilePictureContainer: {
		width: '100%',
		height: 200,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20,
	},
	profilePicture: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 30,
	},
	upload: {
		backgroundColor: '#FFFFFF',
		borderWidth: 3,
		borderColor: PRIMARY_COLOR,
		borderRadius: 10,
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	uploadText: {
		color: PRIMARY_COLOR,
		fontSize: 16,
		fontWeight: 'bold',
	},
	saveText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: 'bold',
	},
	save: {
		backgroundColor: PRIMARY_COLOR,
		borderRadius: 10,
		paddingHorizontal: 20,
		paddingTop: 12,
		marginLeft: 15,
	},
	saveProfile: {
		backgroundColor: PRIMARY_COLOR,
		borderRadius: 10,
		paddingHorizontal: 20,
		paddingVertical: 15,
		width: '100%',
		marginTop: 10,
		alignItems: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 10,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	subtitle: {
		fontSize: 16,
		fontWeight: '400',
	},
	view: {
		marginBottom: 13,
	},
});
