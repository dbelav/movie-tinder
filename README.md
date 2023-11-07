# Movie Tinder App
### Project stack:
+ #### Frontend: TypeScript, Vue.js, Pinia
+ #### Backend: Python, FastAPI
+ #### Containerization: Docker

# How to run a project
#### 1. Create ```postgres.env``` file with db credentials in project root.
```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres123
POSTGRES_DB=movie_tinder
POSTGRES_HOST=database
POSTGRES_PORT=5432
```
#### 2. Build Docker images and run project with:
```
docker-compose up --build
```
#### 3. To shut down containers:
```
docker-compose down
```
#### 4. To rerun project:
```
docker-compose up
```