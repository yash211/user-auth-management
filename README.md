# User Authentication Management System 🔐

A secure and scalable user authentication system built with TypeScript, Express, and MongoDB. This project implements JWT-based authentication with access and refresh tokens.

## 🚀 Features
- User Registration (Sign Up)
- User Authentication (Login)
- JWT-based Token Management
- Password Hashing using bcrypt
- User Deletion
- Environment Variable Configuration
- TypeScript Type Safety

## 🛠️ Technologies Used
- **TypeScript**: For type-safe code
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT implementation
- **dotenv**: Environment variable management

## 📦 Installation

1. Clone the repository
```bash
git clone https://github.com/yash211/user-auth-management.git
cd user-auth-management
```

2.Install dependencies
```bash
npm install
```

3.Create .env file with following variables
```bash
PORT=3000
MONGODB_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

## 🔍 API Endpoints

### 1. Sign Up
```http
POST /signup
Content-Type: application/json
```
#### Request Body:
```json
{
  "email": "user@example.com",
  "password": "userpassword"
}
```

### 2. Login
```http
POST /login
Content-Type: application/json
```
#### Request Body:
```json
{
  "email": "user@example.com",
  "password": "userpassword"
}
```

### 3. Delete User
```http
DELETE /user/:id
```

---

## 💡 Implementation Details

### Security Features
- **Password Hashing**: Passwords are hashed using `bcrypt` with salt rounds of 10.
- **JWT Tokens**: 
  - Access tokens expire after 120 seconds.
  - Separate refresh tokens are used for extended sessions.
- **Email Validation**: Ensures email uniqueness.
- **Error Handling**: Comprehensive handling of duplicate entries and other issues.

### Database Schema
```typescript
{
  email: { type: String, unique: true },
  password: String
}
```

---

## 🔒 Security Best Practices Implemented

1. **Password Hashing**
2. **JWT Token Expiration**
3. **Environment Variable Usage**
4. **Input Validation**
5. **Error Handling**
6. **Unique Email Constraints**

---

## 🧪 Error Handling

The API includes comprehensive error handling for:

- Duplicate email addresses
- Invalid credentials
- Server errors
- Database connection issues

## 👨‍💻 Author

Yash
