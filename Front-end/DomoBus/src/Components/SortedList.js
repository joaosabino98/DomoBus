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
  accessList,
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

  const checkDivisionAccess = id => {
    if (id == null) return true // device not in a division
    let access = accessList.find((item) => item.division_id == id)
    return access.can_control;
  }

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

  const renderDeviceStatus = (typeID, valueList) => {
    switch (typeID) {
      case 1: // LAMP
        var property1 = valueList.find((item) => item.value_property_id == 1)
        var property3 = valueList.find((item) => item.value_property_id == 3)
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
                    'hsl(120, ' + property1.value_number + '00%, 40%)',
                },
              ]}
            />
            <Text style={styles.listText}>
              {property1.value_number
                ? property3.value_number + '%'
                : NO_VALUE}
            </Text>
          </View>
        );
      case 2: // TERMOSTAT
        var property2 = valueList.find((item) => item.value_property_id == 2)
        return (
          <View style={styles.status}>
            <Text style={styles.listText}>
              {property2.value_number / 10 + 'ºC'}
            </Text>
          </View>
        );
      case 3: // AIR CONDITIONATE
        var property1 = valueList.find((item) => item.value_property_id == 1)
        var property2 = valueList.find((item) => item.value_property_id == 2)
        var property3 = valueList.find((item) => item.value_property_id == 3)
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
                    'hsl(120, ' + property1.value_number + '00%, 40%)',
                },
              ]}
            />
            <Text style={styles.listText}>
              {property1.value_number
                ? property2.value_number / 10 + 'ºC'
                : NO_VALUE}
            </Text>
          </View>
        );
      case 4: // DOOR
        var property4 = valueList.find((item) => item.value_property_id == 4)
        return (
          <View style={styles.status}>
            <Text style={styles.listText}>
              {property4.value_number ? 'Open' : 'Closed'}
            </Text>
          </View>
        );
      case 5: // BLINDS
        var property5 = valueList.find((item) => item.value_property_id == 5)
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
                    'hsl(180, ' + property5.value_number / 1.5 + '%, 40%)',
                },
              ]}
            />
            <Text style={styles.listText}>
              {property5.value_number + '%'}
            </Text>
          </View>
        );
      case 6: // OTHER
        var property1 = valueList.find((item) => item.value_property_id == 1)
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
                    'hsl(120, ' + property1.value_number + '00%, 40%)',
                },
              ]}
            />
          </View>
        );
    }
  };

  const matchSearch = (term, name) => {
    return term == '' ? true : name.toLowerCase().includes(term.toLowerCase()); // empty string implies search isn't a factor
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
              style={[styles.listItem, {backgroundColor: checkDivisionAccess(item.device_division_id)?"white":"lightgrey"}]}
              onPress={() => selectDevice(item.device_id)}
              disabled={!checkDivisionAccess(item.device_division_id)}>
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
    marginHorizontal: 10,
    marginVertical: 5,
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
    marginHorizontal: 10,
    borderRadius: 5,
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
