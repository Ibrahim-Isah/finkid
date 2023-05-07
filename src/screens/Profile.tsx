import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';

type Props = {
	navigation: any;
};
const Profile = ({ navigation }: Props) => {
	const editProfile = () => {
		navigation.navigate('EditProfile');
	};
	return (
		<View
			style={{
				flex: 1,
				alignContent: 'center',
				justifyContent: 'center',
			}}
		>
			<Text>
				<Button title='Edit Profile' onPress={editProfile} />
			</Text>
		</View>
	);
};

export default Profile;

const styles = StyleSheet.create({});
