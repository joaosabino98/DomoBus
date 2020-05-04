// In App.js in a new project

import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/Screens/Login';
import HomeScreen from './src/Screens/Main';
import SplashScreen from './src/Screens/Splash';

const Stack = createStackNavigator();

function App() {
	const [isReady, setIsReady] = React.useState(true);
	const [isLoggedIn, setIsLoggedIn] = React.useState(true);

	if (!isReady) {
		// We haven't finished checking for the token yet
		return <SplashScreen />;
	}
	return (
		<NavigationContainer>
			<Stack.Navigator>
			{isLoggedIn ? (
			<>
				<Stack.Screen name="Home" component={HomeScreen} />
				{/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
			</>
			) : (
				<Stack.Screen name="Login" component={LoginScreen} />
			)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;