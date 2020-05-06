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

import UserContext from '../API/UserContext';
import {Picker} from '@react-native-community/picker';

function HomeScreen({navigation}) {
  const context = React.useContext(UserContext);

  console.log(context);

  {
    /*const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}
          overlayStyle={styles.overlay}>
          <Text style={styles.overlayText}>Sort by:</Text>
          <FlatList
            data={sortOptions}
            renderItem={({item}) => (
              <TouchableOpacity>
                <View style={styles.listItem}>
                  <Text style={styles.listText}>{item.text}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.key}
          />
        </Overlay>
  */
  }

  const sortOptions = useState([
    {key: 0, text: 'Name A-Z'},
    {key: 1, text: 'Name Z-A'},
    {key: 2, text: 'Device Type'},
    {key: 3, text: 'Status'},
  ]);
  const [activeSort, setActiveSort] = useState(0);

  const setSort = o => {
    setActiveSort(o);
  };

  const shadowOpt = {
    width: Dimensions.get('window').width,
    height: 50,
    backgroundColor: '#fff',
    color: '#000',
    border: 2,
    radius: 3,
    opacity: 0.1,
    shadowOffset: {width: 1, height: 1},
    elevation: 5,
    x: 0,
    y: 3,
    style: {marginVertical: 5},
  };

  return (
    <View style={styles.container}>
      <BoxShadow setting={shadowOpt}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerText}>Home</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity>
              <View style={styles.headerButton}>
                <Icon name="search" size={40} />
              </View>
            </TouchableOpacity>
            <View style={styles.headerButton}>
              <Icon name="sort" size={40} />
              <Picker
                selectedValue={activeSort}
                style={{height: 50, width: 100}}
                onValueChange={(itemValue, itemIndex) => setSort(itemValue)}>
                <Picker.Item label="A-Z Name" value="0" />
                <Picker.Item label="Z-A Name" value="1" />
                <Picker.Item label="Device Type" value="2" />
                <Picker.Item label="Status" value="3" />
              </Picker>
            </View>
          </View>
        </View>
      </BoxShadow>
      <View />
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
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
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
    fontWeight: 'bold',
  },
  headerButton: {
    paddingTop: 5,
    paddingRight: 10,
    flexDirection: 'row',
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
