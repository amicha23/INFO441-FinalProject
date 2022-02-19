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
| P0 | Student | As a student, I want to find available apartments in the same area of my college. | When accessing apartments from the database, add filters to the SQL query based on user input of the targeted area to show available listings stored in our database. |
| P0   | Student | As a student, I want to live walking distance from campus and filter out apartments without parking space or internet. | When accessing apartments from the database, add filters to the SQL query based on user input instead of filtering in the server or client. |
|P1|Student|As a student, I want to be able to quickly view the amenities and floor plans of an apartment.| Create a GET endpoint that returns apartment information from the database to the client for each apartment. |
| P2 | User| As a user, I want to be able to create an account to save my listings | Implement sessions to control access to separate accounts by userId. Create a POST request that returns profile information on login. Create another POST request that responds with a signal that the user has logged out of their account. |


## Endpoints

- POST /user/{id}/username
  - An endpoint for users to login to their account. Once a user is logged on, the server responds with access to their profile.

```
{
  "id": 1,
  "username": "{username}",
  "saved": [{apt name}, {apt name}...],
}
```

-  POST /user/login
  - Creates a new session for the user. Responds with a message to the user notifying that they have successfully logged in to their account.


- POST /user/logout
  - Destroys the session for the user. Responds with a message to the user notifying that they have successfully logged out of their account.


- GET /apt/{id}?param1={filter1}&param2={filter2}&...
  -   The GET request uses the parameters given by the user and responds by accessing data from the database and returns apartment data to the user that is exclusive to the filters given in the parameters.

```
[
  {
  	“listingName”: String,
  	“ApartmentLocation”: String,
  	“ApartmentPrice”: [int],
  	“NumberofBedrooms”: [int],
  	“NumberofBathrooms”: [int]
  }
]
```
