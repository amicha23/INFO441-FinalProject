## User Stories
| Priority      | User | Description      | Technical Implementation |
| ----------- | ----------- | ----------- | ----------- |
| P0 | Student | As a student, I want to find available apartments in the same area of my college. | When accessing apartments from the database, add filters to the SQL query based on user input of the targeted area to show available listings stored in our database. |
| P0 | Student | As a student, I want to find available apartments in the same area of my college. | When accessing apartments from the database, add filters to a SQL query based on user input of the targeted area to show available listings stored in our database. |
| P0   | Student | As a student, I want to live walking distance from campus and filter out apartments without parking space or internet. | When accessing apartments from the database, add filters to the SQL query based on user input instead of filtering in the server or client. |
|P0| Dev | As a developer, we want to find apartment data for our users. | Hardcode a small amount of apartment data into a JSON file while we are still testing the functionality of our application. Look to find a dataset with more apartment data later on. |
|P1|Student|As a student, I want to be able to quickly view the amenities and floor plans of an apartment.| Create a GET endpoint that returns apartment information from the database to the client for each apartment. |
@@ -37,7 +37,7 @@ We as students want to build this application because we understand the process
**Users**

- GET /user/{id}/username
  - An endpoint for users to retrieve  their account information. Once a user is logged on, the server responds with access to their profile.
  - An endpoint for users to retrieve their account information. Once a user is logged on, the server responds with access to their profile.

```
{
@@ -53,7 +53,7 @@ We as students want to build this application because we understand the process
**Apartments**

- GET /apt/{id}?param1={filter1}&param2={filter2}&...
  -   The GET request uses the parameters given by the user and responds by accessing data from the database and returns an array of apartment data to the user that is exclusive to the filters given in the parameters.
  -   The GET request uses the parameters given by the user and responds by accessing data from the database, returning an array of apartment data to the user that is exclusive to the filters given in the parameters.


## Database Schema
@@ -70,10 +70,12 @@ Apartments
}
```

users
Users

```
"userId": Primary Key,
"username": String,
"saved": Object
{
  "userId": Primary Key,
  "username": String,
  "saved": Array
}

## Endpoints

**Authentication**
-  /signin

- /signin
  - Creates a new session for the user. Responds with a message to the user notifying that they have successfully logged in to their account.


- /signout
  - Destroys the session for the user. Responds with a message to the user notifying that they have successfully logged out of their account.


- /error
  - Respond to login and server-side errors.