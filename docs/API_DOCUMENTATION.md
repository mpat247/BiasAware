# API Documentation

## Base URL

- **Development**: `http://localhost:3001`
- **Production**: `https://biasaware-backend.render.com`

## Authentication

Currently, the API does not require authentication for read operations.

## Endpoints

### Images

#### GET `/api/images`

Retrieve all images from the database.

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "image_id",
      "filename": "image_name.jpg",
      "prompt": "A cyclist",
      "bias_name": "Activities",
      "age_bias": "Adult",
      "gender_bias": "Male",
      "race_bias": "White",
      "description": "Generated image description"
    }
  ]
}
```

#### GET `/api/images/:category`

Retrieve images filtered by bias category.

**Parameters:**

- `category` (string): Bias category name (e.g., "Activities", "Professions")

#### GET `/api/images/file/:id`

Retrieve image file by GridFS ID.

**Parameters:**

- `id` (string): GridFS file ID

**Response:** Binary image data

### Statistics

#### GET `/api/statistics/:category`

Get statistical breakdown for a specific bias category.

**Response:**

```json
{
  "category": "Activities",
  "total_images": 150,
  "demographics": {
    "gender": {
      "Male": 65,
      "Female": 35
    },
    "race": {
      "White": 70,
      "Black": 15,
      "Asian": 10,
      "Other": 5
    },
    "age": {
      "Adult": 83,
      "Child": 12,
      "Senior": 5
    }
  }
}
```

### Health Check

#### GET `/api/health`

Check API status.

**Response:**

```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "database": "Connected"
}
```

## Error Handling

The API returns standard HTTP status codes:

- `200`: Success
- `404`: Resource not found
- `500`: Internal server error

Error responses include:

```json
{
  "success": false,
  "error": "Error description",
  "code": "ERROR_CODE"
}
```

## Rate Limiting

Currently, no rate limiting is implemented. For production deployment, consider implementing rate limiting based on IP address.

## Data Models

### Image Schema

```javascript
{
  filename: String,
  prompt: String,
  bias_name: String,
  age_bias: String,
  gender_bias: String,
  race_bias: String,
  description: String,
  uploadDate: Date,
  contentType: String,
  length: Number
}
```

### Usage Examples

#### Fetch all activities images

```javascript
fetch("/api/images/Activities")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

#### Get image statistics

```javascript
fetch("/api/statistics/Professions")
  .then((response) => response.json())
  .then((stats) => {
    console.log(`Total images: ${stats.total_images}`);
    console.log(`Gender distribution:`, stats.demographics.gender);
  });
```
