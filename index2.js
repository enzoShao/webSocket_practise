//使用 WebSocket 的網址向 Server 開啟連結
let ws = new WebSocket('ws://localhost:3000')

//開啟後執行的動作，指定一個 function 會在連結 WebSocket 後執行
ws.onopen = () => {
    console.log('open connection')
}

//關閉後執行的動作，指定一個 function 會在連結中斷後執行
ws.onclose = () => {
    console.log('close connection')
}

//接收 Server 發送的訊息
ws.onmessage = event => {
    console.log('接收 Server 發送的訊息')
    console.log(event)
}




// 傳送 JSON 的資料的時，記得在 send 中做 JSON.stringify ，接收到時再用 JSON.parse 轉成物件處理即可

// 監聽 連線開啟時...
// ws.onopen = () => {
//  ...
// }

// 監聽 連線關閉時...
// ws.onclose = () => {
//  ...
// }

// 監聽 收到消息時
// ws.onmessage = event => {
// ...  // 取內容: event.data
// }

// 監聽 錯誤時
// ws.onerror = event => {
//     ...
// }

//發送消息:ws.send('xxxx')
//關閉連線:ws.close()
//取連線狀態:ws.readyState