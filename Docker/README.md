# DOMOBUS MOBILE INTERFACE - BACK-END
Ambient Intelligence 2019/2020 - G11

## Instructions (Windows):

1. Install Docker Desktop from https://www.docker.com/products/docker-desktop.
2. Open Docker Desktop, go to Resources -> File Sharing and activate sharing with local drive.
3. Open PowerShell/cmd on project folder and execute `docker-compose up`.
4. Stop system with `docker-compose down` when finished.

## Instructions (Ubuntu):

1. Open terminal on project directory.
2. Install Docker following [this tutorial](https://docs.docker.com/engine/install/ubuntu/).
3. Execute `docker-compose up`.
4. Stop system with `docker-compose down` when finished.

## Clean persistent data

In case of changes to the database schema, use `docker-compose down --volumes` to delete persistent data.

## Testing API

1. Open browser and try http://localhost:3000/property to check all properties in DB.

More functions to be developed
