# Code Runner Online

A modern, web-based code editor and execution environment that supports Python and JavaScript programming languages. Built with React and powered by Monaco Editor for a professional coding experience.

![Code Runner Online](https://github.com/Fervv268/ProTek_v22/raw/main/screenshots/code-runner-app.png)

## Features

- 🖥️ **Monaco Code Editor**: Professional code editing experience with syntax highlighting
- 🐍 **Python Support**: Execute Python code in real-time
- 🟨 **JavaScript Support**: Run JavaScript code instantly
- 🔄 **Real-time Execution**: See output as your code runs using Socket.IO
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🌙 **Dark Theme**: Easy on the eyes with a professional dark interface
- 🔧 **Fallback Editor**: Automatic fallback to textarea if Monaco Editor fails to load
- ⚡ **Fast**: Built with Vite for lightning-fast development and builds

## Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and development server
- **Monaco Editor** - Advanced code editor (VS Code editor)
- **Socket.IO Client** - Real-time communication

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Socket.IO** - Real-time bidirectional communication
- **Child Process** - Code execution in isolated processes

## Prerequisites

Before running this application, make sure you have:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Python 3** (for Python code execution)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Fervv268/ProTek_v22.git
   cd ProTek_v22
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## Usage

### Development Mode

1. **Start the backend server**
   ```bash
   node server.js
   ```
   The backend will start on `http://localhost:3000`

2. **Start the frontend development server** (in a new terminal)
   ```bash
   npm run dev
   ```
   The frontend will start on `http://localhost:5173`

3. **Open your browser** and navigate to `http://localhost:5173`

### Production Build

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Preview the production build**
   ```bash
   npm run preview
   ```

## How to Use

1. **Select Language**: Choose between Python and JavaScript from the dropdown menu
2. **Write Code**: Enter your code in the editor (Monaco Editor or fallback textarea)
3. **Execute**: Click the "Uruchom" (Run) button to execute your code
4. **View Output**: See the results in the output panel on the right

### Example Code

**Python:**
```python
print("Hello, World!")
for i in range(5):
    print(f"Count: {i}")
```

**JavaScript:**
```javascript
console.log("Hello, World!");
for (let i = 0; i < 5; i++) {
    console.log(`Count: ${i}`);
}
```

## Project Structure

```
ProTek_v22/
├── src/
│   ├── App.jsx          # Main React component
│   ├── App.css          # Styling
│   └── main.jsx         # React entry point
├── public/              # Static assets
├── server.js            # Express.js backend server
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── index.html           # HTML template
```

## API Endpoints

### POST /run
Executes code and returns a job ID for real-time output tracking.

**Request Body:**
```json
{
  "lang": "python" | "javascript",
  "code": "your code here"
}
```

**Response:**
```json
{
  "jobId": "timestamp-based-id"
}
```

## Socket.IO Events

- **`subscribe`**: Join a job room to receive output
- **`log`**: Receive real-time output from code execution

## Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Environment

The application runs in development mode with:
- Frontend on port 5173 (Vite default)
- Backend on port 3000
- Hot module replacement enabled
- Real-time code execution

## Security Considerations

⚠️ **Warning**: This application executes arbitrary code on the server. In a production environment, you should:

- Implement proper sandboxing
- Add authentication and authorization
- Limit execution time and resources
- Validate and sanitize input
- Use containerization (Docker) for isolation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/Fervv268/ProTek_v22/issues) on GitHub.

---

Made with ❤️ by [Fervv268](https://github.com/Fervv268)