import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {SearchBar} from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
import Modal from 'react-native-modal';

import UserContext from '../API/UserContext';
import AuthContext from '../API/AuthContext';
import SortedList from '../Components/SortedList';
import DeviceInfo from '../Components/DeviceInfo';

function HomeScreen({navigation, route}) {
  const context = React.useContext(UserContext);
  const {refresh} = React.useContext(AuthContext);

  console.log(context);

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const [device, selectDevice] = useState(context.device[0]);
  const [sort, setSort] = useState(0);
  const [search, updateSearch] = useState('');

  const deviceDetails = n => {
    selectDevice(() => context.device.find((element) => element.device_id == n));
    toggleOverlay();
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.header}>
          <View style={styles.headerButton}>
            <Icon name="sort-variant" size={30} />
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
        lightTheme={true}
        editable={true}
        onChangeText={updateSearch}
        value={search}
        containerStyle={styles.searchBarView}
        inputContainerStyle={styles.searchBar}
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
        <Modal
          isVisible={visible}
          onBackdropPress={toggleOverlay}
        >
          <View style={[styles.overlay, {height: Dimensions.get('window').height * (0.75 + 1.5 * device.value.length)/10}]}>
            <DeviceInfo userID={context.userID} device={device}/>
          </View>
        </Modal>
      </View>
      {/* <TouchableOpacity style={styles.addbutton}>
        <Icon name="plus" size={40} color="white" />
      </TouchableOpacity> */}
    </View>
  );
}

{
  /* Ideally fontWeight for headerText would be semibold but android doesn't support this without importing the different weights for each font*/
}
const styles = StyleSheet.create({
  container: {
    flex: 1
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
  searchBarView: {
    marginBottom: 10,
  },
  searchBar: {
    height: 50,
    borderRadius: 5,
    marginHorizontal: 3,
    marginVertical: 5,
  },
  overlay: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.5,
  },
  list: {
    flex: 1,
    // justifyContent: 'flex-start',
  },
  addbutton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#1e90ff',
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default HomeScreen;
