### Notes for myself
Contains notes for myself, random queries, and other things only god and I know what they do.

```graphql
mutation {
  addArtist(youtubeId:"UCoo3R3_6QAn0cXTkgaM-QKQ", name:"Avantasia")
}
mutation {
  addAlbum(youtubePlaylistId:"OLAK5uy_nuXNx79eBlQq08UscFaVpgt08fv9pETQw", artistYoutubeId:"UCoo3R3_6QAn0cXTkgaM-QKQ", name: "The Metal Opera Pt. I", releaseYear:2001)
}
mutation {
  addAlbum(youtubePlaylistId:"OLAK5uy_mWU2IdEqxZvdcWpND1gvdmd4B9NlO-Pp0", artistYoutubeId:"UCoo3R3_6QAn0cXTkgaM-QKQ", name: "Moonglow", releaseYear:2019)
}
```

---

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
