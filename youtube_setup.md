### YouTube Setup
This project has the ability to use YouTube's API. Because we are using the official API
and not some spoofed user-agent library, we need an OAuth token from https://console.developers.google.com.

You need to enable: https://console.cloud.google.com/marketplace/product/google/youtube.googleapis.com
AlbumThing accesses public data, so you need to create a service account, then go to "keys" then 
generate a JSON key.

In the `app/` directory, create a file called `client_secret.json` and paste your JSON key in. It should look similar to this:

```json
{
  "type": "service_account",
  "project_id": "albumthing",
  "private_key_id": "redacted",
  "private_key": "-----BEGIN PRIVATE KEY-----\nredacted\n-----END PRIVATE KEY-----\n",
  "client_email": "albumthing@albumthing.iam.gserviceaccount.com",
  "client_id": "redacted",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/albumthing%40albumthing.iam.gserviceaccount.com"
}
```
