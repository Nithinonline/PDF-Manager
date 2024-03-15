

# PDF-Manager(Full Stack Developer Task)


PDF-Manager is a web application featuring an authentication system with password encryption implemented using bcrypt. It allows users to securely create an account, log in, and manage their PDF documents. The front end is developed using React, while the back end is done using Node.js and Express.js, with MongoDB handling database management. Additionally, the application leverages the react-pdf and pdf-lib libraries for PDF-related functionalities.

## Features

- **Authentication**: Users can create accounts with secure password encryption using bcrypt.
- **User Home**: Upon logging in, users have access to a dashboard where they can manage their PDF documents.
-  **Extract Pages**: Users have the option to extract pages from existing PDF documents by selecting the required pages and clicking the extract button.
- **Download PDFs**: Users can download their PDF documents.
- **PDF Management**: Users can upload PDF documents, view their uploaded documents, and perform various actions on them.

## Steps to run the code 

1. Clone the repository using the following command in the terminal:
    ```
    git clone https://github.com/Nithinonline/PDF-Manager.git
    ```

2. Navigate to the PDF-Manager directory:
    ```
    cd PDF-Manager
    ```
   
3. Navigate to the server directory:
    ```
    cd server
    ```

4. Install dependencies for the server:
    ```
    npm install
    ```


6. Open another terminal window and navigate to the client directory:
    ```
    cd client
    ```

7. Install dependencies for the client side:
    ```
    npm install
    ```

8. Start the backend server:
    ```
    npm start
    ```

9. Run the frontend:
    ```
    npm run dev
    ```

10. Once both server and client are running, click the provided link.