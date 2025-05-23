
# 🧠 Discovery Engine — Instinctive Studio MERN Project

A powerful discovery engine built using the MERN stack. This project supports dynamic search with full-text capabilities, faceted filtering, and category-based schema-driven listings.

---

## 🚀 Getting Started

Follow the steps below to set up and run the project locally.

### 1. 📦 Install Dependencies

Install all required packages:

```bash
npm install
```

---

### 2. 🛠️ Configure Environment Variables

Create a `.env` file in the root directory and add your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<your-db>?retryWrites=true&w=majority
```

---

### 3. 🌱 Seed the Database

To populate the database with initial categories and listings for testing:

```bash
npm run seed
```

---

### 4. 🏃‍♂️ Start the Development Server

Run the development server:

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🔍 Features & Functionality

### ✅ Full-Text Search

Perform search queries using MongoDB text indexing:

```
GET /api/search?q=shoes
```

### ✅ Category Filtering

Filter listings by category slug:

```
GET /api/search?category=running-shoes
```

### ✅ Faceted Attribute Filters

Supports dynamic filters like size, color, etc.:

```
GET /api/search?filters={"size":"9","color":"black"}
```

### ✅ Pagination

Paginate results using `page` and `limit`:

```
GET /api/search?page=2&limit=10
```

### ✅ Facet Aggregation

Returns counts for available filter values (facets).

---

## 📁 Project Structure

```
src/
├── app/
│   └── api/
│       └── search/        # Search API route
│       └── category/      # Category POST route
├── models/                # Mongoose models
├── libs/                  # MongoDB connection
└── scripts/
    └── seeds.ts           # Seeding script
```

---

## ⚙️ Technologies Used

- Next.js (App Router)
- TypeScript
- MongoDB + Mongoose
- Axios
- Faceted Search with Aggregation
- Full-Text Search

---

## ✍️ Author

Developed by **Instinctive Studio**

---

## 📡 Sample API Call

```bash
curl "http://localhost:3000/api/search?q=shoes&category=running-shoes&filters={"size":"9"}&page=1&limit=10"
```

---

## 🔮 Future Enhancements

- Authentication & Roles
- Admin Panel
- File/Image Upload Support
- UI Enhancements

---

Happy Building! 🚀