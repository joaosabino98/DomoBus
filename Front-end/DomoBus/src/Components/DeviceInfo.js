import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Switch
} from 'react-native';
import { changeValue } from '../API/Api';

function DeviceInfo({userID, device}) {
    const [property1, setProperty1] = useState(false);
    const [property2, setProperty2] = useState(250);
    const [property3, setProperty3] = useState(100);
    const [property4, setProperty4] = useState(false);
    const [property5, setProperty5] = useState(100);

    const [longChange2, setLongChange2] = useState(null);
    const [longChange3, setLongChange3] = useState(null);
    const [longChange5, setLongChange5] = useState(null);

    useEffect(() => {
        device.value.map((value) => {
            switch (value.value_property_id) {
                case 1: return setProperty1(value.value_number && true)
                case 2: return setProperty2(value.value_number)
                case 3: return setProperty3(value.value_number)
                case 4: return setProperty4(value.value_number && true)
                case 5: return setProperty5(value.value_number)
            }
        })
    }, [])

    function longChangeProperty2(value, increase, time) {
        var newVal = value + increase
        setProperty2(newVal)
        setLongChange2(setTimeout(() => longChangeProperty2(newVal, increase), time/2 > 200 ? time/2 : 200));
    }

    function stopLongChangeProperty2() {
        clearTimeout(longChange2)
        changeValue(userID, device.device_id, 2, property2)

        var value = device.value.find((item) => item.value_property_id == 2)
        value.value_number = property2
    }

    function longChangeProperty3(value, increase, time) {
        if (value + increase <= 100 && value + increase > 0) {
            var newVal = value + increase
            setProperty3(newVal)
            setLongChange3(setTimeout(() => longChangeProperty3(newVal, increase), time/2 > 200 ? time/2 : 200));
        }
    }

    function stopLongChangeProperty3() {
        clearTimeout(longChange3)
        changeValue(userID, device.device_id, 3, property3)

        var value = device.value.find((item) => item.value_property_id == 3)
        value.value_number = property3
    }

    function longChangeProperty5(value, increase, time) {
        if (value + increase <= 100 && value + increase >= 0) {
            var newVal = value + increase
            setProperty5(newVal)
            setLongChange5(setTimeout(() => longChangeProperty5(newVal, increase), time/2 > 200 ? time/2 : 200));
        }
    }

    function stopLongChangeProperty5() {
        clearTimeout(longChange5)
        changeValue(userID, device.device_id, 5, property5)

        var value = device.value.find((item) => item.value_property_id == 5)
        value.value_number = property5
    }

    const renderProperty = (value, deviceID) => {
        let propertyID = value.value_property_id;
        switch(propertyID) {
            case 1:
                return (
                <View key={propertyID} style={styles.block}>
                    <Text style={styles.property}>Status: {property1?"ON":"OFF"}</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={property1 ? "#1e90ff" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => {
                            var val = value.value_number = 1 - value.value_number
                            changeValue(userID, deviceID, 1, val)
                            setProperty1(!property1)
                        }}
                        value={property1}
                        style={{marginRight: 5}}
                        />
                </View>
                );
            case 2:
                return (
                <View key={propertyID} style={styles.block}>
                    <Text style={styles.property}>Temperature: {property2 / 10 + 'ºC'}</Text>
                    
                    <View style={styles.buttonBlock}>
                        <TouchableOpacity
                            style={[styles.button]}
                            // onPress={() => changeProperty2(-1)}
                            onPressIn={() => longChangeProperty2(property2, -5, 1000)}
                            onPressOut={() => stopLongChangeProperty2()}
                        >
                            <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            // onPress={() => changeProperty2(1)}
                            onPressIn={() => longChangeProperty2(property2, 5, 1000)}
                            onPressOut={() => stopLongChangeProperty2()}
                        >
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                );           
            case 3:
                return (
                <View key={propertyID} style={styles.block}>
                    <Text style={styles.property}>Intensity: {property3 + '%'}</Text>
                    
                    <View style={styles.buttonBlock}>
                        <TouchableOpacity
                            style={[styles.button]}
                            onPressIn={() => longChangeProperty3(property3, -10, 1000)}
                            onPressOut={() => stopLongChangeProperty3()}
                        >
                            <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            // onPress={() => changeProperty2(1)}
                            onPressIn={() => longChangeProperty3(property3, 10, 1000)}
                            onPressOut={() => stopLongChangeProperty3()}
                        >
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                );       
            case 4:
                return (
                <View key={propertyID} style={styles.block}>
                    <Text style={styles.property}>Status: {property4?"Open":"Closed"}</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={property4 ? "#1e90ff" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => {
                            var val = value.value_number = 1 - value.value_number
                            changeValue(userID, deviceID, 4, val)
                            setProperty4(!property4)
                        }}
                        value={property4}
                        style={{marginRight: 5}}
                        />
                </View>
                );
            case 5:
                return (
                <View key={propertyID} style={styles.block}>
                    <Text style={styles.property}>Elevation: {property5 + '%'}</Text>
                    
                    <View style={styles.buttonBlock}>
                        <TouchableOpacity
                            style={[styles.button]}
                            onPressIn={() => longChangeProperty5(property5, -10, 1000)}
                            onPressOut={() => stopLongChangeProperty5()}
                        >
                            <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            // onPress={() => changeProperty2(1)}
                            onPressIn={() => longChangeProperty5(property5, 10, 1000)}
                            onPressOut={() => stopLongChangeProperty5()}
                        >
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                );   
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.blockTitle}>
                <Text style={styles.title}>{device.device_name}</Text>
            </View>
            {device.value
            .sort((a, b) => a.value_property_id > b.value_property_id)
            .map((item) => renderProperty(item, device.device_id))}
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
    buttonBlock: {
        flexDirection: 'row'
    },
    button: {
        width: 40,
        height: 40,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        elevation: 2
    },
    title: {
        fontSize: 20,
        color: 'white'
    },
    property: {
        fontSize: 18
    },
    buttonText: {
        fontSize: 16
    }
});  

export default DeviceInfo;