import * as React from 'react';
import { View, Text } from 'react-native';


function HomeScreen() {

  // http://192.168.99.100:3000/property
  property = [
    {"property_id": 1, "property_name": "Ligado", "property_default_value": 0}, 
    {"property_id": 2, "property_name": "Temperatura", "property_default_value": 250}, 
    {"property_id": 3, "property_name": "Intensidade", "property_default_value": 100}, 
    {"property_id": 4, "property_name": "Aberto", "property_default_value": 0}, 
    {"property_id": 5, "property_name": "Elevação", "property_default_value": 0}]

  // http://192.168.99.100:3000/type
  types = [
    {"type_id": 1, "type_name": "Lâmpada"}, 
    {"type_id": 2, "type_name": "Termostato"}, 
    {"type_id": 3, "type_name": "Ar condicionado"}, 
    {"type_id": 4, "type_name": "Porta/portão"}, 
    {"type_id": 5, "type_name": "Estore"}, 
    {"type_id": 6, "type_name": "Eletrodoméstico genérico"}
  ]

  // http://192.168.99.100:3000/division?select=division_id,division_name&division_home_id=eq.1
  divisions = [
    {"division_id": 1, "division_name": "Cozinha"}, 
    {"division_id": 2, "division_name": "Quarto"}, 
    {"division_id": 3, "division_name": "Sala"}
  ]

  // http://192.168.99.100:3000/device?select=device_id,device_name,device_type_id,device_division_id,value(value_property_id,value_number)&device_home_id=eq.1
  devices = [
    {"device_id": 1, "device_name": "Candeeiro de pé", "device_type_id": 1, "device_division_id": 3,
      "value": [{"value_property_id": 1,"value_number": 0}, {"value_property_id": 3, "value_number": 100}]}, 
    {"device_id": 2, "device_name": "Portão da garagem", "device_type_id": 4, "device_division_id": null,
      "value": [{"value_property_id": 4,"value_number": 0}]}, 
    {"device_id": 3, "device_name": "Estore da janela", "device_type_id": 5, "device_division_id": 3,
      "value": [{"value_property_id": 5,"value_number": 0}]}]

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

export default HomeScreen;