import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import cors from 'cors';
import { spawn } from 'child_process';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(bodyParser.json());

io.on('connection', (socket) => {
  console.log('Klient połączony');
  socket.on('subscribe', (jobId) => socket.join(jobId));
});

app.post('/run', (req, res) => {
  const { lang, code } = req.body;
  const jobId = Date.now().toString();
  res.json({ jobId });

  let cmd, args;
  if (lang === 'python') { cmd = 'python3'; args = ['-c', code]; }
  else if (lang === 'javascript') { cmd = 'node'; args = ['-e', code]; }
  else { io.to(jobId).emit('log', `Nieobsługiwany język: ${lang}`); return; }

  const proc = spawn(cmd, args);
  proc.stdout.on('data', d => io.to(jobId).emit('log', d.toString()));
  proc.stderr.on('data', d => io.to(jobId).emit('log', d.toString()));
  proc.on('close', code => io.to(jobId).emit('log', `Proces zakończony (kod ${code})`));
});

server.listen(process.env.PORT || 3000, () =>
  console.log(`Backend działa na porcie ${process.env.PORT || 3000}`)
);