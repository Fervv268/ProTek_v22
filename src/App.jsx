import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import './App.css'

function App() {
  const [code, setCode] = useState('print("Hello, World!")')
  const [language, setLanguage] = useState('python')
  const [output, setOutput] = useState('')
  const [socket, setSocket] = useState(null)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    const newSocket = io('http://localhost:3000')
    setSocket(newSocket)

    return () => newSocket.close()
  }, [])

  const runCode = async () => {
    if (!socket) return

    setIsRunning(true)
    setOutput('Uruchamianie kodu...\n')

    try {
      const response = await fetch('http://localhost:3000/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lang: language,
          code: code,
        }),
      })

      const { jobId } = await response.json()

      socket.emit('subscribe', jobId)
      
      socket.on('log', (data) => {
        setOutput(prev => prev + data)
      })

      setTimeout(() => {
        setIsRunning(false)
      }, 5000)

    } catch (error) {
      setOutput('Błąd: ' + error.message)
      setIsRunning(false)
    }
  }

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage)
    if (newLanguage === 'python') {
      setCode('print("Hello, World!")')
    } else if (newLanguage === 'javascript') {
      setCode('console.log("Hello, World!")')
    }
  }

  return (
    <div className="app">
      <div className="header">
        <h1>Code Runner Online</h1>
        <div className="controls">
          <select 
            value={language} 
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="language-selector"
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>
          <button 
            onClick={runCode} 
            disabled={isRunning}
            className="run-button"
          >
            {isRunning ? 'Uruchamianie...' : 'Uruchom'}
          </button>
        </div>
      </div>
      
      <div className="main-content">
        <div className="editor-section">
          <h3>Kod:</h3>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{
              width: '100%',
              height: '400px',
              background: '#1e1e1e',
              color: '#d4d4d4',
              border: '1px solid #3e3e42',
              padding: '1rem',
              fontFamily: 'Courier New, monospace',
              fontSize: '14px',
              resize: 'none',
              borderRadius: '4px'
            }}
            placeholder="Wpisz kod tutaj..."
          />
        </div>
        
        <div className="output-section">
          <h3>Wynik:</h3>
          <pre className="output">{output}</pre>
        </div>
      </div>
    </div>
  )
}

export default App