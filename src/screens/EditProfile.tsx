import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Image,
	Button,
	Alert,
	Pressable,
	ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import { tUser } from '../types';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/colors';

const EditProfile = ({ navigation }: any) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [age, setAge] = useState('');
	const [gender, setGender] = useState('');
	const [hobby, setHobby] = useState('');
	const [profilePicture, setProfilePicture] = useState('');

	useEffect(() => {
		loadProfileInfo();
	}, []);

	const loadProfileInfo = async () => {
		try {
			const response: any = await SecureStore.getItemAsync('FINKID_USER');
			const user: tUser = JSON.parse(response);
			if (user) {
				setFirstName(user.firstName || '');
				setLastName(user.lastName || '');
				setAge(user.age || '');
				setGender(user.gender || '');
				setHobby(user.hobby || '');
				setProfilePicture(user.profilePicture || '');
			}
		} catch (e) {
			console.log('Error loading profile information:', e);
		}
	};
	const saveProfileInfo = async () => {
		try {
			const payload = {
				firstName,
				lastName,
				age,
				gender,
				hobby,
				profilePicture,
			};
			await SecureStore.setItemAsync('FINKID_USER', JSON.stringify(payload));
			Alert.alert(
				'Success',
				'Profile information saved successfully',
				[{ text: 'OK', onPress: () => navigation.navigate('Profile') }],
				{ cancelable: true }
			);
		} catch (e) {
			console.log('Error saving profile information:', e);
		}
	};

	const selectProfilePicture = async () => {
		let result: any = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
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
			// await SecureStore.setItem('myImage', imageBase64);
			setProfilePicture(imageBase64 as string);
		}
	};
	return (
		<ScrollView>
			<View style={styles.container}>
				<Text style={styles.heading}>Edit Profile</Text>
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
					<Pressable onPress={saveProfileInfo} style={styles.save}>
						<Text style={styles.saveText}>Save Profile</Text>
					</Pressable>
				</View>
				<TextInput
					style={styles.input}
					placeholder='First Name'
					value={firstName}
					onChangeText={setFirstName}
				/>
				<TextInput
					style={styles.input}
					placeholder='Last Name'
					value={lastName}
					onChangeText={setLastName}
				/>
				<TextInput
					style={styles.input}
					placeholder='Age'
					value={age}
					keyboardType='numeric'
					onChangeText={setAge}
				/>
				<TextInput
					style={styles.input}
					placeholder='Gender'
					value={gender}
					onChangeText={setGender}
				/>
				<TextInput
					style={styles.input}
					placeholder='Hobby '
					value={hobby}
					onChangeText={setHobby}
				/>
				<Pressable onPress={saveProfileInfo} style={styles.saveProfile}>
					<Text style={styles.saveText}>Save Profile</Text>
				</Pressable>
			</View>
		</ScrollView>
	);
};

export default EditProfile;

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
});
