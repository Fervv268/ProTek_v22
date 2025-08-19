import { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { io } from 'socket.io-client';

const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [code, setCode] = useState('print("Hello Adam!")');
  const [logs, setLogs] = useState([]);
  const socketRef = useRef(null);

  const runCode = async () => {
    const res = await fetch(\`\${API_URL}/run\`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ lang: 'python', code })
    });
    const { jobId } = await res.json();
    socketRef.current.emit('subscribe', jobId);
  };

  useEffect(() => {
    socketRef.current = io(API_URL);
    socketRef.current.on('log', line => setLogs(l => [...l, line]));
    return () => socketRef.current.disconnect();
  }, []);

  return (
    <div style={{height:'100vh',display:'flex',flexDirection:'column'}}>
      <Editor
        height="60%"
        language="python"
        value={code}
        onChange={setCode}
      />
      <button onClick={runCode} style={{padding:8}}>Uruchom</button>
      <pre style={{flex:1,background:'#000',color:'#0f0',margin:0,padding:8}}>
        {logs.join('\n')}
      </pre>
    </div>
  );
}