# General API Notes

### REST API

The server expects data, and will return data, in the JSON format. This means that for most of the API calls made to the server, the server is expecting all incoming data, parameters, etc in the form of JSON (there is 1 exception). Hopefully this is convenient as it standardizes the communication protocol. When constructing an HTTP header be sure to include: `Content-Type: application/json`  as this specifies to the server that the associated form is a JSON file and should be parsed accordingly. 

# Endroutes

```
POST  - /auth/register
POST  - /auth/login

GET   - /api/professors
GET   - /api/courses
GET   - /api/course
GET   - /api/backworks
GET   - /api/backwork
POST  - /api/upload
```

## `POST - /auth/register`


#### Expected Form Data
```json
{"email":"<EMAIL>", "password":"<PASSWORD>", "firstname": "<NAME>", "lastname": "<NAME>"}
```

#### Example Form Data
```json
{"email":"kulindu@rpi.edu", "password":"password", "firstname":"Kulindu", "lastname":"Cooray"}
```

#### Description

This endroute will attempt to save a user into the database. This operation will not succeed if the email is not in the correct format (verified through regex) or if the database operation did not succeed (for instance if the email is already registered). Both of the fields are required or the operation will fail.

#### Return Data
```json
{
   "user":{
      "ID":7,
      "CreatedAt":"2023-07-25T11:31:10.984221222-04:00",
      "UpdatedAt":"2023-07-25T11:31:10.984221222-04:00",
      "DeletedAt":null,
      "email":"mandrn@rpi.edu",
      "firstname":"Niels",
      "lastname":"Mandrus"
   }
}

```



## `POST - /auth/login`

#### Expected Form Data
```json
{"email":"<EMAIL>", "password":"<PASSWORD>"}
```

#### Example Form Data
```json
{"email":"kulindu@rpi.edu", "password":"password"}
```

#### Description

This endroute will attempt to have a user "login". This operation will not succeed if the email is not in the database or if the password is incorrect. Both fields are required or the operation will fail. 

#### Return Data
```json
{"jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlYXQiOjE2OTAyNDM2MjQsImlhdCI6MTY5MDI0MDAyNCwiaWQiOjV9.O1jbLxHakHMiJtpn7o6JzNMI1Jwg9ZhnX3q9_yX006w"}
```

If the user successfully logs in, the server will send back a JSON Web Token (JWT). This token is **REQUIRED** to make any further requests to the server. This token expires after 1 hour and must be included in the HTTP header. This token is the user's key to the rest of our app. 



## `GET - /api/professors`

####  Authentication 

This endroute requires that users possess a valid `JWT`. You include that in the Authorization HTTP Header as follows: 
```
Authorization: Bearer <JWT>
```

#### Expected Form Data
```json
{"dept":"<DEPARTMENT>"}
```

#### Example Form Data
```json
{"dept":"CSCI"}
```

#### Description

This endroute will grab every Professor from our database in a specific department. The `dept` field is required or the operation will fail. 

#### Response Data
```json
{
   "professors":[
      {
         "ID":1,
         "CreatedAt":"2023-07-22T21:31:41.115597-04:00",
         "UpdatedAt":"2023-07-22T21:31:41.115597-04:00",
         "DeletedAt":null,
         "name":"Sibel Adali",
         "dept":"CSCI"
      },
      {
         "ID":2,
         "CreatedAt":"2023-07-22T21:31:41.275629-04:00",
         "UpdatedAt":"2023-07-22T21:31:41.275629-04:00",
         "DeletedAt":null,
         "name":"Elliot Anshelevich",
         "dept":"CSCI"
      },
      {
         "ID":3,
         "CreatedAt":"2023-07-22T21:31:41.394134-04:00",
         "UpdatedAt":"2023-07-22T21:31:41.394134-04:00",
         "DeletedAt":null,
         "name":"Barbara Cutler",
         "dept":"CSCI"
      },
      // ... this continues for a while
      {
         "ID":36,
         "CreatedAt":"2023-07-22T21:31:45.700991-04:00",
         "UpdatedAt":"2023-07-22T21:31:45.700991-04:00",
         "DeletedAt":null,
         "name":"Tomek Strzalkowski",
         "dept":"CSCI"
      },
      {
         "ID":37,
         "CreatedAt":"2023-07-22T21:31:45.835929-04:00",
         "UpdatedAt":"2023-07-22T21:31:45.835929-04:00",
         "DeletedAt":null,
         "name":"",
         "dept":"CSCI"
      }
   ]
}
```

The `ID` field is essentially a key for that specific `Professor` object in the database. While there is no endroute to get a specific professor, this pattern of using an object's `ID` to retrieve its data from the server is used elsewhere. 



## `GET - /api/courses`

####  Authentication 

This endroute requires that users possess a valid `JWT`. You include that in the Authorization HTTP Header as follows: 
```
Authorization: Bearer <JWT>
```

#### Expected Form Data
```json
{"dept":"<DEPARTMENT>"}
```

#### Example Form Data
```json
{"dept":"CSCI"}
```

#### Description

This endroute will grab every Course from our database in a specific department. The `dept` field is required or the operation will fail. This operation can also fail if the course doesn't exist or if 

#### Return Data
```json
{
   "courses":[
      {
         "ID":1,
         "CreatedAt":"2023-07-24T11:24:37.681598-04:00",
         "UpdatedAt":"2023-07-24T11:24:37.681598-04:00",
         "DeletedAt":null,
         "courseId":1100,
         "dept":"CSCI"
      },
      {
         "ID":2,
         "CreatedAt":"2023-07-24T11:24:37.744259-04:00",
         "UpdatedAt":"2023-07-24T11:24:37.744259-04:00",
         "DeletedAt":null,
         "courseId":1200,
         "dept":"CSCI"
      },
      {
         "ID":3,
         "CreatedAt":"2023-07-24T11:24:37.790536-04:00",
         "UpdatedAt":"2023-07-24T11:24:37.790536-04:00",
         "DeletedAt":null,
         "courseId":2200,
         "dept":"CSCI"
      },
      // ... long list
      {
         "ID":53,
         "CreatedAt":"2023-07-24T11:24:41.379789-04:00",
         "UpdatedAt":"2023-07-24T11:24:41.379789-04:00",
         "DeletedAt":null,
         "courseId":6990,
         "dept":"CSCI"
      },
      {
         "ID":54,
         "CreatedAt":"2023-07-24T11:24:41.42596-04:00",
         "UpdatedAt":"2023-07-24T11:24:41.42596-04:00",
         "DeletedAt":null,
         "courseId":9990,
         "dept":"CSCI"
      }
   ]
}
```

The `ID` field is a key for that specific `Course` object in the database. 

## `GET - /api/course`

####  Authentication 

This endroute requires that users possess a valid `JWT`. You include that in the Authorization HTTP Header as follows: 
```
Authorization: Bearer <JWT>
```

#### Expected Form Data
```json
{"dept":"<DEPARTMENT>", "courseId": <COURSE-NUMBER>}
```

#### Example Form Data
```json
{"dept":"CSCI", "courseId": 1100}
```

#### Description

This endroute will grab the specified course from our database and all the data we have on it. 

#### Response Data
```json
{
   "course":{
      "ID":1,
      "CreatedAt":"2023-07-24T11:24:37.681598-04:00",
      "UpdatedAt":"2023-07-24T11:24:37.681598-04:00",
      "DeletedAt":null,
      "courseId":1100,
      "dept":"CSCI",
      "backworks":[
           // array of Backwork objects 
      ]
	}
}
```

This response will return an array of all the `Backwork` objects associated with a particular course (if they exist). 


## `GET - /api/backworks`

####  Authentication 

This endroute requires that users possess a valid `JWT`. You include that in the Authorization HTTP Header as follows: 
```
Authorization: Bearer <JWT>
```

#### Expected Form Data
```json
{
	// The only required field
	"courseid":<COURSE-DB-ID>, 
	"professorid": <COURSE-NUMBER>, 
	"verified": bool
}
```

#### Example Form Data
```json
{"courseid":1, "professorid":2, "verified": false}
// Equivalent --- Gets all the backwork for a course from professor 2
{"courseid":1, "professorid":2}
```

```json
// this will grab the backwork for a course from every 
// professor, and coursework that is verified and unverified
{"courseid":1}
```

```json
// Get all verified backwork for a course
{"courseid":1, "verified":true}
```

#### Description

This endroute will grab the specified course from our database and all the data we have on it. 

#### Response Data
```json
// querying every backwork in CSCI 1100 (courseId 1 in our DB)
{
   "backworks":[
      {
         "ID":3,
         "CreatedAt":"2023-07-24T17:14:04.254065-04:00",
         "UpdatedAt":"2023-07-24T17:14:04.254065-04:00",
         "DeletedAt":null,
         "uuid":"8d9aa27a-2e31-4aab-9880-207ed9357195",
         "fileName":"homework",
         "url":"https://jgutowxfdatknocihrak.supabase.co/storage/v1/object/public/Backwork/8d9aa27a-2e31-4aab-9880-207ed9357195",
         "courseId":1,
         "professorId":1,
         "verified":false,
         "userId":4
      },
      {
         "ID":4,
         "CreatedAt":"2023-07-24T18:11:20.151235-04:00",
         "UpdatedAt":"2023-07-24T18:11:20.151235-04:00",
         "DeletedAt":null,
         "uuid":"c33e734b-fd55-4ea1-a3d5-7a86b8866db1",
         "fileName":"hw3.pdf",
         "url":"https://jgutowxfdatknocihrak.supabase.co/storage/v1/object/public/Backwork/c33e734b-fd55-4ea1-a3d5-7a86b8866db1",
         "courseId":1,
         "professorId":1,
         "verified":false,
         "userId":4
      },
      {
         "ID":5,
         "CreatedAt":"2023-07-24T18:11:46.240264-04:00",
         "UpdatedAt":"2023-07-24T18:11:46.240264-04:00",
         "DeletedAt":null,
         "uuid":"e823d36c-b0ad-49da-93be-171ce07f0f15",
         "fileName":"lab2.pdf",
         "url":"https://jgutowxfdatknocihrak.supabase.co/storage/v1/object/public/Backwork/e823d36c-b0ad-49da-93be-171ce07f0f15",
         "courseId":1,
         "professorId":1,
         "verified":false,
         "userId":4
      },
      {
         "ID":7,
         "CreatedAt":"2023-07-24T18:14:30.08124-04:00",
         "UpdatedAt":"2023-07-24T18:14:30.08124-04:00",
         "DeletedAt":null,
         "uuid":"9e36ea39-1552-48f7-bd08-d8dc7ffb4e22",
         "fileName":"hw4.pdf",
         "url":"https://jgutowxfdatknocihrak.supabase.co/storage/v1/object/public/Backwork/9e36ea39-1552-48f7-bd08-d8dc7ffb4e22",
         "courseId":1,
         "professorId":2,
         "verified":true,
         "userId":4
      }
   ]
}
```

This response will return an array of all the `Backwork` objects associated with a particular course (if they exist). 

The fields here are important 
- `uuid` - A unique identifier corresponding to  the file's name in our storage
- `fileName` - The name of the file uploaded by the user
- `url` - this is the download link
- `courseId` - the Database ID of the course this backwork is associated with
- `professorId` - the Database ID of the professor this backwork is associated with
- `verified` - the verification status of this backwork
- `userId` - the Database ID of the user who uploaded it

## `GET - /api/backwork`

####  Authentication 

This endroute requires that users possess a valid `JWT`. You include that in the Authorization HTTP Header as follows: 
```
Authorization: Bearer <JWT>
```

#### Expected Form Data
```json
{
	// The only required field
	"id":<BACKWORK-DB-ID>, 
}
```

#### Example Form Data
```json
{"id":1}
```

#### Description

This endroute will grab the specified backwork from our database and all the data we have on it. 

#### Response Data
```json
{
   "backwork":{
      "ID":3,
      "CreatedAt":"2023-07-24T17:14:04.254065-04:00",
      "UpdatedAt":"2023-07-24T17:14:04.254065-04:00",
      "DeletedAt":null,
      "uuid":"8d9aa27a-2e31-4aab-9880-207ed9357195",
      "fileName":"homework",
      "url":"https://jgutowxfdatknocihrak.supabase.co/storage/v1/object/public/Backwork/8d9aa27a-2e31-4aab-9880-207ed9357195",
      "courseId":1,
      "professorId":1,
      "verified":false,
      "userId":4
   }
}
```

This response will return a  `Backwork` object associated with a particular DB ID (if it exists). 

The fields here are important 
- `uuid` - A unique identifier corresponding to  the file's name in our storage
- `fileName` - The name of the file uploaded by the user
- `url` - this is the download link
- `courseId` - the Database ID of the course this backwork is associated with
- `professorId` - the Database ID of the professor this backwork is associated with
- `verified` - the verification status of this backwork
- `userId` - the Database ID of the user who uploaded it


## `POST - api/upload`

####  Authentication 

This endroute requires that users possess a valid `JWT`. You include that in the Authorization HTTP Header as follows: 
```
Authorization: Bearer <JWT>
```

#### `Content-Type`
The http request must specify the `Content-Type` Header as 
```
Content-Type: multipart/form-data 
```

This transfers the file across HTTP to the server. The reason that we can't send the parameters for this endroute as JSON is that we cant have multiple data encodings in a single request without more work than we should be doing.

This is the only endroute that doesn't expect JSON as the form data. Instead data about the uploaded file is passed in through **required** url query parameters.

#### Parameters
- `filename` - the name of the file being uploaded
- `courseid` - the **DATABASE ID** of the course this file is being uploaded to
- `professorid` - the **DATABASE ID** of the professor this file is associated with

#### Example Requests
`http://localhost:8000/api/upload?filename=hw2.pdf&courseid=1&professorid=2`
- `filename` - hw2.pdf
- `courseid` - 1
- `professorid` - 2

#### Response Data
```json
{
   "backwork":{
      "ID":8,
      "CreatedAt":"2023-07-24T20:32:09.634934584-04:00",
      "UpdatedAt":"2023-07-24T20:32:09.634934584-04:00",
      "DeletedAt":null,
      "uuid":"779979ac-6087-4c38-9dcf-3521cccb7be7",
      "fileName":"lecture-exercise1.pdf",
      "url":"https://jgutowxfdatknocihrak.supabase.co/storage/v1/object/public/Backwork/779979ac-6087-4c38-9dcf-3521cccb7be7",
      "courseId":1,
      "professorId":3,
      "verified":false,
      "userId":4
   }
}
```

The response data is still a JSON that encodes a `Backwork` object. 
