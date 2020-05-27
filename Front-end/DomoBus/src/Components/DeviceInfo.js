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

    return (
        <View>
            <Text style={styles.overlayText}>{device.device_name}</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={toggle ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                    var val = device.value[0].value_number = 1 - device.value[0].value_number
                    changeValue(userID, device.device_id, 1, val)
                    setToggle(!toggle)
                }}
                value={toggle}
            />
        </View>
    )
}

const styles = StyleSheet.create({

});  

export default DeviceInfo;