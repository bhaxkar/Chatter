# Chatter - Real-time Chat Application

Chatter is a modern real-time chat application that enables users to communicate instantly with each other. Built with a robust tech stack including React for the frontend and Node.js for the backend, it provides features like real-time messaging, user authentication, profile management with avatar upload and update, and image sharing capabilities in chats, Online/offline user status.

## Technical Description 📃

- **Real-time Communication**: Developed full-stack real-time chat application using React, Tailwind CSS, Node.js/Express.js with Socket.IO, enabling instant messaging and live user status updates

- **State Management**: Built efficient state management system using Zustand for optimized performance

- **Navigation**: Utilized React Router v6 for client-side routing with dynamic routes for seamless navigation.

- **Responsive UI**: Designed responsive UI using TailwindCSS following modern design principles

- **Authentication**: Implemented secure user authentication using JWT and bcrypt with HTTP-only cookies for enhanced security measures

- **Database**: Designed and integrated MongoDB database schema using Mongoose ODM for efficient data modeling and relationships

- **API Endpoints**: Built RESTful API endpoints with Express.js following MVC architecture for clean code organization

- **File Upload**: Integrated Cloudinary cloud storage for media management, handling user profile pictures and message attachments


|Frontend Technologies 🎨 |Backend Technologies 🛠|
|--------------------------|-----------------------|
| React.js & React Router Dom | Node.js with Express.js |
| Tailwind CSS | MongoDB with Mongoose |
| Zustand for state management | JWT for authentication |
| Socket.IO Client | Socket.IO for real-time communication |
| Axios for HTTP requests | Bcrypt.js for password hashing |
| React Hot Toast for notifications | Cloudinary for image storage |
| Lucide React for icons | CORS for cross-origin resource sharing |


## Setup and Installation 💻

### Backend Setup

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Navigate to the backend directory:
```bash
cd Chatter/backend
```

3. Install dependencies:
```bash
npm install
```

4. Create a .env file in the backend directory with the following variables:
```bash
MONGODB_URI=your_mongodb_connection_string
PORT=8000
JWT_SECRET=your_jwt_secret
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

5. Start the backend server
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash 
cd ../frontend
```
2. Install dependencies:
```bash 
npm install
```
3. Start the frontend development server:
```bash 
npm run dev
```

The application should now be running at http://localhost:5173

## Contact 
👾 Bhaskar Jha (✉️ [@bhaxkar](mailto:bhaskarjha.info@gmail.com)  )