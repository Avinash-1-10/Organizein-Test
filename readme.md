# MERN Form App

This project is a full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to create, view, and manage forms. The project is divided into two main folders: `client` and `server`.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- npm
- MongoDB

### Setting Up the Client

1. Navigate to the `client` directory:

   ```sh
   cd client
   ```

2. Create a .env file in the client directory and add the following variable Ex.
   ```sh
   VITE_BACKEND_URL=http://localhost:8000
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```
4. Run the client:
   ```sh
   npm run dev
   ```

### Setting Up the Server

1. Navigate to the `server` directory:

   ```sh
   cd server
   ```

2. Create a .env file in the server directory and add the following variable Ex:

   ```sh
   MONGO_URI=mongodb://localhost:27017/organizein
   PORT=8000
   JWT_SECRET=yoursecretkey
   CLIENT_URL=http://localhost:5173
   ```

3. Install the dependencies:

   ```sh
     npm install
   ```

4. Run the server:
   ```sh
   npm run dev
   ```

## Questions

### Use JWT for user authentication. Explain why JWT is suitable for this scenario.

JWT (JSON Web Token) is well-suited for user authentication in our project for several reasons:

- **Stateless**: JWTs do not require the server to store session information, which enhances scalability.
- **Compact**: They can be transmitted easily as URL parameters or HTTP headers, simplifying integration into web applications.
- **Secure**: JWTs are digitally signed using a secret key (`JWT_SECRET`), ensuring data integrity and authenticity.

### Describe how you would validate form inputs on both the frontend and backend.

#### Frontend Validation (Yup and Formik):

**Yup Schema Validation:**

- Used Yup to define validation schemas that specify the required fields and formats for form inputs.

**Formik Integration:**

- Used Formik to manage form state and integrate with Yup schemas for validation.

#### Backend Validation (Express and Mongoose):

**Mongoose Schema Validation:**

- Within Mongoose schemas, define validation rules to ensure data integrity.
- Specify fields as required or with specific formats (like strings or numbers) to enforce data validation at the database level.

### Differentiating Between Regular Users and Admin Users

To differentiate between regular users and admin users:

#### Backend Implementation:

**User Model:**

- **isAdmin Field:** Add a boolean field `isAdmin` to the user schema in MongoDB. This field is `true` for admin users and `false` for regular users.

**Admin Middleware:**

- **Definition:** Create middleware in the backend to check the `isAdmin` field when processing requests that require admin privileges.
- **Implementation:** Middleware intercepts requests and verifies if the user making the request has `isAdmin` set to `true`. If not, access to admin-only routes or actions is denied.

#### Frontend Considerations:

**User Interface:**

- **Visibility:** Design the user interface to display or hide admin-specific features based on the user's `isAdmin` status retrieved from the backend during authentication.
- **Access Control:** Ensure that only users identified as admins have access to and can perform actions designated for administrators.

### Managing State in React Application for User Authentication and Form Handling

#### User Authentication:

- **LocalStorage and Cookies:**
  - **LocalStorage:** Upon successful user login, store user information (like user details and authentication token) in the browser's localStorage. This allows persisting user authentication across browser sessions.
  - **Cookies:** Additionally, use HTTP cookies to store authentication tokens. Cookies provide more security as they are automatically sent with every HTTP request to the server, unlike localStorage which requires manual handling to include tokens in requests.

#### Form Handling:

- **State Management:**

  - Use React's local state (`useState` hook) to manage form inputs and their validation statuses.
  - Leverage libraries like Formik for enhanced form management. Formik simplifies form state management, validation, and submission handling, making it easier to work with complex forms.

- **Validation:**
  - **Frontend Validation:** Utilize libraries like Yup with Formik to perform client-side form validation. Yup allows defining validation schemas to validate form inputs before submission, providing immediate feedback to users on invalid inputs.
  - **Backend Validation:** Implement validation checks in the backend when receiving form data. This ensures data integrity and security by re-validating data against server-defined rules before processing.

### Connecting to MongoDB and Storing Data with Mongoose

#### Connecting to MongoDB:

- **Mongoose:** Establish a connection using `mongoose.connect()` with the MongoDB URI (`MONGO_URI`) stored in environment variables.
- **Error Handling:** Implement error handling for connection issues using `mongoose.connection.on('error', ...)`.

#### Storing User Data:

- **Schema Definition:** Define a Mongoose schema for users with fields like `name`, `email`, `password`, and `isAdmin`.
- **Model Creation:** Create a model (`User`) to interact with the `users` collection, using methods like `user.save()` for data persistence.

#### Storing Form Data:

- **Schema and Model:** Define a schema for forms with fields such as `title`, `description`, and `createdBy`.
- **CRUD Operations:** Use Mongoose methods (`Form.find()`, `Form.findOneAndUpdate()`) for CRUD operations on form data.

### Security Measures for User Data Protection and Application Reliability

#### 1. **Environment Variables:**

- **Usage:** Store sensitive information like database URIs, API keys, and secrets in environment variables (`dotenv` in Node.js).
- **Benefit:** Prevents sensitive data exposure in code repositories and enhances security during deployment.

#### 2. **Password Hashing:**

- **Implementation:** Hash user passwords using a strong hashing algorithm (e.g., bcrypt) before storing them in the database.
- **Benefit:** Protects passwords from unauthorized access, even if the database is compromised.

#### 3. **HTTPS Encryption:**

- **Usage:** Enable HTTPS on the server to encrypt data transmitted between clients and the server.

#### 4. **Input Validation:**

- **Frontend:** Validate form inputs using libraries like Yup with Formik to ensure data integrity and prevent injection attacks.
- **Backend:** Implement validation checks on incoming data to sanitize inputs and protect against malicious payloads.

#### 5. **Access Control and Authentication:**

- **User Roles:** Differentiate between regular users and administrators using roles or permissions (e.g., `isAdmin` flag).
- **Authorization Middleware:** Implement middleware to restrict access to sensitive routes based on user roles.

### Additional Features to Enhance Application Functionality

#### 1. **User Form Management:**

- **User Control:** Allow users to delete or edit their own forms after submission, providing flexibility and control over their data.

#### 2. **Password Security:**

- **Enhanced Hashing:** Implement more advanced password hashing techniques (e.g., bcrypt with salt) to further strengthen security.

#### 3. **Admin Privileges:**

- **Admin Actions:** Enable admins to delete any form across the platform, enhancing moderation and content management capabilities.


