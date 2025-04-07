# Chatter - Real-time Chat Application

Chatter is a fully responsive real-time chat application that enables users to communicate instantly with each other. It is built with a robust tech stack, including **React.js** and **Tailwind CSS** for the frontend, **Node.js** and **Express.js** for the backend, and **Socket.io** for real-time communication. It provides features like real-time messaging with image sharing capabilities in chats, online/offline user status, user authentication, and profile management.

## Technical Description 📃

- **Real-time Communication**: Implemented real-time messaging and live user status updates using ```Socket.IO```, enabling seamless bidirectional communication.

- **State Management**: Built efficient state management system using ```Zustand``` for optimized performance

- **Navigation**: Utilized ```React Router v6``` for client-side routing with dynamic routes for seamless navigation.

- **Responsive UI**: Designed fully responsive UI using ```Tailwind CSS``` following modern design principles

- **Authentication**: Implemented secure user authentication using ``` JWT and bcrypt.js ```with HTTP-only cookies for enhanced security measures

- **Database**: Designed and integrated ```MongoDB``` database schema using ```Mongoose``` ODM for efficient data modeling and relationships

- **API Endpoints**: Built RESTful API endpoints with ```Express.js``` following MVC architecture for clean code organization

- **File Upload**: Integrated ```Cloudinary cloud storage``` for media management, handling user profile pictures and message attachments

<div align="center">

|Frontend Technologies 🎨 |Backend Technologies 🛠|
|--------------------------|-----------------------|
| React.js  & React DOM | Node.js with Express.js |
| Tailwind CSS | MongoDB with Mongoose |
| Zustand for state management | JWT for authentication |
| Socket.IO Client | Socket.IO for real-time communication |
| Axios for HTTP requests | Bcrypt.js for password hashing |
| React Hot Toast for notifications | Cloudinary for image storage |
| React Router Dom for navigation | CORS for cross-origin resource sharing |

</div>

## Sample .env file in the backend directory:
```bash
MONGODB_URI=your_mongodb_connection_string

PORT=5001

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name 
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret 

NODE_ENV=development
```

## Contact 
👾 Bhaskar Jha (✉️ [@bhaxkar](mailto:bhaskarjha.info@gmail.com)  )