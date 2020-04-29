# DOMOBUS MOBILE INTERFACE - BACK-END
Ambient Intelligence 2019/2020 - G11

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

Insertion is still restricted. (TODO)
