# CRUD Car Marketplace Demo (ISTE444-2245 Group 9)

## Group Members
- Clyde	Geyer cag1831@rit.edu
- Ethan Logue eml8469@rit.edu
- Alex Leute acl2809@rit.edu
- Christian	Berko ceb1810@rit.edu
  
## Features
- Create, Read, Update, and Delete (Purchase) GUI actions, with REST API for each function
- Basic (demo-level, non-hashed) user authentication
- Per user car ownership/index
- Custom logging to file

## Stack
- SQLite
- React
- Express
- Node.js


## Project Setup
After cloning the repo and opening a CMD at the root of the project:
1. Run `npm i`
2. Install node nodules for application: `npm run install`
3. Depending on your environment (hosted or development) you will want to change the two relevant URL lines in `frontend/src/utils/apiRequest.js`, as well as `backend/server.js`
4. Run `npm run start`

This will start the frontend and backend services concurrently.
