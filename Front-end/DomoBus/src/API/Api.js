// const base_url = "localhost:3000/"
export const url_base = "http://ec2-3-84-37-237.compute-1.amazonaws.com:3000/"
export const url_user = url_base + "person"
export const url_home = url_base + "home"
export const url_user_home = url_base + "home_person_role?select=home_id,home_name,person(person_id,person_name)"
export const url_property = url_base + "property"
export const url_type = url_base + "type"
export const url_division = url_base + "division?select=division_id,division_name"
export const url_device = url_base + "device?select=device_id,device_name,device_type_id,device_division_id,value(value_property_id,value_number)"

export async function fetchUsers() {
    return await fetch(url_user)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
}

export async function fetchHomes() {
    return await fetch(url_home)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
}

export async function fetchUsersInHome(home_id) {
    return await fetch(url_user_home + "&home_id=eq." + home_id)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
}

export async function fetchProperties() {
    return await fetch(url_property)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
}

export async function fetchTypes() {
    return await fetch(url_type)
    .then((response) => response.json())
    .catch((error) => {
        console.error(error);
    });
}

export async function fetchDivisionsInHome(home_id) {
    return await fetch(url_division + "&division_home_id=eq." + home_id)
    .then((response) => response.json())
    .catch((error) => {
        console.error(error);
    });
}

export async function fetchDevicesInHome(home_id) {
    return await fetch(url_device + "&device_home_id=eq." + home_id)
    .then((response) => response.json())
    .catch((error) => {
        console.error(error);
    });
}