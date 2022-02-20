# INFO441 Final Project

## Project Description

Our target audience is UW students who are looking for on-campus housing or another location but within walking distance. We envision many students using this application to obtain suitable housing that includes considerations like safety, accessibility, amenities, decent spacing, and more.

Our application is targeted at a specific group of consumers (students), and unlike bigger apartment finding sites, we will include factors that college students care about. For example, including a way to find amenities such as high-speed internet, dedicated parking spots, and surrounding location hot spots.

We as students want to build this application because we understand the process of finding suitable housing and the struggles of finding an apartment that fits our specific needs.

## Architectural Diagram

![Architectural Diagram](imgs/diagram.PNG)

## User Stories
| Priority      | User | Description      | Technical Implementation |
| ----------- | ----------- | ----------- | ----------- |
| P0 | Student | As a student, I want to find available apartments in the same area of my college. | When accessing apartments from the database, add filters to a SQL query based on user input of the targeted area to show available listings stored in our database. |
| P0   | Student | As a student, I want to live walking distance from campus and filter out apartments without parking space or internet. | When accessing apartments from the database, add filters to the SQL query based on user input instead of filtering in the server or client. |
|P0| Dev | As a developer, we want to find apartment data for our users. | Hardcode a small amount of apartment data into a JSON file while we are still testing the functionality of our application. Look to find a dataset with more apartment data later on. |
|P1|Student|As a student, I want to be able to quickly view the amenities and floor plans of an apartment.| Create a GET endpoint that returns apartment information from the database to the client for each apartment. |
| P2 | User| As a user, I want to be able to create an account to save my listings |  Create a GET request that returns profile information on log in. Implement sessions that signal to the user that they have logged in and out of their account. |


## Endpoints

**Authentication**

- /signin
  - Creates a new session for the user. Responds with a message to the user notifying that they have successfully logged in to their account.


- /signout
  - Destroys the session for the user. Responds with a message to the user notifying that they have successfully logged out of their account.


- /error
  - Respond to login and server-side errors.

**Users**

- GET /user/{id}/username
  - An endpoint for users to retrieve their account information. Once a user is logged on, the server responds with access to their profile.

```
{
  "id": 1,
  "username": "{username}",
  "saved": [{apt name}, {apt name}...],
}
```

- POST /user/apartment
  - An endpoint for users to update their saved list of apartments.

**Apartments**

- GET /apt/{id}?param1={filter1}&param2={filter2}&...
  -   The GET request uses the parameters given by the user and responds by accessing data from the database, returning an array of apartment data to the user that is exclusive to the filters given in the parameters.


## Database Schema

Apartments
```
{
  "apartmentId": Primary Key
  “listingName”: String,
  “ApartmentLocation”: String,
  “ApartmentPrice”: int,
  “NumberofBedrooms”: int,
  “NumberofBathrooms”: int
}
```

Users

```
{
  "userId": Primary Key,
  "username": String,
  "saved": Array
}
```
