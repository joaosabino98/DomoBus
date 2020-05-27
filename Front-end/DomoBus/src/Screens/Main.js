import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {SearchBar} from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
import Modal from 'react-native-modal';

import UserContext from '../API/UserContext';
import AuthContext from '../API/AuthContext';
import SortedList from '../Components/SortedList';
import {changeValue} from '../API/Api';

function HomeScreen({navigation, route}) {
  const context = React.useContext(UserContext);
  const {refresh} = React.useContext(AuthContext);

  console.log(context);

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const [device, selectDevice] = useState(context.device[0]);
  const [toggle, setToggle] = useState(false);
  const [sort, setSort] = useState(0);

  const deviceDetails = n => {
    selectDevice(() => {
      for (let i = 0; i < context.device.length; i++) {
        if (context.device[i].device_id == n) {
          setToggle(context.device[i].value[0].value_number && true);
          return context.device[i];
        }
      }
    });
    toggleOverlay();
  };

  const [search, updateSearch] = useState('');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.header}>
          <View style={styles.headerButton}>
            <Icon name="sort" size={30} />
            <Picker
              selectedValue={String(sort)}
              style={{height: 50, width: 135}}
              onValueChange={itemValue => setSort(parseInt(itemValue))}>
              <Picker.Item label="A-Z Name" value="0" />
              <Picker.Item label="Z-A Name" value="1" />
              {/* <Picker.Item label="Type" value="2" /> */}
              <Picker.Item label="Division" value="3" />
              {/*<Picker.Item label="Status" value="3" />*/}
            </Picker>
          </View>
          <TouchableOpacity onPress={() => refresh()}>
            <View style={[styles.headerButton, {marginLeft: -5}]}>
              <Icon name="refresh" size={30} />
            </View>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, refresh, setSort, sort]);

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search by name"
        onChangeText={() => {
          updateSearch(search);
        }}
        value={search}
      />
      <View style={styles.list}>
        <SortedList
          deviceList={context.device}
          sortType={sort}
          typeList={context.type}
          divisionList={context.division}
          propertyList={context.property}
          selectDevice={deviceDetails}
          searchQuery={search}
        />
        <Modal isVisible={visible} onBackdropPress={toggleOverlay}>
          <View style={styles.overlay}>
            {/* TODO: Function that renders overlay based on type */}
            <Text style={styles.overlayText}>{device.device_name}</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={toggle ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                var val = (device.value[0].value_number =
                  1 - device.value[0].value_number);
                changeValue(context.userID, device.device_id, 1, val);
                setToggle(!toggle);
              }}
              value={toggle}
            />
          </View>
        </Modal>
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
  headerButton: {
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  overlay: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.5,
  },
  overlayText: {
    fontSize: 20,
  },
  list: {
    flex: 1,
    // justifyContent: 'flex-start',
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
