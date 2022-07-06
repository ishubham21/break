# Break 

### Designed and Developed by Shubham Gautam
Developed using React, Node, and mongoDB, Break is an online-code-executor (sandbox environment) where users can not only run their code online, but also save it for later. 

Break currently supports all the major programming languages including C, C++, Java, Python, and JavaScript. 

## Workflow 


### JWT Workflow for Login and Registration 

<p><img src="https://github.com/ishubham21/break/blob/master/readme-assets/jwt-workflow.jpeg"></p>

## Features
- Break is an online-code-executor (sandbox environment) where users can not only run their code online but also save it for later. It currently supports all the major programming languages including C, C++, Java, Python, and JavaScript.
- Break makes use of React to facilitate the frontend of the application, Node & Express as the backend, and MongoDB as the database.
- Migrated the backend from a monolithic to a microservice-based architecture where each module is a completely different API working towards solving a particular problem.
- Indexed the database collections around userID, and codeID respectively for facilitating a faster query response.
- Implemented a JWT-based user-authentication system. 
- Have secured all the API routes using the same JWT-verification middleware.
- The frontend of the application is developed keeping in mind all the errors that can occur to prevent application from breaking at any point. 
- Implemented caching to enhance user-experience of the application.
- Converted the application into a Progressive Web App to make sure that it is downloadable on any Operating System.    
- The backend of this application is designed keeping in mind the MVC-architecture. 
## Technology Stack:
- **Frontend**: React, MaterialUI
- **Backend**: Node.js (+child processed), Express.js
- **User Authentication**: JSON-Web-Token
- **IDE**: VS Code
- **Design**: Adobe Photoshop, Canva
- **API Testing & Documentation**: Postman
- **Version Control**: Git and GitHub
- **Database**: MongoDB
- **Hosting**: Vercel

## Project Folder Structure
| S.No. | Folder Name | Purpose |
| --------------- | --------------- | --------------- |
| 1. | server | contains all backend code  |
| 2. | server/controllers | contains all backend controller code  |
| 3. | server/executors | contains all backend code-execution (+child processed) related code  |
| 4. | server/middlewares | contains all backend middlewares code  |
| 5. | server/model | contains all data models  |
| 6. | server/routes | contains all backend API routes code  |
| 7. | client | contains all frontend code (React)|
| 8. | readme.md | contains all documentation |
| 8. | LICENSE | contains the offical GNU General Public License issued towards this code |

## Images

1. **Login Screen** 

    <p><img src="https://github.com/ishubham21/break/blob/master/readme-assets/1.png"></p>

2. **Registration Screen**

    <p><img src="https://github.com/ishubham21/break/blob/master/readme-assets/2.png"></p>

3. **User Dashboard**

    <p><img src="https://github.com/ishubham21/break/blob/master/readme-assets/3.png"></p>

4. **Online IDE**

    <p><img src="https://github.com/ishubham21/break/blob/master/readme-assets/4.png"></p>

## Future extension - 
 
- Deleting the codes - The user will be able to delete his/her saved codes. 
- Deleting the account - The user will be able to dlete his/her user-account if he/she doesn't want to continue with Break.
- Adding support for more languages - We have covered almost all the major languages, but I want to extend it to support more languages like Rust, and Swift. 
- Using WebRTC and socket, I want to extend Break as an interviewing platform where users would be able to create interview rooms, connect over a video-based call, and share the live code with everyone present in the room.  
