//import express 和 ws 套件
const express = require('express')
const SocketServer = require('ws').Server

//指定開啟的 port
const PORT = 3000

//創建 express 的物件，並綁定及監聽 3000 port ，且設定開啟後在 console 中提示
const server = express()
    .listen(PORT, () => console.log(`Listening on ${PORT}`))

//將 express 交給 SocketServer 開啟 WebSocket 的服務
const wss = new SocketServer({ server })
// 這段程式碼使用了 ws 模組中的 SocketServer 類別，建立了一個 WebSocket 伺服器，並將其綁定到一個現有的 HTTP 伺服器上。
// 具體來說，server 參數是一個 Node.js HTTP 伺服器物件，表示要將 WebSocket 伺服器綁定到該 HTTP 伺服器上。
// SocketServer 類別的建構子接受一個物件作為參數，該物件包含一個 server 屬性，其值為要綁定的 HTTP 伺服器。
// 因此，這個程式碼創建了一個新的 SocketServer 物件 wss，並將其綁定到先前建立的 HTTP 伺服器上。現在，wss 就可以使用 WebSocket 協定來處理來自客戶端的請求和訊息。

//當 WebSocket 從外部連結時執行
wss.on('connection', ws => { //ws 物件是傳給回調函式的參數，代表伺服器和客戶端之間的 WebSocket 連線。你可以使用這個物件來在兩端之間發送和接收訊息。

    //固定送最新時間給 Client
    // const sendNowTime = setInterval(()=>{
    //     ws.send(String(new Date()))
    // },1000)


    //連結時執行此 console 提示
    console.log('Client connected');

    //對 message 設定監聽，接收從 Client 發送的訊息
    ws.on('message', data => {

        // 收回來是 Buffer 格式、需轉成字串
        data = data.toString()  

        //取得所有連接中的 client
        let clients = wss.clients
        
        // wss.clients 屬性會返回一個 Set 集合，包含當前所有已連接的 WebSocket 客戶端。
        // Set 是一個 ES6 中的集合，類似於數組，但它的每個元素都是唯一的，而且順序是不重要的。
        // wss.clients 集合中的每個元素都是一個 WebSocket 實例，代表一個已連接的 WebSocket 客戶端。
        // 你可以通過遍歷 wss.clients 集合，來對所有已連接的客戶端進行操作，例如向他們發送訊息或關閉他們的連線等。

        // 做迴圈，發送訊息至每個 client
        clients.forEach(client => {
            client.send(data)
        })
    })

    //當 WebSocket 的連線關閉時執行
    ws.on('close', () => {
        console.log('Close connected')
    })

})


// 使用 WebSocket 時需要注意以下幾點：

// 1.WebSocket 通訊是雙向的，伺服器和客戶端都可以主動傳送訊息。因此，你需要確定你的程式設計考慮到了這一點，防止出現死鎖或死循環的情況。

// 2.WebSocket 通訊是基於事件的，因此你需要注意處理事件的順序，避免出現不合理的事件順序導致的錯誤。

// 3.WebSocket 通訊使用的是明文協議，因此需要注意安全問題。如果需要加密通訊，可以使用 WSS（WebSocket over SSL/TLS）協議來進行加密。

// 4.WebSocket 通訊需要注意跨域問題。如果你的 WebSocket 伺服器和 HTTP 伺服器不在同一個域名下，需要注意跨域問題，可以使用 CORS（Cross-Origin Resource Sharing）等機制來解決。

// 5.WebSocket 通訊需要注意性能問題。因為 WebSocket 通訊是一個長連線，因此需要注意設計和實現，避免出現性能瓶頸和資源浪費等問題。可以使用壓縮和緩存等技術來優化性能。

// 6.WebSocket 通訊需要注意可靠性問題。因為 WebSocket 通訊是一個長連線，因此需要考慮斷線重連等情況，保障通訊的可靠性。可以使用心跳機制等技術來實現斷線重連。