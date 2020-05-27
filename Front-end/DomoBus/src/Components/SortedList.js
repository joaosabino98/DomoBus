import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
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
  searchQuery,
}) {
  const NO_VALUE = '---';

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
        return deviceList.sort((a, b) => a.device_name > b.device_name);
      case 1:
        return deviceList.sort((a, b) => a.device_name < b.device_name);
      case 2:
        return deviceList.sort((a, b) => a.device_type > b.device_type);
      case 3:
        return deviceList.sort(
          (a, b) => a.device_division_id > b.device_division_id,
        );
      // decodeDivision(a.device_division_id) > decodeDivision(b.device_division_id));

      /*case 4: sort by status
        return deviceList.sort((a, b) =>
            a.localeCompare(b),
        );*/
    }
    return deviceList;
  };

  const renderDeviceStatus = (type, valueList) => {
    switch (type) {
      case 1: // LAMP
        return (
          <View style={styles.status}>
            <Icon
              name="power-settings-new"
              size={15}
              color="white"
              style={[
                styles.statusIcon,
                {
                  backgroundColor:
                    'hsl(120, ' + valueList[0].value_number + '00%, 40%)',
                },
              ]}
            />
            <Text style={styles.listText}>
              {valueList[0].value_number
                ? valueList[1].value_number + '%'
                : NO_VALUE}
            </Text>
          </View>
        );
      case 2: // TERMOSTAT
        return (
          <View style={styles.status}>
            <Text style={styles.listText}>
              {valueList[0].value_number
                ? valueList[1].value_number / 10 +
                  '.' +
                  (valueList[1].value_number % 10) +
                  'ºC'
                : NO_VALUE}
            </Text>
          </View>
        );
      case 3: // AIR CONDITIONATE
        return (
          <View style={styles.status}>
            <Icon
              name="power-settings-new"
              size={15}
              color="white"
              style={[
                styles.statusIcon,
                {
                  backgroundColor:
                    'hsl(120, ' + valueList[0].value_number + '00%, 40%)',
                },
              ]}
            />
            <Text style={styles.listText}>
              {valueList[0].value_number
                ? valueList[1].value_number / 10 +
                  '.' +
                  (valueList[1].value_number % 10) +
                  'ºC'
                : NO_VALUE}
            </Text>
          </View>
        );
      case 4: // DOOR
        return (
          <View style={styles.status}>
            <Text style={styles.listText}>
              {valueList[0].value_number ? 'Open' : 'Closed'}
            </Text>
          </View>
        );
      case 5: // BLINDS
        return (
          <View style={styles.status}>
            <Icon
              name="open-in-browser"
              size={15}
              color="white"
              style={[
                styles.statusIcon,
                {
                  backgroundColor:
                    'hsl(180, ' + valueList[0].value_number / 2 + '00%, 40%)',
                },
              ]}
            />
            <Text style={styles.listText}>
              {valueList[0].value_number + '%'}
            </Text>
          </View>
        );
      case 6: // OTHER
        return (
          <View style={styles.status}>
            <Icon
              name="power-settings-new"
              size={15}
              color="white"
              style={[
                styles.statusIcon,
                {
                  backgroundColor:
                    'hsl(120, ' + valueList[0].value_number + '00%, 40%)',
                },
              ]}
            />
          </View>
        );
    }
  };

  const matchSearch = (term, name) => {
    return term == '' ? true : name.includes(term); // empty string implies search isn't a factor
  };

  return (
    <View style={styles.container}>
      <View style={styles.listTitle}>
        <View style={styles.listItemDetail}>
          <Text style={styles.listTitleText}>Device</Text>
        </View>
        <View style={styles.listItemDetailSmall}>
          <Text style={styles.listTitleText}>Division</Text>
        </View>
        <View style={styles.listItemDetailXSmall}>
          <Text style={styles.listTitleText}>State</Text>
        </View>
      </View>
      <ScrollView style={styles.container}>
        {sortDevices()?.map(item => {
          return matchSearch(searchQuery, item.device_name) ? (
            <TouchableOpacity
              key={item.device_id}
              style={styles.listItem}
              onPress={() => selectDevice(item.device_id)}>
              <View style={styles.listItemDetail}>
                <Text style={styles.listText}>{item.device_name}</Text>
              </View>
              {/* <View style={styles.listItemDetail}>
                <Text style={styles.listText}>{decodeType(item.device_type_id)}</Text>
              </View> */}
              <View style={styles.listItemDetailSmall}>
                <Text style={styles.listText}>
                  {decodeDivision(item.device_division_id) || NO_VALUE}
                </Text>
              </View>
              <View style={styles.listItemDetailXSmall}>
                {renderDeviceStatus(item.device_type_id, item.value)}
              </View>
            </TouchableOpacity>
          ) : null;
        })}
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
    backgroundColor: 'midnightblue',
  },
  listTitleText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
  listItem: {
    flexDirection: 'row',
    height: 50,
    marginBottom: 5,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: 'white',
    elevation: 1,
  },
  listItemDetail: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 15,
  },
  listItemDetailSmall: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 15,
  },
  listItemDetailXSmall: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 15,
  },
  listText: {
    fontSize: 15,
  },
  status: {
    flexDirection: 'row',
  },
  statusIcon: {
    alignSelf: 'center',
    padding: 2,
    borderRadius: 2,
    marginRight: 5,
  },
});

export default SortedList;
