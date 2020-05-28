// const base_url = "http://localhost:3000/"
export const url_base = "http://ec2-3-84-37-237.compute-1.amazonaws.com:3000/"
export const url_user = url_base + "person"
export const url_home = url_base + "home"
export const url_user_home = url_base + "home_person_role?select=home_id,home_name,person(person_id,person_name)"
export const url_user_division = url_base + "person_division_access"
export const url_property = url_base + "property"
export const url_type = url_base + "type"
export const url_division = url_base + "division?select=division_id,division_name"
export const url_device = url_base + "device?select=device_id,device_name,device_type_id,device_division_id,value(value_property_id,value_number)"
export const url_change_value = url_base + "rpc/change_value"
export const url_change_name = url_base + "rpc/change_name"

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiY2xpZW50In0.40smlCpB59nKfp1o-GCOf9CdjvKndkbOL4IEgu1xrxo"

export async function fetchUsers() {
    return await fetch(url_user, {
        headers: {
            'Authorization': 'Bearer ' + TOKEN
        }
    })
    .then((response) => response.json())
    .catch((error) => {
        console.error(error);
    });
}

export async function fetchHomes() {
    return await fetch(url_home, {
        headers: {
            'Authorization': 'Bearer ' + TOKEN
        }
    })
    .then((response) => response.json())
    .catch((error) => {
        console.error(error);
    });
}

export async function fetchUsersInHome(home_id) {
    return await fetch(url_user_home + "&home_id=eq." + home_id, {
        headers: {
            'Authorization': 'Bearer ' + TOKEN
        }
    })
    .then((response) => response.json())
    .catch((error) => {
        console.error(error);
    });
}

export async function fetchDivisionAccess(user_id) {
    return await fetch(url_user_division + "?person_id=eq." + user_id, {
        headers: {
            'Authorization': 'Bearer ' + TOKEN
        }
    })
    .then((response) => response.json())
    .catch((error) => {
        console.error(error);
    });
}

export async function fetchProperties() {
    return await fetch(url_property, {
        headers: {
            'Authorization': 'Bearer ' + TOKEN
        }
    })
    .then((response) => response.json())
    .catch((error) => {
        console.error(error);
    });
}

export async function fetchTypes() {
    return await fetch(url_type, {
        headers: {
            'Authorization': 'Bearer ' + TOKEN
        }
    })
    .then((response) => response.json())
    .catch((error) => {
        console.error(error);
    });
}

export async function fetchDivisionsInHome(home_id) {
    return await fetch(url_division + "&division_home_id=eq." + home_id, {
        headers: {
            'Authorization': 'Bearer ' + TOKEN
        }
    })
    .then((response) => response.json())
    .catch((error) => {
        console.error(error);
    });
}

export async function fetchDevicesInHome(home_id) {
    return await fetch(url_device + "&device_home_id=eq." + home_id, {
        headers: {
            'Authorization': 'Bearer ' + TOKEN
        }
    })
    .then((response) => response.json())
    .catch((error) => {
        console.error(error);
    });
}

export async function changeName(user_id, device_id, device_name) {
    var details = {
        'arg_person_id': user_id + '',
        'arg_device_id': device_id + '',
        'arg_device_name': device_name,
    };
    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return await fetch(url_change_name, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Authorization': 'Bearer ' + TOKEN,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
    })
    .then((response) => response.text())
    .then((response) => console.log(response))
    .catch((error) => {
        console.error(error);
    });
}

export async function changeValue(user_id, device_id, property_id, value_number) {
    var details = {
        'arg_person_id': user_id + '',
        'arg_device_id': device_id + '',
        'arg_property_id': property_id + '',
        'arg_value_number': value_number + ''
    };
    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return await fetch(url_change_value, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Authorization': 'Bearer ' + TOKEN,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
    })
    .then((response) => response.text())
    .then((response) => console.log(response))
    .catch((error) => {
        console.error(error);
    });
}