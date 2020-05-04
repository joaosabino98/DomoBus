import * as React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';


function LoginScreen() {
  	return (
    <View style={{ flex: 1 }}>
		<View style={ styles.logoContainer }>
			<Image
				style={styles.logo}
				source={require('../../assets/blue_logo.png')}
			/>
		</View>
		<View style={ styles.inputContainer }>
      		<Text>Hello!</Text>
			<Text>There will be some sort of login here, I swear</Text>
		</View>
    </View>
  );
}

const styles = StyleSheet.create({
	logoContainer: {
		flex: 0.3,
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo: {
		width: "60%",
	},
	inputContainer: {
		flex: 0.6,
		alignItems: 'center',
		justifyContent: 'center'
	}
  });

export default LoginScreen;