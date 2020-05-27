// In App.js in a new project

import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/Screens/Login';
import HomeScreen from './src/Screens/Main';
import SplashScreen from './src/Screens/Splash';
import AuthContext from './src/API/AuthContext';
import LoginContext from './src/API/LoginContext';
import UserContext from './src/API/UserContext';
import {
  fetchUsers,
  fetchTypes,
  fetchProperties,
  fetchDivisionsInHome,
  fetchHomes,
  fetchDevicesInHome,
} from './src/API/Api';

const Stack = createStackNavigator();

function App({navigation}) {
  const [loginContext, setLoginContext] = React.useState({});
  const [userContext, setUserContext] = React.useState({});
  const [homeID, setHomeID] = React.useState(1);
  const [userID, setUserID] = React.useState(null);

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      await updateUsers();

      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };
    bootstrapAsync();
  }, []);

  async function updateUsers() {
    let user, home, context;
    await fetchUsers()
      .then(result => (user = result))
      .then(() => fetchHomes())
      .then(result => (home = result))
      .then(() => {
        context = {
          user: user,
          home: home,
        };
        setLoginContext(context);
      });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function updateData() {
    let type, property, division, device, context;

    await fetchTypes()
      .then(result => (type = result))
      .then(() => fetchProperties())
      .then(result => (property = result))
      .then(() => fetchDivisionsInHome(homeID))
      .then(result => (division = result))
      .then(() => fetchDevicesInHome(homeID))
      .then(result => (device = result))
      .then(() => {
        context = {
          userID: userID,
          homeID: homeID,
          type: type,
          property: property,
          division: division,
          device: device,
        };
        setUserContext(context);
      });
  }

  const authContext = React.useMemo(
    () => ({
      refresh: () => updateData(),
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        setUserID(data.userID);
        setHomeID(data.homeID);

        await updateData();

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [updateData],
  );

  if (state.isLoading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }
  return (
    <AuthContext.Provider value={authContext}>
      <LoginContext.Provider value={loginContext}>
        <UserContext.Provider value={userContext}>
          <NavigationContainer>
            <Stack.Navigator>
              {state.userToken == null ? (
                // <>
                <Stack.Screen name="Login" component={LoginScreen} />
              ) : (
                // </>
                <>
                  <Stack.Screen name="Home" component={HomeScreen} />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </UserContext.Provider>
      </LoginContext.Provider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  buttonView: {
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
});

export default App;
