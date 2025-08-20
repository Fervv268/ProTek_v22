import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Editor from '@monaco-editor/react';

const App = () => {
  const [code, setCode] = useState('print("Hello, World!")');
  const [language, setLanguage] = useState('python');
  const [output, setOutput] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  const runCode = async () => {
    if (!socket) return;

    try {
      const response = await fetch('http://localhost:3000/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lang: language, code }),
      });

      const { jobId } = await response.json();
      
      socket.emit('subscribe', jobId);
      socket.on('log', (data) => {
        setOutput(prev => prev + data);
      });
    } catch (error) {
      setOutput('Błąd połączenia z serwerem');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '20px' }}>
      <h1>Code Runner Online</h1>
      
      <div style={{ marginBottom: '10px' }}>
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        >
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>
        
        <button 
          onClick={runCode}
          style={{ padding: '5px 15px', backgroundColor: '#007acc', color: 'white', border: 'none', borderRadius: '3px' }}
        >
          Uruchom kod
        </button>
      </div>

      <div style={{ display: 'flex', flex: 1, gap: '10px' }}>
        <div style={{ flex: 1 }}>
          <h3>Edytor kodu:</h3>
          <Editor
            height="400px"
            language={language}
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
            }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <h3>Wyjście:</h3>
          <pre style={{ 
            backgroundColor: '#1e1e1e', 
            color: '#d4d4d4', 
            padding: '10px', 
            height: '400px', 
            overflow: 'auto',
            fontFamily: 'monospace',
            fontSize: '14px'
          }}>
            {output}
          </pre>
          <button 
            onClick={() => setOutput('')}
            style={{ marginTop: '10px', padding: '5px 10px' }}
          >
            Wyczyść wyjście
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;