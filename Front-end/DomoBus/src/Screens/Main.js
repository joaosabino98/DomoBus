import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {Overlay} from 'react-native-elements';
import {BoxShadow} from 'react-native-shadow';
import {Picker} from '@react-native-community/picker';

import UserContext from '../API/UserContext';
import SortedList from '../Components/SortedList';

function HomeScreen({navigation}) {
  const context = React.useContext(UserContext);

  console.log(context);

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const [device, selectDevice] = useState(context.device[0]);
  {
    /*
  const sortOptions = useState([
    {key: 0, text: 'Name A-Z'},
    {key: 1, text: 'Name Z-A'},
    {key: 2, text: 'Device Type'},
    {key: 3, text: 'Status'},
  ]);
  */
  }
  const [activeSort, setActiveSort] = useState(0);

  const setSort = o => {
    setActiveSort(o);
  };

  const deviceDetails = n => {
    selectDevice(() => {
      for (let i = 0; i < context.device.length; i++) {
        if (context.device[i].device_id == n) {
          return context.device[i];
        }
      }
    });
    toggleOverlay();
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
      <View style={styles.header}>
        <TouchableOpacity>
          <View style={styles.headerButton}>
            <Icon name="search" size={30} />
          </View>
        </TouchableOpacity>
        <View style={styles.headerButton}>
          <Icon name="sort" size={30} />
          <Picker
            selectedValue={activeSort}
            style={{height: 50, width: 100}}
            onValueChange={(itemValue, itemIndex) => setSort(itemValue)}>
            <Picker.Item label="A-Z Name" value="0" />
            <Picker.Item label="Z-A Name" value="1" />
            <Picker.Item label="Device Type" value="2" />
            {/*<Picker.Item label="Status" value="3" />*/}
          </Picker>
        </View>
      </View>
      ),
    });
  }, [navigation, setSort]);

  return (
    <View style={styles.container}>
      <View>
        <SortedList
          deviceList={context.device}
          sortType={activeSort}
          typeList={context.type}
          divisionList={context.division}
          propertyList={context.property}
          selectDevice={deviceDetails}
        />
        <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}
          overlayStyle={styles.overlay}>
          <Text style={styles.overlayText}>Device: {device.device_id}</Text>
        </Overlay>
      </View>
    </View>
  );
}

{
  /* Ideally fontWeight for headerText would be semibold but android doesn't support this without importing the different weights for each font*/
}
const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  header: {
    flexDirection: 'row',
  },
  headerLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  headerText: {
    paddingLeft: 17,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
  headerButton: {
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%'
  },
  overlay: {
    width: '90%',
    height: '90%',
  },
  overlayText: {
    fontSize: 20,
  },
  list: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  listItem: {
    height: 20,
    marginVertical: 5,
    backgroundColor: '#000',
  },
  listText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
  },
});

export default HomeScreen;
