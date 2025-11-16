# MERN Stack Blog Application

A fully functional blog application built with the MERN (MongoDB, Express.js, React, Node.js) stack. This application demonstrates complete CRUD operations for blog posts and categories, with search and filter functionality.

## 🚀 Features

### Core Features
- ✅ **Complete CRUD Operations** for Posts and Categories
- ✅ **MongoDB + Mongoose** for database management
- ✅ **Express.js REST API** with proper middleware
- ✅ **React Frontend** with Vite, Tailwind CSS, and React Router
- ✅ **Input Validation** using Joi on the backend
- ✅ **Error Handling** with global error middleware
- ✅ **Search & Filter** functionality (Advanced Feature)
- ✅ **Responsive Design** with Tailwind CSS
- ✅ **Context API** for state management
- ✅ **Custom Hooks** for API calls

### Advanced Features
- 📸 **Image Upload**: Upload images directly from your device or use image URLs
- 🔍 **Search & Filter**: Search posts by title/content and filter by category
- 📱 **Responsive UI**: Mobile-friendly design
- ⚡ **Optimistic UI Updates**: Immediate feedback on user actions
- 🎨 **Modern UI**: Clean and intuitive interface

## 📁 Project Structure

```
mern-blog/
├── server/                 # Backend (Node.js + Express)
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── controllers/
│   │   ├── postController.js
│   │   └── categoryController.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   ├── upload.js
│   │   └── validation.js
│   ├── models/
│   │   ├── Post.js
│   │   └── Category.js
│   ├── routes/
│   │   ├── postRoutes.js
│   │   └── categoryRoutes.js
│   ├── uploads/              # Directory for uploaded images
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── client/                 # Frontend (React + Vite)
    ├── src/
    │   ├── api/
    │   │   ├── posts.js
    │   │   └── categories.js
    │   ├── components/
    │   │   ├── CategorySelect.jsx
    │   │   ├── Layout.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── PostCard.jsx
    │   │   └── SearchBar.jsx
    │   ├── context/
    │   │   └── PostsContext.jsx
    │   ├── hooks/
    │   │   └── useApi.js
    │   ├── pages/
    │   │   ├── Categories.jsx
    │   │   ├── CreatePost.jsx
    │   │   ├── EditPost.jsx
    │   │   ├── Home.jsx
    │   │   └── PostDetail.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── .env.example
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    └── vite.config.js
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone <your-repo-url>
cd mern-blog
```

### Step 2: Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update the `.env` file with your MongoDB connection string:
```env
MONGO_URI=mongodb://localhost:27017/mern-blog
PORT=5000
JWT_SECRET=your-secret-key-here
```

**For MongoDB Atlas**, use:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-blog?retryWrites=true&w=majority
```

5. Start the server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Step 3: Frontend Setup

1. Open a new terminal and navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update the `.env` file (if needed):
```env
VITE_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

The client will run on `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Posts Endpoints

#### Get All Posts
```http
GET /api/posts
```

**Query Parameters:**
- `search` (optional): Search term for title/content
- `category` (optional): Filter by category ID

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [...]
}
```

#### Get Single Post
```http
GET /api/posts/:id
```

#### Create Post
```http
POST /api/posts
Content-Type: application/json

{
  "title": "Post Title",
  "content": "Post content...",
  "category": "category_id",
  "featuredImage": "https://example.com/image.jpg"
}
```

#### Update Post
```http
PUT /api/posts/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content...",
  "category": "category_id",
  "featuredImage": "https://example.com/image.jpg"
}
```

#### Delete Post
```http
DELETE /api/posts/:id
```

### Categories Endpoints

#### Get All Categories
```http
GET /api/categories
```

#### Create Category
```http
POST /api/categories
Content-Type: application/json

{
  "name": "Category Name"
}
```

## 🎯 Usage Guide

### Creating a Post
1. Navigate to "New Post" from the navigation bar
2. Fill in the title, select a category, add content
3. Optionally add a featured image:
   - **Upload File**: Choose "Upload File" and select an image from your device
   - **Use URL**: Choose "Use URL" and paste an image URL
4. Click "Create Post"

### Editing a Post
1. Open any post from the home page
2. Click "Edit Post"
3. Make your changes
4. Click "Update Post"

### Searching Posts
1. Use the search bar on the home page
2. Type keywords to search in post titles and content
3. Results update in real-time

### Filtering by Category
1. Select a category from the dropdown on the home page
2. Posts are filtered automatically
3. Click "Clear Filters" to reset

### Managing Categories
1. Navigate to "Categories" from the navigation bar
2. Create new categories using the form
3. View all existing categories

## 🧪 Testing the Application

1. **Start MongoDB**: Ensure MongoDB is running locally or use MongoDB Atlas
2. **Start Backend**: `cd server && npm run dev`
3. **Start Frontend**: `cd client && npm run dev`
4. **Open Browser**: Navigate to `http://localhost:3000`

## 🛡️ Validation Rules

### Post Validation
- Title: Required, max 200 characters
- Content: Required
- Category: Required (must be valid category ID)
- Featured Image: Optional - can be uploaded file (max 5MB, images only) or URL

### Category Validation
- Name: Required, max 50 characters, must be unique

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables in your hosting platform
2. Update `MONGO_URI` to your production MongoDB connection
3. Deploy the server directory

### Frontend Deployment (Vercel/Netlify)
1. Update `VITE_API_URL` to your production API URL
2. Build the project: `npm run build`
3. Deploy the `dist` folder

## 📝 Technologies Used

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **Joi**: Input validation
- **Multer**: File upload handling
- **dotenv**: Environment variables
- **cors**: Cross-origin resource sharing

### Frontend
- **React**: UI library
- **Vite**: Build tool
- **React Router**: Routing
- **Tailwind CSS**: Styling
- **Axios**: HTTP client
- **Context API**: State management
- **date-fns**: Date formatting

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod` or check MongoDB Atlas connection string
- Verify the `MONGO_URI` in `.env` is correct

### Port Already in Use
- Change the `PORT` in server `.env` file
- Update `VITE_API_URL` in client `.env` if needed

### CORS Errors
- Ensure backend CORS is configured correctly
- Check that API URL matches in frontend `.env`

## 📄 License

This project is created for educational purposes as part of the MERN Stack Development course.

## 📤 GitHub Classroom Submission

### Preparing for Submission

1. **Ensure all files are committed:**
   ```bash
   git add .
   git commit -m "Complete MERN Stack Blog Application - Week 4 Assignment"
   ```

2. **Push to your repository:**
   ```bash
   git push origin main
   ```

3. **Verify your submission includes:**
   - ✅ Complete server code with all routes, controllers, models, middleware
   - ✅ Complete client code with all components, pages, hooks, context
   - ✅ Image upload functionality
   - ✅ README.md with full documentation
   - ✅ .env.example files (server and client)
   - ✅ All dependencies listed in package.json files

4. **Important Files Checklist:**
   - [ ] `server/server.js` - Main server file
   - [ ] `server/models/Post.js` - Post model
   - [ ] `server/models/Category.js` - Category model
   - [ ] `server/controllers/postController.js` - Post CRUD operations
   - [ ] `server/controllers/categoryController.js` - Category operations
   - [ ] `server/routes/postRoutes.js` - Post routes
   - [ ] `server/routes/categoryRoutes.js` - Category routes
   - [ ] `server/middleware/validation.js` - Input validation
   - [ ] `server/middleware/upload.js` - File upload handling
   - [ ] `server/middleware/errorHandler.js` - Error handling
   - [ ] `client/src/App.jsx` - Main React app
   - [ ] `client/src/pages/` - All page components
   - [ ] `client/src/components/` - All reusable components
   - [ ] `client/src/context/PostsContext.jsx` - State management
   - [ ] `client/src/api/posts.js` - API integration
   - [ ] `client/src/api/categories.js` - Categories API
   - [ ] `README.md` - Complete documentation

## 👨‍💻 Author

Created as Week 4 Assignment - MERN Stack Blog Application

---

**Happy Coding! 🎉**

