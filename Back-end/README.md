# DOMOBUS MOBILE INTERFACE - BACK-END
Ambient Intelligence 2019/2020 - G11

## Functionalities:

1. Database\
    Home, Person, Role, Division, Type, Property, Device, Value and different permission tables \
    Populated with sample values \
    Custom functions for permission checking \
    Custom functions for Device name and value updates

2. API\
    Endpoints for selecting all tables \
    Endpoints for update functions

3. Authentication\
    Custom roles for authenticated and unautenthicated accesses \
    JWT authentication required for all endpoints

## Instructions to run Docker containers (Windows):

1. Install Docker Desktop from https://www.docker.com/products/docker-desktop.
2. Open Docker Desktop, go to Resources -> File Sharing and activate sharing with local drive.
3. Open PowerShell/cmd on project folder and execute `docker-compose up`.
4. Stop system with `docker-compose down` when finished.

## Instructions to run Docker containers (Ubuntu):

1. Open terminal on project directory.
2. Install Docker following [this tutorial](https://docs.docker.com/engine/install/ubuntu/).
3. Execute `docker-compose up`.
4. Stop system with `docker-compose down` when finished.

### Clean persistent data

In case of changes to the database schema, use `docker-compose down --volumes` to delete persistent data.

## Testing API:

Examples of avaliable API links:
* http://localhost:3000/home - check all houses in the system.
* http://localhost:3000/division?division_home_id=eq.1 - check divisions of home 1.
* http://localhost:3000/device?device_home_id=eq.1 - check devices in home 1.
* http://localhost:3000/device?division_home_id=eq.1 - check devices in division 1.
* http://localhost:3000/value?value_device_id=eq.1 - check values of device 1.

### Change value

Example function call to change lamp "ON" status from OFF (0) to ON (1).
```
curl --location --request POST 'localhost:3000/rpc/change_value' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiY2xpZW50In0.40smlCpB59nKfp1o-GCOf9CdjvKndkbOL4IEgu1xrxo' \
--data-urlencode 'arg_person_id=1' \
--data-urlencode 'arg_device_id=1' \
--data-urlencode 'arg_property_id=1' \
--data-urlencode 'arg_value_number=1'
```
TIP: use Postman to manipulate requests.
