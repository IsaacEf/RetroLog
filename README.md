# RetroLog

## Team: 
Niels Mandrus, Kulindu Cooray, Isaac Efrosman, Michael Meng, Colin Langella

## Zip File

Right-click on the RetroLog zip file and press unzip to retrieve the RetroLog folder
Open a command line terminal and change the directory to the unzipped folder


## Frontend Setup

Install the latest Node.js version

`https://nodejs.org/en`

Then install the latest version of npm by opening a command line terminal and entering

`$ npm install -g npm`

Check the version and ensure it matches

`$ node -v
 $ npm -v`

Now navigate to `RetroLog/frontend/src`  on the terminal and run 

`$ npm run build`

This will create the build folder and now the backend has to be run

## Backend Setup

Download the most recent version of Golang
Be sure to install the proper installer for your architecture

`https://go.dev/dl/`

To start the webserver navigate to the `RetroLog/backend/` folder in a terminal and run 

`$ go run main.go`

## Backend API

Our backend implements a REST API which has been documented [here](https://github.com/IsaacEf/RetroLog/blob/main/docs/backend-api.md)

## Website

The website will run on port 8000 so navigate to `localhost:8000` on any browser and the website will be visible.
