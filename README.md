# **Teamup**

## **Toughts on the project**

My idea was to create a place where you can find teammates for your games.
My goal with this project to learn Node.js, MongoDB and Angular.

# **Status**

Currently in the early developmnet phase. 
Backend has its basic functionality. Next step is the creating Frontend with Angular.

### **Built With**

#### ***Backend***
- Node.Js
- Typescript
- MongoDB

### **Prerequisites**

To run as Developer mode:

- Node.js
How to install: https://nodejs.org/en/download


### **Getting Started as Developer mode**

After cloneing the repository, you need to install the dependencies.

1. For install dependencies :

- Use this command from the _backend_ directory.
    ```
    npm install
    ```

    
2. Fill out _.env_ file with the connection URL of your MongoDB

    
3. For starting the Application simply run the _StartApplication.sh_

- Use this command from the _backend_ directory.
    ```
    npm run dev
    ```


### **Implemented Features**


#### **Secure User Interactions**
    
- Register, Login. Endpoints (except login, register) only accessible if you are logged in .

#### **Create GameRooms**

- You are able to create GameRooms where you later can add Tags. 

#### **Create Tags**

- Tags funcionality to distinct GameRooms by specific games and/or intreset of gamers

    
### **Future plans**

- Further improve backend:
    - Users will be able to joing GameRooms
    - Users will be able to search GameRooms by Tags
    - Give more authority to owner of the GameRoom (kick, ban members of the room)
- Chat functionality
- Angular Frontend
   

