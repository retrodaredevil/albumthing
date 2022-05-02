## AlbumThing
A project for my CS2300 Databases class. This assists with the downloading of albums
off of YouTube music.


### Running
In the future, running this should be automated more.

First, have npm and yarn installed on your system.
```shell
cd client
yarn install
cd ..
./gradlew app:bootRun  # bootRun will automatically build the client module
# or to not repeatedly copy the web app
./gradlew app:bootRun -x copyWebApp
```
Navigate to [here](http://localhost:8080)

### Running Database
This repository includes a `docker-compose.yml` file, which will run PostgreSQL.
You must have this running in order to use the application. In the future, the entire
application may be packaged within docker.


### Testing database with Python
Although this application is written in Python, I find it useful to use Python for small database edits or queries.

```shell
python3 -m pip install psycopg2-binary  # https://pypi.org/project/psycopg2/
```

```python
import psycopg2

params = {
    "dbname": "default_database",
    "user": "username",
    "password": "password",
    "host": "localhost",
    "port": 5432
}

# Connect to your postgres DB
conn = psycopg2.connect(**params)

# Open a cursor to perform database operations
cur = conn.cursor()

# Execute a query
cur.execute("SELECT * FROM my_data")

# Retrieve query results
records = cur.fetchall()

# Commit query changes
conn.commit()

# Rollback changes (required upon exception)
conn.rollback()
```

Notes for myself
* Kotlin JPA also uses additional Dto class https://blog.codecentric.de/en/2017/06/kotlin-spring-working-jpa-data-classes/
