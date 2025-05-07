# Flavar Golden Theme

This project is a luxury restaurant web application with a Royal Gold theme, featuring a modern, elegant UI and a customizable gold gradient. All UI elements have consistent rounded corners and a premium look.

## Features
- Royal Gold gradient theme throughout the app
- Consistent 10px rounded corners for all buttons and cards
- Menu, cart, AR view, and more
- Mock backend for restaurant and menu data

## Getting Started: Run Locally

### Option 1: Using the setup script (Recommended)

```bash
git clone https://github.com/Manik783/flavargoldentheme.git
cd flavargoldentheme
chmod +x setup.sh
./setup.sh
```

After running the setup script, follow the instructions to start the backend and frontend servers.

### Option 2: Manual setup

#### 1. Clone the repository
```bash
git clone https://github.com/Manik783/flavargoldentheme.git
cd flavargoldentheme
```

#### 2. Install dependencies
##### Backend
```bash
cd backend
npm install
```
##### Frontend
```bash
cd ../frontend
npm install
```

#### 3. Start the backend server
```bash
cd backend
node simple-api.js
```
- The backend will run on [http://localhost:3005](http://localhost:3005)

#### 4. Start the frontend server
```bash
cd ../frontend
npm run dev
```
- The frontend will run on the first available port (commonly 3000, 3001, ...). If ports 3000-3006 are in use, it will use 3007.

### 5. Open the app
Visit [http://localhost:3007/menu/3](http://localhost:3007/menu/3) in your browser to see the luxury menu for restaurant 3 with the Royal Gold theme.

## Troubleshooting

### Module not found errors
If you encounter "Cannot find module" errors:
```bash
cd frontend
rm -rf .next node_modules
npm install
```

### Port already in use
If you see `EADDRINUSE` errors:
```bash
# Find and kill the process using port 3005 (for backend)
lsof -i :3005 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

- If you change ports, update the URL accordingly.

## Customization
- All gold/yellow highlights use the Royal Gold gradient for a consistent luxury look.
- To change the theme, edit the CSS variables in `frontend/app/globals.css`.

---

For any issues, please open an issue on the [GitHub repository](https://github.com/Manik783/flavargoldentheme.git).

