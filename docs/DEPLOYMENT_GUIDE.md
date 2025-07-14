# Deployment Guide

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- MongoDB Atlas account
- Render account (for hosting)

## Environment Variables

Create `.env` files in both client and server directories:

### Server (.env)

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/biasaware
PORT=3001
NODE_ENV=production
```

### Client (.env)

```
REACT_APP_API_URL=https://your-backend-url.render.com
REACT_APP_ENV=production
```

## Local Development Setup

### 1. Clone Repository

```bash
git clone https://github.com/mpat247/biasaware.git
cd biasaware
```

### 2. Install Dependencies

```bash
# Backend dependencies
cd server
npm install

# Frontend dependencies
cd ../client
npm install
```

### 3. Start Development Servers

```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
cd client
npm start
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## Production Deployment on Render

### Backend Deployment

1. **Create New Web Service** on Render
2. **Connect GitHub Repository**
3. **Configure Build Settings:**

   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `node app.js`

4. **Set Environment Variables:**
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `NODE_ENV`: `production`

### Frontend Deployment

1. **Create New Static Site** on Render
2. **Connect GitHub Repository**
3. **Configure Build Settings:**

   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Publish Directory:** `build`

4. **Set Environment Variables:**
   - `REACT_APP_API_URL`: Your backend service URL

## MongoDB Atlas Setup

### 1. Create Cluster

- Sign up for MongoDB Atlas
- Create a new M0 (free) cluster
- Note your connection string

### 2. Database Configuration

- Create database: `biasaware`
- Collections will be created automatically
- Enable GridFS for image storage

### 3. Security Settings

- Add your application's IP to whitelist
- Create database user with read/write permissions

## Performance Optimization

### Backend Optimizations

- **GridFS Chunking:** Optimized for large image files
- **Connection Pooling:** MongoDB connection reuse
- **Compression:** Enable gzip compression for API responses

### Frontend Optimizations

- **Image Lazy Loading:** Load images as needed
- **Code Splitting:** Split React bundles by route
- **CDN Integration:** Serve static assets from CDN

## Monitoring and Logging

### Render Monitoring

- Built-in application metrics
- Log aggregation and search
- Automatic health checks

### Custom Logging

```javascript
// Add to server/app.js
const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});
```

## Troubleshooting

### Common Issues

**MongoDB Connection Failed**

- Verify connection string format
- Check IP whitelist settings
- Confirm database user permissions

**Images Not Loading**

- Verify GridFS setup in MongoDB
- Check CORS configuration
- Confirm image upload process

**Slow Page Load Times**

- Monitor MongoDB Atlas metrics
- Consider upgrading to M2 cluster
- Implement image optimization

### Debug Commands

```bash
# Check server logs
npm run logs

# Test database connection
npm run test:db

# Verify build process
npm run build:verbose
```

## Scaling Considerations

### Database Scaling

- Upgrade from M0 to M2 cluster for better performance
- Implement database indexing for faster queries
- Consider image CDN for static content

### Application Scaling

- Upgrade Render plan for higher traffic
- Implement Redis caching layer
- Add load balancing for multiple instances

## Security Best Practices

- Keep dependencies updated
- Use environment variables for secrets
- Implement request rate limiting
- Enable HTTPS (automatic on Render)
- Validate and sanitize user inputs
