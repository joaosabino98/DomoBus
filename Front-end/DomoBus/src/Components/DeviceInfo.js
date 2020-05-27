import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Switch
} from 'react-native';
import { changeValue } from '../API/Api';


function DeviceInfo({userID, device}) {
    const [toggle, setToggle] = useState(false);

    const renderProperty = (value, deviceID) => {
        let propertyID = value.value_property_id;
        switch(propertyID) {
            case 1:
                return (
                <View key={propertyID} style={styles.block}>
                    <Text style={styles.property}>Status: {value.value_number?"ON":"OFF"}</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={toggle ? "#1e90ff" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => {
                            var val = value.value_number = 1 - value.value_number
                            changeValue(userID, deviceID, 1, val)
                            setToggle(!toggle)
                        }}
                        value={toggle}
                        />
                </View>
            );
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.blockTitle}>
                <Text style={styles.title}>{device.device_name}</Text>
            </View>
            {device.value.map((item) => renderProperty(item, device.device_id))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    blockTitle: {
        flex: 0.5,
        padding: 10,
        justifyContent: 'center',
        backgroundColor: 'midnightblue',
    },
    block: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,

    },
    title: {
        fontSize: 20,
        color: 'white'
    },
    property: {
        fontSize: 18
    }
});  

export default DeviceInfo;