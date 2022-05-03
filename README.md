## AlbumThing
A project for my CS2300 Databases class. This assists with the downloading of albums
off of YouTube music.

### Dependencies
* Yarn
* Java 11
* Docker and docker-compose (or install PostgreSQL via some other means)

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


