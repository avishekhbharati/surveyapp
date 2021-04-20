## Getting Started

Firstly, please make sure node and npm are installed in your machine. If not, please download latest version of node and npm and install it. 

Once you download and unzip the project, use your favourite command line editor to change your current directory to the project's parent directory and restore all the packages using the following command:
```
npm install
```


After package restoration, run the following command:
```
npm run dev
```

the above command runs both mock api server and the react application.

Open http://localhost:3000 to view react application in the browser.

Mock server runs in http://localhost:9000.

To view the data retured by mock server. Try following command:
```
GET : http://localhost:9000/api/survey/list -- returns the list of surveys only
GET : http://localhost:9000/api/survey/1 -- returns details for survey with id 1
POST : http://localhost:9000/api/survey/submit -- for submitting survey data.
```

In case you want to change your API end point to actual API gateway, update the proxy value in package.json
```
  "proxy": "http://localhost:9000"
```
Once you change the proxy and it is pointing to the actual API. Please use following command to run the project. This command runs react app but not the mock server. Or feel free to update the scripts in package.json
```
npm start
```


### References:

Setting up a Local Mock API for your Front-end (React) Project: 
https://blog.harveydelaney.com/setting-up-a-mock-api-for-your-front-end-react-project/

Material UI for UI components: https://material-ui.com/