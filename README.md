## AlbumThing
A project for my CS2300 Databases class. This assists with the downloading of albums
off of YouTube music.

View [user manual](./user_manual.md).

### Tested Operating System
This has been tested on Ubuntu 20.04. It is not guaranteed to work on other systems.

### Dependencies
* Yarn
* Java 11
* Docker and docker-compose (or install PostgreSQL via some other means)

### Where is the `.sql` file??
It is [here](app/src/main/resources/schema.sql) and [here](app/src/main/resources/data.sql).
You DO NOT NEED to manually run these. Both will automatically be run each time the
application comes online, and are designed to work when ran multiple times.

### Running
In the future, running this should be automated more.

First, have npm and yarn installed on your system.
```shell
# Bring up the database
sudo docker-compose up -d

# Run the web application
./gradlew app:bootRun  # bootRun will automatically build the client module
# ALTERNATIVELY if you have already ran this before
./gradlew app:bootRun -x copyWebApp
```
Navigate to [here](http://localhost:8080)

### Running Database
This repository includes a `docker-compose.yml` file, which will run PostgreSQL.
You must have this running in order to use the application. In the future, the entire
application may be packaged within docker.


