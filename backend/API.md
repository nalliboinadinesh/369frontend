# 369 Backend — API Reference

Base URL: `http://localhost:5000`

---

## Auth

### Register
**POST** `/api/auth/register`

**Request Body**
```json
{
  "name": "Test User",
  "email": "test@test.com",
  "password": "123456"
}
```

**Response** `201`
```json
{
  "success": true,
  "data": {
    "_id": "6a9d61343a0ab4489f6348cc",
    "name": "Test User",
    "email": "test@test.com",
    "token": "<jwt_token>"
  }
}
```

**Error Responses**
| Status | Message |
|--------|---------|
| 400 | Name is required |
| 400 | Email is required |
| 400 | Password is required |
| 409 | Email already in use |

---

### Login
**POST** `/api/auth/login`

**Request Body**
```json
{
  "email": "test@test.com",
  "password": "123456"
}
```

**Response** `200`
```json
{
  "success": true,
  "data": {
    "_id": "6a9d61343a0ab4489f6348cc",
    "name": "Test User",
    "email": "test@test.com",
    "token": "<jwt_token>"
  }
}
```

**Error Responses**
| Status | Message |
|--------|---------|
| 400 | Email and password are required |
| 401 | Invalid email or password |

---

## Notes

### Get All Notes
**GET** `/api/notes`

**Request Body** — none

**Response** `200`
```json
{
  "message": "Notes fetched successfully",
  "notes": [
    {
      "_id": "6a9d619e3a0ab4489f6348cd",
      "title": "My First Note",
      "content": "This is the content",
      "createdAt": "2026-09-06T12:50:38.038Z",
      "updatedAt": "2026-09-06T12:50:38.038Z",
      "__v": 0
    }
  ]
}
```

---

### Get Note by ID
**GET** `/api/notes/:id`

**Request Body** — none

**Response** `200`
```json
{
  "message": "Note fetched successfully",
  "note": {
    "_id": "6a9d619e3a0ab4489f6348cd",
    "title": "My First Note",
    "content": "This is the content",
    "createdAt": "2026-09-06T12:50:38.038Z",
    "updatedAt": "2026-09-06T12:50:38.038Z",
    "__v": 0
  }
}
```

**Error Responses**
| Status | Message |
|--------|---------|
| 404 | Note not found |
| 400 | Invalid ID format |

---

### Create Note
**POST** `/api/notes`

**Request Body**
```json
{
  "title": "My First Note",
  "content": "This is the content"
}
```

**Response** `201`
```json
{
  "message": "Note created successfully",
  "note": {
    "_id": "6a9d619e3a0ab4489f6348cd",
    "title": "My First Note",
    "content": "This is the content",
    "createdAt": "2026-09-06T12:50:38.038Z",
    "updatedAt": "2026-09-06T12:50:38.038Z",
    "__v": 0
  }
}
```

**Error Responses**
| Status | Message |
|--------|---------|
| 400 | Title and content are required |

---

### Update Note
**PUT** `/api/notes/:id`

**Request Body**
```json
{
  "title": "Updated Note",
  "content": "Updated content"
}
```

**Response** `200`
```json
{
  "message": "Note updated successfully",
  "note": {
    "_id": "6a9d619e3a0ab4489f6348cd",
    "title": "Updated Note",
    "content": "Updated content",
    "createdAt": "2026-09-06T12:50:38.038Z",
    "updatedAt": "2026-09-06T12:51:25.578Z",
    "__v": 0
  }
}
```

**Error Responses**
| Status | Message |
|--------|---------|
| 400 | Title and content are required |
| 404 | Note not found |
| 400 | Invalid ID format |

---

### Delete Note
**DELETE** `/api/notes/:id`

**Request Body** — none

**Response** `200`
```json
{
  "message": "Note deleted successfully"
}
```

**Error Responses**
| Status | Message |
|--------|---------|
| 404 | Note not found |
| 400 | Invalid ID format |
