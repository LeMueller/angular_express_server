import * as express from 'express';
import { Server } from 'ws';

const app = express();

app.get('/', (request, response) => response.send('这里是首页'));

app.get('/api/stock', (request, response) => {
    response.json(stocks);
});

app.get('/api/stock/:id', (request, response) => {
    response.json(stocks.find((stock) => stock.id == request.params.id));
});

const server = app.listen(8080, 'localhost', () => {
    console.log('服务器已经启动，地址是http://localhost:8080');
});

const wsServer = new Server({port: 8081});
wsServer.on('connection', websocket => {

    websocket.send('欢迎链接服务器');
    websocket.on('message', message => {
        console.log("接收到客户端发送的消息，内容是： " + message);
    })
});

setInterval(() => {
    if(wsServer.clients) {
        wsServer.clients.forEach(client => {
            client.send("这是定时推送的消息");
        })
    }
}, 2000);


export class Stock {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public rating: number,
        public desc: string,
        public categories: Array<string>
    ){}
}

const stocks: Stock[] = [
    new Stock(1, "First stock", 1.99, 3.5, "This ist the first stock", ['IT']),
    new Stock(2, "Second stock", 1.99, 4.5, "This ist the second stock", ['IT']),
    new Stock(3, "Third stock", 1.99, 2.5, "This ist the third stock", ['IT']),
    new Stock(4, "Fourth stock", 1.99, 3, "This ist the fourth stock", ['IT']),
    new Stock(5, "Fifth stock", 1.99, 4, "This ist the fifth stock", ['IT']),
    new Stock(6, "Sixth stock", 1.99, 5, "This ist the sixtch stock", ['IT', 'Cloud']),
    new Stock(7, "Seventh stock", 1.99, 3.5, "This ist the seventh stock", ['IT']),
    new Stock(8, "Eighth stock", 1.99, 3, "This ist the eighth stock", ['IT', 'UI'])
]