import { StyleSheet, Text, View, TextInput, Image, Button } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import { tUser } from '../types';

const EditProfile = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [age, setAge] = useState('');
	const [gender, setGender] = useState('');
	const [profilePicture, setProfilePicture] = useState('');

	const loadProfileInfo = async () => {
		try {
			const response: any = await SecureStore.getItemAsync('FINKID_USER');
			const user: tUser = JSON.parse(response);
			if (user) {
				setFirstName(user.firstName || '');
				setLastName(user.lastName || '');
				setAge(user.age || '');
				setGender(user.gender || '');
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
				profilePicture,
			};
			await SecureStore.setItemAsync('FINKID_USER', JSON.stringify(payload));
		} catch (e) {
			console.log('Error saving profile information:', e);
		}
	};

	const selectProfilePicture = async () => {
		// No permissions request is necessary for launching the image library
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
			// await SecureStore.setItem('myImage', imageBase64);
			setProfilePicture(imageBase64 as string);
		}
	};
	return (
		<View style={styles.container}>
			<Text style={styles.heading}>My Profile</Text>
			<View style={styles.profilePictureContainer}>
				{profilePicture ? (
					<Image
						source={{ uri: profilePicture }}
						style={styles.profilePicture}
					/>
				) : (
					<Button
						title='Select Profile Picture'
						onPress={selectProfilePicture}
					/>
				)}
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
			<Button title='Save Profile' onPress={saveProfileInfo} />
		</View>
	);
};

export default EditProfile;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		alignItems: 'center',
	},
	heading: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	input: {
		width: '100%',
		height: 50,
		borderWidth: 1,
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
		borderRadius: 100,
	},
});
