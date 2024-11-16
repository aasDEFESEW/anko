const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('新しいクライアントが接続しました');
  
  ws.on('message', (message) => {
    // 受け取ったメッセージを接続している他のクライアントに転送
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('クライアントが切断されました');
  });
});

console.log('シグナリングサーバーがポート8080で起動しました');
