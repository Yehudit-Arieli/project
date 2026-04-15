# 🎮 Game Management Backend (Node.js + Prisma + PostgreSQL)

A clean, modular backend system designed to demonstrate strong skills in **data modeling**, **business logic**, and **Dockerized environments**.

---

## 🚀 Tech Stack

- **Backend:** Node.js (JavaScript)  
- **ORM:** Prisma  
- **Database:** PostgreSQL  
- **Containerization:** Docker & Docker Compose  

---

## 📦 Project Overview

This system models a simple game platform where users can join games and participate as players.

### Focus Areas:
- Designing relational data models  
- Writing clean and testable business logic  
- Running a fully automated environment using Docker  

---

## 🧠 Data Modeling

### 👤 User
Represents a system user.

### 🎯 Game
Represents a game session.

**Status Enum:**
- `WAITING`
- `LIVE`
- `FINISHED`

### 🔗 GameParticipant
A junction table that connects users and games.

Includes:
- Player role (Enum)  
- Score  
- Relations between User ↔ Game  

---

## 🔄 Relationships

- A **User** can participate in multiple games  
- A **Game** can have multiple participants  
- Managed via **GameParticipant (Many-to-Many)**  

---

## ⚙️ Business Logic

### `joinGame(userId, gameId)`

Handles user registration to a game.

### ✔️ Validations:
- Game must exist  
- Game status must be `WAITING`  
- User must not already be registered  

### ✅ Action:
- Adds the user as a `PLAYER` in `GameParticipant`  

### ❌ Errors:
- Game is already `LIVE`  
- User already joined  

---

## 🏁 Entry Point Flow (`main.js`)

When the app runs:

1. Connects to the database  
2. Creates dummy data:
   - One user  
   - One game (`WAITING`)  
3. Calls `joinGame`  
4. Prints result to console  

### Example Output:
```bash
Success: User joined game
```

---

This project is fully containerized.

### Services:
- PostgreSQL Database  
- Node.js Application  

---

## ▶️ How to Run

```bash
docker-compose up --build
```

### What happens automatically:

- ✅ Containers are created  
- ✅ Prisma migrations run  
- ✅ Database is initialized  
- ✅ `main.js` executes  
- ✅ Result is printed in Docker logs

## 📌 Notes for Reviewer

- Run `docker-compose up` to start the system  
- No manual setup required  
- Focus of this project is on backend logic and architecture


