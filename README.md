# Project Name: Chicken Farm

### Running the Project

To install the packages, use the following commands:

-   Development Mode: `npm install`

To run the project, use the following commands:

-   Development Mode: `npm run dev`

    -   This will run the project on port 5000.

-   Production Mode: `npm run start`
    -   This will run the project in production mode.

## API Endpoints

### USER MODULE

#### User Registration as Farmer

-   **Endpoint:** `/api/v1/user/signup`
-   **Method:** `POST`

##### Request Body

```json
{
    "role": "farmer",
    "email": "farmer@email.com",
    "password": "1234",
    "confirmPassword": "1234"
}
```

##### Expected Response

```json
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1......",
    "data": {
        "_id": "65c9e4b2e1ae6d327be262c9",
        "email": "farmer@email.com",
        "role": "farmer",
        "agent": "65c9e42db3cb283683dd5687",
        "password": "$2a$10$ovBAqXUu....",
        "createdAt": "2024-02-12T09:28:18.703Z",
        "updatedAt": "2024-02-12T09:28:18.703Z",
        "__v": 0
    }
}
```

#### User Registration as Farmer

-   **Endpoint:** `/api/v1/user/signup`
-   **Method:** `POST`

##### Request Body

```json
{
    "role": "agent",
    "email": "agent@email.com",
    "password": "1234",
    "confirmPassword": "1234"
}
```

##### Expected Response

```json
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1......",
    "data": {
        "_id": "65c9e4b2e1ae6d327be262c9",
        "email": "agent@email.com",
        "role": "agent",
        "agent": "65c9e42db3cb283683dd5687",
        "password": "$2a$10$ovBAqXUu....",
        "createdAt": "2024-02-12T09:28:18.703Z",
        "updatedAt": "2024-02-12T09:28:18.703Z",
        "__v": 0
    }
}
```

#### User Login

-   **Endpoint:** `/api/v1/user/signin`
-   **Method:** `POST`

##### Request Body

```json
{
    "email": "agent@email.com",
    "password": "1234"
}
```

##### Expected Response

```json
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1......",
    "data": {
        "_id": "65c9e4b2e1ae6d327be262c9",
        "email": "agent@email.com",
        "role": "agent",
        "agent": "65c9e42db3cb283683dd5687",
        "password": "$2a$10$ovBAqXUu....",
        "createdAt": "2024-02-12T09:28:18.703Z",
        "updatedAt": "2024-02-12T09:28:18.703Z",
        "__v": 0
    }
}
```

#### Get My User

-   **Endpoint:** `/api/v1/user/me`
-   **Method:** `GET`
-   **Authorization:** `Bearer token.....`

##### Expected Response

```json
{
    "status": "success",
    "data": {
        "_id": "65c9e42db3cb283683dd5687",
        "email": "aswin@email.com",
        "role": "agent",
        "createdAt": "2024-02-12T09:26:05.921Z",
        "updatedAt": "2024-02-12T09:26:05.921Z",
        "__v": 0
    }
}
```

### FARMER MODULE

#### Create farm of Farmer

-   **Endpoint:** `/api/v1/farmer/farm/create`
-   **Method:** `POST`
-   **Authorization:** `Bearer token.....`

##### Request Body

```json
{
    "area": "10 acre"
}
```

##### Expected Response

```json
{
    "status": "success",
    "data": {
        "area": "10 acre",
        "farmer": "65c9e4b2e1ae6d327be262c9",
        "_id": "65d08e489e63917ebaec8a13",
        "createdAt": "2024-02-17T10:45:28.472Z",
        "updatedAt": "2024-02-17T10:45:28.472Z",
        "__v": 0
    }
}
```

#### Create Record of farm

-   **Endpoint:** `/api/v1/farmer/farm/create`
-   **Method:** `POST`
-   **Authorization:** `Bearer token.....`

##### Request Body

```json
{
    "importDate": "2024/02/16",
    "exportDate": "2024/02/29",
    "totalChicks": 95,
    "removedChick": 5,
    "foodStock": "Chick Food",
    "medicineOne": "Medicine 1",
    "medicineTwo": ""
}
```

##### Expected Response

```json
{
    "status": "success",
    "data": {
        "importDate": "2024-02-15T18:30:00.000Z",
        "exportDate": "2024-02-28T18:30:00.000Z",
        "totalChicks": 95,
        "removedChick": 5,
        "foodStock": "Chick Food",
        "medicineOne": "Medicine 1",
        "medicineTwo": "",
        "isAcknowledged": false,
        "farmer": {
            "_id": "65c9e4b2e1ae6d327be262c9",
            "email": "aswinfarmer@email.com",
            "role": "farmer",
            "agent": "65c9e42db3cb283683dd5687",
            "createdAt": "2024-02-12T09:28:18.703Z",
            "updatedAt": "2024-02-12T09:28:18.703Z",
            "__v": 0
        },
        "farm": {
            "_id": "65cf3f238f4711888ce40418",
            "area": "8 acre",
            "farmer": "65c9e4b2e1ae6d327be262c9",
            "createdAt": "2024-02-16T10:55:31.513Z",
            "updatedAt": "2024-02-17T10:12:32.449Z",
            "__v": 0
        },
        "_id": "65d0bad2fdbb377f13153aaa",
        "createdAt": "2024-02-17T13:55:30.742Z",
        "updatedAt": "2024-02-17T13:55:30.742Z",
        "__v": 0
    }
}
```

#### Get Record of farm

-   **Endpoint:** `/api/v1/farmer/reports/:farmid`
-   **Method:** `GET`
-   **Authorization:** `Bearer token.....`

##### Expected Response

```json
{
    "status": "success",
    "data": [
        {
            "_id": "65cf4a953adb1491398a6c71",
            "importDate": "2024-02-15T18:30:00.000Z",
            "exportDate": "2024-02-28T18:30:00.000Z",
            "totalChicks": 100,
            "removedChick": 0,
            "foodStock": "Chick Food",
            "medicineOne": "Medicine 1",
            "medicineTwo": "",
            "isAcknowledged": false,
            "farmer": {
                "_id": "65c9e4b2e1ae6d327be262c9",
                "email": "aswinfarmer@email.com"
            },
            "farm": {
                "_id": "65cf3f238f4711888ce40418",
                "area": "8 acre"
            },
            "createdAt": "2024-02-16T11:44:21.439Z"
        },
        {....... }
    ]
}
```

#### Get List of farms

-   **Endpoint:** `/api/v1/farmer/farms`
-   **Method:** `GET`
-   **Authorization:** `Bearer token.....`

##### Expected Response

```json
{
    "status": "success",
    "data": [
        {
            "_id": "65cf3f238f4711888ce40418",
            "area": "8 acre"
        },
        {
            "_id": "65cf3f238f4711888ce40417",
            "area": "9 acre"
        },
        {
            "_id": "65d08e489e63917ebaec8a13",
            "area": "10 acre"
        }
    ]
}
```

#### Get List of farms

-   **Endpoint:** `/api/v1/farmer/transaction`
-   **Method:** `GET`
-   **Authorization:** `Bearer token.....`

##### Expected Response

```json
{
    "status": "success",
    "data": [
        {
            "_id": "65d088b472be736f87c16d3c",
            "amount": 150,
            "farm": {
                "_id": "65cf3f238f4711888ce40418",
                "area": "8 acre"
            },
            "isAcknowledged": true,
            "isComplete": true,
            "createdAt": "2024-02-17T10:21:40.199Z",
            "updatedAt": "2024-02-17T10:21:40.199Z"
        }
    ]
}
```

#### Update farm Data

-   **Endpoint:** `/api/v1/farmer/farm/:farmid`
-   **Method:** `PATCH`
-   **Authorization:** `Bearer token.....`

##### Request Body

```json
{
    "area": "8 acre"
}
```

##### Expected Response

```json
{
    "status": "success",
    "data": {
        "_id": "65cf3f238f4711888ce40418",
        "area": "8 acre",
        "farmer": "65c9e4b2e1ae6d327be262c9",
        "createdAt": "2024-02-16T10:55:31.513Z",
        "updatedAt": "2024-02-17T14:02:32.239Z",
        "__v": 0
    }
}
```

### AGENT MODULE

#### Create Transaction with farmer for farmer

-   **Endpoint:** `/api/v1/agent/trade/create`
-   **Method:** `POST`
-   **Authorization:** `Bearer token.....`

##### Request Body

```json
{
    "amount": 150,
    "farmer": "65c9e4b2e1ae6d327be262c9",
    "farm": "65cf3f238f4711888ce40418",
    "isAcknowledged": true,
    "isComplete": true
}
```

##### Expected Response

```json
{
    "status": "success",
    "message": "Transaction created successfully!",
    "data": {
        "amount": 150,
        "agent": "65c9e42db3cb283683dd5687",
        "farmer": "65c9e4b2e1ae6d327be262c9",
        "farm": "65cf3f238f4711888ce40418",
        "isAcknowledged": true,
        "isComplete": true,
        "_id": "65d0bd5afdbb377f13153aba",
        "createdAt": "2024-02-17T14:06:18.516Z",
        "updatedAt": "2024-02-17T14:06:18.516Z",
        "__v": 0
    }
}
```

#### Acknowledge Report of farmer

-   **Endpoint:** `/api/v1/agent/report/:reportid`
-   **Method:** `PATCH`
-   **Authorization:** `Bearer token.....`

##### Expected Response

```json
{
    "status": "success",
    "data": {
        "_id": "65d08c1a9e63917ebaec8a09",
        "importDate": "2024-02-15T18:30:00.000Z",
        "exportDate": "2024-02-28T18:30:00.000Z",
        "totalChicks": 95,
        "removedChick": 5,
        "foodStock": "Chick Food",
        "medicineOne": "Medicine 1",
        "medicineTwo": "",
        "isAcknowledged": true,
        "farmer": "65c9e4b2e1ae6d327be262c9",
        "farm": "65cf3f238f4711888ce40418",
        "createdAt": "2024-02-17T10:36:10.247Z",
        "updatedAt": "2024-02-17T14:07:26.725Z",
        "__v": 0
    }
}
```

#### Get Todays report of farmer

-   **Endpoint:** `/api/v1/agent/report/today/:farmerid`
-   **Method:** `GET`
-   **Authorization:** `Bearer token.....`

##### Expected Response

```json
{
    "status": "success",
    "data": {
        "_id": "65d08c1a9e63917ebaec8a09",
        "importDate": "2024-02-15T18:30:00.000Z",
        "exportDate": "2024-02-28T18:30:00.000Z",
        "totalChicks": 95,
        "removedChick": 5,
        "foodStock": "Chick Food",
        "medicineOne": "Medicine 1",
        "medicineTwo": "",
        "isAcknowledged": true,
        "farmer": "65c9e4b2e1ae6d327be262c9",
        "farm": "65cf3f238f4711888ce40418",
        "createdAt": "2024-02-17T10:36:10.247Z",
        "updatedAt": "2024-02-17T14:07:26.725Z",
        "__v": 0
    }
}
```