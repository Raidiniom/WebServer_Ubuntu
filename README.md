This document summarizes the setup process for hosting a Node.js + PostgreSQL web application on an Ubuntu server with **Nginx** as a reverse proxy.

---

## 1. PostgreSQL Setup
- Installed PostgreSQL.
- Created a new database and user:

```sql
CREATE USER sysaduser WITH ENCRYPTED PASSWORD 'sysaduser';
CREATE DATABASE sysaddb;
GRANT ALL PRIVILEGES ON DATABASE sysaddb TO sysaduser;
```
Example table:

```sql
Copy code
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password TEXT NOT NULL
);
```
## 2. Node.js Setup
Installed Node.js and npm.

Project structure:
```
WebServer_Ubuntu/
│── controllers/
│   └── authController.js
│── db/
│   └── index.js
│── public/
│   ├── index.html
│   ├── login.html
│   └── register.html
│── routes/
│   └── auth.js
│── .env
│── server.js
│── package.json
```

Installed dependencies:
```bash
npm install express pg bcrypt dotenv
```

Example .env:

```ini
PORT=3000
DB_USER=sysaduser
DB_PASSWORD=sysaduser
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sysaddb
```
## Running the Node.js Server
Start the app:

```bash
npm start
```
Expected output:
	Server running on http://localhost:3000
## Nginx Reverse Proxy Setup
Created new site config: /etc/nginx/sites-available/sysadweb
```nginx
server {
    listen 80;

    server_name 192.168.72.134;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enabled the config:
```bash
sudo ln -s /etc/nginx/sites-available/sysadweb /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```
## Accessing the Website 
From your host PC, open:

Open this site :
```cpp
http://192.168.72.134
```

Nginx forwards the request to Node.js (localhost:3000 inside VM).