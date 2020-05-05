import * as React from 'react';
import { View, Text } from 'react-native';
import UserContext from '../API/UserContext';


function HomeScreen({ navigation }) {

  const context = React.useContext(UserContext);

  console.log(context)  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

export default HomeScreen;