# 📱 Phone Accessories Management — Backend

Spring Boot REST API for managing phone accessories, with Redis caching for performance optimization.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Language | Java 17 |
| Framework | Spring Boot 4.0.6 |
| Database | PostgreSQL |
| Cache | Redis |
| ORM | Hibernate / JPA |
| Build | Maven |

---

## ⚙️ Prerequisites

Before running the project, make sure you have installed:

- Java 17+
- Maven
- PostgreSQL
- Redis (running on port 6379)

---

## 🚀 Setup & Run

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd phone-accessories-back
```

### 2. Configure environment variables

Set the following environment variables (or configure them in IntelliJ Run Configuration):

```
DB_URL=jdbc:postgresql://localhost:5432/phone_accessories
DB_USERNAME=postgres
DB_PASSWORD=your_password
SERVER_PORT=8081
```

### 3. Start Redis

```bash
# Option 1 — Windows (MSI installed)
# Redis starts automatically as a service

# Option 2 — Docker
docker run -d --name redis -p 6379:6379 redis:latest
```

### 4. Run the application

```bash
./mvnw spring-boot:run
```

Or run directly from IntelliJ: `AppApplication.java` → Run

The API will be available at: `http://localhost:8081`

---

## 📦 Project Structure

```
src/main/java/phone_accessories/app/
├── config/
│   └── RedisConfig.java          # Redis cache configuration
├── controller/
│   ├── AccessoryController.java
│   ├── BrandController.java
│   └── CategoryController.java
├── entity/
│   ├── Accessory.java
│   ├── Brand.java
│   └── Category.java
├── repository/
│   ├── AccessoryRepository.java
│   ├── BrandRepository.java
│   └── CategoryRepository.java
├── service/
│   ├── AccessoryService.java     # Cache logic here
│   ├── BrandService.java
│   └── CategoryService.java
└── AppApplication.java           # Entry point + @EnableCaching
```

---

## 🔌 API Endpoints

### Accessories

| Method | Endpoint | Description |
|---|---|---|
| GET | `/accessories` | Get all (with optional filters) |
| GET | `/accessories/{id}` | Get by ID |
| POST | `/accessories` | Create new |
| PUT | `/accessories/{id}` | Update |
| DELETE | `/accessories/{id}` | Delete |

**Filter params:** `?categoryId=1&brandId=2`

### Categories

| Method | Endpoint | Description |
|---|---|---|
| GET | `/categories` | Get all |
| GET | `/categories/{id}` | Get by ID |
| POST | `/categories` | Create |
| PUT | `/categories/{id}` | Update |
| DELETE | `/categories/{id}` | Delete |

### Brands

| Method | Endpoint | Description |
|---|---|---|
| GET | `/brands` | Get all |
| GET | `/brands/{id}` | Get by ID |
| POST | `/brands` | Create |
| PUT | `/brands/{id}` | Update |
| DELETE | `/brands/{id}` | Delete |

---

## ⚡ Redis Cache Strategy

Caching is applied on the `AccessoryService`:

| Annotation | Method | Behaviour |
|---|---|---|
| `@Cacheable("accessories")` | `filterAccessories()` | Caches list result |
| `@Cacheable(value="accessories", key="#id")` | `getById()` | Caches single item |
| `@CacheEvict(allEntries=true)` | `create / update / delete` | Clears cache on mutation |

Cache TTL: **10 minutes** (configured in `RedisConfig.java`)

On first request → data fetched from PostgreSQL → stored in Redis.
On subsequent requests → data served directly from Redis (faster).

---

## 🧪 Running Tests

```bash
# Run all tests
./mvnw test

# Skip tests (build only)
./mvnw clean install -DskipTests
```

Tests require the environment variables to be set (see Setup section).

---

## 🌿 Git Branches

| Branch | Purpose |
|---|---|
| `main` | Production-ready code |
| `test` | Integration and testing |
| `feature/redis-cache` | Redis cache implementation |
| `feature/login` | Frontend login feature |
| `cors-config` | CORS configuration |

---

## 👤 Admin Credentials (Frontend)

The frontend uses a simple hardcoded admin login:

```
Username: admin
Password: admin123
```
