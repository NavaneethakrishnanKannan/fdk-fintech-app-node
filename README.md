# Project Title
Customer Support Application

## About The App
Enhanced Fintech Support Management App is designed to empower support staff by providing them with a comprehensive tool to efficiently resolve customer queries and issues.

# Environment vars
This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|CORS           | Cors accepted values            | "*"      |
|PORT           |Need to specify the Port            |       |
|DBURL           | Database connection string            |       |
|TWILIO_ACCOUNT_SID           | Twillio Account SID             |       |
|TWILIO_PHONE           | Provided by Twillio            |       |


# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version > 18
- Install MongoDB

# Getting started
- Clone the repository
```
git clone  https://github.com/NavaneethakrishnanKannan/fdk-fintech-app-node.git
```
- Install dependencies
```
cd fdk-fintech-app-node
npm install
```
- Run the project
```
node server.js
```