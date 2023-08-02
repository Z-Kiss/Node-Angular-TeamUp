# **Teamup**

## **Toughts on the project**

My idea was to create a place where you can find teammates for your games.
My goal with this project to learn Node.js, MongoDB and Angular.

# **Status**

Currently in the early developmnet phase. 
Backend has its basic functionality. Next step is the creating Frontend with Angular.

### **Built With**

#### ***Backend***
    -Node.Js
    -Typescript
    -MongoDB

### **Prerequisites**

To run as Developer mode:

    Node.js
    How to install: https://nodejs.org/en/download


### **Getting Started as Developer mode**

After cloneing the repository, you need to install the dependencies.

For install dependencies :

- Use this command from the _backend_ directory.
    ```
    npm install
    ```
    
For starting the Application simply run the _StartApplication.sh_

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

    
    - further implement Card Detailed information where you can write a more detailed description about the task
    - create a better system for showing Errors, such as:
        not logged in when User want to create Board
        password/email mismatch
        already existing Username, Email
        etc...
    - implement Rename Board, Column, Card
    - restrict Guest actions:
        restrict Guest to delete any board, and handle Guest Boards delete either by time or with different approach
        restrict Rename any component that not made by current logged in Guest
    - implement Search bar functionality:
        I think it will be usefull if you have more boards as a User or as Guest you can search in those already created
    - implement User page:
        where the User can create a personal profile page
    - further implement Admin role:
        be able to delete Users or content
   

