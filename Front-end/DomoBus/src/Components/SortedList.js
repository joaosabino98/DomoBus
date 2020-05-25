import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

function SortedList({
  deviceList,
  sortType,
  typeList,
  divisionList,
  propertyList,
  selectDevice,
}) {
  const decodeDevice = id => {
    for (let i = 0; i < deviceList.length; i++) {
      if (deviceList[i].device_id == id) {
        return deviceList[i].device_name;
      }
    }
  };

  const decodeType = id => {
    for (let i = 0; i < typeList.length; i++) {
      if (typeList[i].type_id == id) {
        return typeList[i].type_name;
      }
    }
  };

  const decodeDivision = id => {
    for (let i = 0; i < divisionList.length; i++) {
      if (divisionList[i].division_id == id) {
        return divisionList[i].division_name;
      }
    }
  };

  const decodeProperty = id => {
    for (let i = 0; i < propertyList.length; i++) {
      if (propertyList[i].property_id == id) {
        return propertyList[i].property_name;
      }
    }
  };

  const sortDevices = () => {
    switch (sortType) {
      case 0:
        return deviceList.sort((a, b) =>
          a.device_name > b.device_name);
      case 1:
        return deviceList.sort((a, b) => 
          a.device_name < b.device_name);
      case 2:
        return deviceList.sort((a, b) =>
          a.device_type > b.device_type,
        );
        {
          /*case 4: sort by status
        return deviceList.sort((a, b) =>
            a.localeCompare(b),
        );*/
        }
    }
    return deviceList;
  };

  return (
    <View style={styles.container}>

      <View style={styles.listTitle}>
        <View style={styles.listItemDetail}>
          <Text style={styles.listTitleText}>Device</Text>
        </View>
        <View style={styles.listItemDetail}>
          <Text style={styles.listTitleText}>Division</Text>
        </View>
      </View>
      <ScrollView style={styles.container}>

        {sortDevices()?.map((item) => {
          return (
            <TouchableOpacity key={item.device_id} style={styles.listItem}>
              <View style={styles.listItemDetail}>
                <Text style={styles.listText}>{item.device_name}</Text>
              </View>
              {/* <View style={styles.listItemDetail}>
                <Text style={styles.listText}>{decodeType(item.device_type_id)}</Text>
              </View> */}
              <View style={styles.listItemDetail}>
                <Text style={styles.listText}>{decodeDivision(item.device_division_id)||"---"}</Text>
              </View>
            </TouchableOpacity>
        )})}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  listTitle: {
    flexDirection: 'row',
    height: 50,
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'midnightblue'
  },
  listTitleText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18
  },
  listItem: {
    flexDirection: 'row',
    height: 20,
    marginVertical: 5,
  },
  listItemDetail: {
    flex: 1,
    justifyContent: 'center'
  },
  listText: {
    textAlign: 'center',
    fontSize: 15,
  },
});

export default SortedList;
