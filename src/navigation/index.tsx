import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Home from '../screens/Home';
import Quotes from '../screens/Quotes';
import {
	RootStackParamList,
	TabBottomParamList,
} from '../types/navigation.type';
import { PRIMARY_COLOR } from '../constants/colors';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import Category from '../screens/Category';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createMaterialBottomTabNavigator<TabBottomParamList>();

const Navigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name='Root' component={TabNavigator} />
				<Stack.Screen name='EditProfile' component={EditProfile} />
				<Stack.Screen name='Category' component={Category} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const TabNavigator = () => {
	return (
		<Tab.Navigator
			initialRouteName='Home'
			activeColor='#ffffff'
			inactiveColor='#595959'
			backBehavior='history'
			barStyle={{ backgroundColor: PRIMARY_COLOR, height: 70 }}
		>
			<Tab.Screen
				name='Home'
				component={Home}
				options={{
					tabBarLabel: '',

					tabBarIcon: ({ color }) => (
						<Icon name='home' color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name='Quotes'
				component={Quotes}
				options={{
					tabBarLabel: '',
					tabBarIcon: ({ color }) => (
						<Icon name='quote-left' color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name='Profile'
				component={Profile}
				options={{
					tabBarLabel: '',
					tabBarIcon: ({ color }) => (
						<Icon name='user' color={color} size={26} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default Navigation;
