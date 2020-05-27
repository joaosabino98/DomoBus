import * as React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  Button,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import AuthContext from '../API/AuthContext';
import LoginContext from '../API/LoginContext';

function LoginScreen({navigation}) {
  const {signIn} = React.useContext(AuthContext);
  const context = React.useContext(LoginContext);
  const [userID, setUserID] = React.useState(null);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  console.log(context);

  return (
    <View style={{flex: 1}}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/blue_logo.png')}
        />
      </View>
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.title}>Welcome home!</Text>
        </View>
        <View style={styles.userContainer}>
          <Text style={styles.text}>User:</Text>
          <Picker
            selectedValue={userID}
            style={{height: 50, width: '100%'}}
            onValueChange={(itemValue, itemIndex) =>
              itemValue != '' && setUserID(itemValue)
            }>
            <Picker.Item label="Select a User" value="" />
            {context.user?.map(item => {
              return (
                <Picker.Item
                  key={item.person_id}
                  label={item.person_name}
                  value={item.person_id}
                />
              );
            })}
          </Picker>
        </View>
        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Button
              style={{height: 50}}
              title="Login"
              onPress={() => {
                if (userID != null) {
                  setLoading(true);
                  signIn({homeID: 1, userID: userID, username, password});
                  // setLoading(false);
                }
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '60%',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    paddingLeft: 9,
  },
  inputContainer: {
    flex: 0.6,
  },
  userContainer: {
    marginTop: '20%',
    width: '80%',
    alignSelf: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    width: '80%',
    alignSelf: 'center',
  },
});

export default LoginScreen;
