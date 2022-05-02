-- This file will run once after schema.sql is ran

DO
'
DECLARE
BEGIN
    IF (NOT EXISTS (SELECT * FROM settings))
    THEN
        INSERT INTO download_location (file_path, display_name) VALUES(''/opt/albumthing-media/'', ''Pre-generated Location'');
        INSERT INTO settings (default_download_location) VALUES(''/opt/albumthing-media/'');
    END IF;
END;
'  LANGUAGE PLPGSQL;
