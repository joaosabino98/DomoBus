import * as React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';


function SplashScreen() {
  	return (
    <View style={ styles.container }>
        <Image
            style={styles.logo}
            source={require('../../assets/yellow_logo.png')}
        />
    </View>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
    },
    logo: {
		width: "70%",
	},
  });

export default SplashScreen;