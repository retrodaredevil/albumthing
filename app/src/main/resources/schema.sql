-- This file is configured by Spring to run the first time to populate the database
-- more info here: https://www.baeldung.com/spring-boot-data-sql-and-schema-sql
-- Remember that we are not using JPA stuff, and are sticking with the simpler JDBC stuff


-- TODO 128 is random. I don't know the max length of youtube IDs
CREATE TABLE IF NOT EXISTS artist(
    youtube_id VARCHAR(128) PRIMARY KEY,
    name VARCHAR(80) NOT NULL
);

CREATE TABLE IF NOT EXISTS album(
    youtube_playlist_id VARCHAR(128) PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    release_year INT NOT NULL,
    artist_youtube_id VARCHAR(128) REFERENCES artist(youtube_id)
);

CREATE TABLE IF NOT EXISTS song_override(
    number INT NOT NULL,
    youtube_playlist_id VARCHAR(128) REFERENCES album(youtube_playlist_id) NOT NULL,
    youtube_song_id VARCHAR(128),
    PRIMARY KEY (number, youtube_playlist_id)
);

CREATE TABLE IF NOT EXISTS download_location(
    file_path VARCHAR PRIMARY KEY,
    display_name VARCHAR(80) NOT NULL
);

CREATE TABLE IF NOT EXISTS settings(
    id INT DEFAULT 0 PRIMARY KEY,
    default_download_location VARCHAR REFERENCES download_location(file_path) NOT NULL
);

-- timestamp type docs: https://www.postgresql.org/docs/9.1/datatype-datetime.html
CREATE TABLE IF NOT EXISTS download_record(
    start_time TIMESTAMP NOT NULL,
    youtube_playlist_id VARCHAR(128) REFERENCES album(youtube_playlist_id) NOT NULL,
    end_time TIMESTAMP DEFAULT NULL,
    background_process_id INT NOT NULL,
    download_location_file_path VARCHAR REFERENCES download_location(file_path),
    download_location_subpath VARCHAR NOT NULL
);
-- ALTER TABLE download_record ADD download_location_file_path VARCHAR REFERENCES download_location(file_path);
