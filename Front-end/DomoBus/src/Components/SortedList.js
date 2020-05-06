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
          a.device_name.localeCompare(b.device_name),
        );
      case 1:
        return deviceList
          .sort((a, b) => a.device_name.localeCompare(b.device_name))
          .reverse();
      case 2:
        return deviceList.sort((a, b) =>
          a.device_type.localeCompare(b.device_type),
        );
        {
          /*case 4: sort by status
        return deviceList.sort((a, b) =>
            a.localeCompare(b),
        );*/
        }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <FlatList data={sortDevices()} renderItem={(item) => (
          <TouchableOpacity>
            <View style={styles.listItem}>
              <Text style={styles.listText}>{item.device_name}</Text>
              <Text style={styles.listText}>{decodeType(item.device_type_id)}</Text>
              <Text style={styles.listText}>{decodeDivision(item.device_division_id)}</Text>
            </View>
          </TouchableOpacity>
      )}/>
    </ScrollView>
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
  listItem: {
    flexDirection: 'row',
    height: 20,
    marginVertical: 5,
  },
  listText: {
    textAlign: 'center',
    fontSize: 15,
  },
});

export default SortedList;
