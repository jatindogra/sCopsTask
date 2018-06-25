
# SocialCops - Task

**Node.js - Express - Mocha - ES6 - Swagger- Docker**

---
**Prerequisites**
Your development environment will require:
- Node.js
- npm

Please make sure you have node version 8 or above to support ES6 syntax.

**Dependencies**
- body-parser
- express
- jimp
- json-patch
- jsonwebtoken
- swagger
- swagger-ui-express
- underscore"
- uuid
- winston

**devDependencies**
- babel-cli
- babel-plugin-istanbul
- babel-preset-es2015
- chai
- chai-http
- eslint
- eslint-config-airbnb-base
- eslint-plugin-import
- istanbul
- mocha

**Getting Started**

Run npm install, to install all the packages and dependencies.
```
    ../taskSocialCops > npm install
```
Run npm lint, to look out for linting errors.
```
    ../taskSocialCops > npm lint
```
Run npm start, to start the app. App will be served at port: 3001.
```
    ../taskSocialCops > npm start
```
Run npm test, to run the test cases along with code coverage reports.
```
    ../taskSocialCops > npm test
```

**API Endpoints**

There are three API's as mentioned below. You can hit api endpoints at http://localhost:3001
- ***POST /auth***
    This api generates an `accessToken` to authenticate other api endpoints.
    Request body is an object, that contains two parameters `username` and `password`. Both the parameters are required.
    ```
    {
        "username": "jatindogra"
        "password": "mypasskey"
    }
    ```
    Response will be a json object, that contains `accessToken`
    ```
    {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6I"
    }
    ```
- ***POST /jsonPatch***
    This api applies a patch operations on the json object.
    Request body is an object, that contains two parameters `json` and `patch`. Both the parameters are required.
    ```
    {
        	"json": {
        	  "baz": "qux",
        	  "foo": "bar"
        	},
        	"patch": [
        	  { "op": "replace", "path": "/baz", "value": "boo" },
        	  { "op": "add", "path": "/hello", "value": ["world"] },
        	  { "op": "remove", "path": "/foo"}
        	]
    }
    ```
    Response will be an json object, with operations applied on json object.
    ```
    {
        "result": {
          "baz": "boo",
          "hello": [
            "world"
          ]
        }
    }
    ```
- ***POST /resize***
    This api takes image url as input and resizes the image to 50x50
    Request body is an object, that contains one parameter `imageUrl`. Parameter is required.
    ```
    "imageUrl": "https://i.ytimg.com/vi/YjqDhCGaR4g/maxresdefault.jpg"
    ```
    Response will be an image, with size 50x50
    ```
    image thumbnail
    ```
 **Swagger Api Docs**
 
 Swagger api docs are running at http://localhost:3001/api-docs. Swagger api docs can be use to view and execute apis.
 
 **Dockerization**
 
 The docker image for the project is present at jatindogra/scopstask.
 
 You can pull the docker image with: `docker pull jatindogra/scopstask`
 
 Running the docker image: `docker run jatindogra/scopstask`
