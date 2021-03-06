"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var ws_1 = require("ws");
var app = express();
app.get('/', function (request, response) { return response.send('这里是首页'); });
app.get('/api/stock', function (request, response) {
    response.json(stocks);
});
app.get('/api/stock/:id', function (request, response) {
    response.json(stocks.find(function (stock) { return stock.id == request.params.id; }));
});
var server = app.listen(8080, 'localhost', function () {
    console.log('服务器已经启动，地址是http://localhost:8080');
});
var wsServer = new ws_1.Server({ port: 8081 });
wsServer.on('connection', function (websocket) {
    websocket.send('欢迎链接服务器');
    websocket.on('message', function (message) {
        console.log("接收到客户端发送的消息，内容是： " + message);
    });
});
setInterval(function () {
    if (wsServer.clients) {
        wsServer.clients.forEach(function (client) {
            client.send("这是定时推送的消息");
        });
    }
}, 2000);
var Stock = /** @class */ (function () {
    function Stock(id, name, price, rating, desc, categories) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
    }
    return Stock;
}());
exports.Stock = Stock;
var stocks = [
    new Stock(1, "First stock", 1.99, 3.5, "This ist the first stock", ['IT']),
    new Stock(2, "Second stock", 1.99, 4.5, "This ist the second stock", ['IT']),
    new Stock(3, "Third stock", 1.99, 2.5, "This ist the third stock", ['IT']),
    new Stock(4, "Fourth stock", 1.99, 3, "This ist the fourth stock", ['IT']),
    new Stock(5, "Fifth stock", 1.99, 4, "This ist the fifth stock", ['IT']),
    new Stock(6, "Sixth stock", 1.99, 5, "This ist the sixtch stock", ['IT', 'Cloud']),
    new Stock(7, "Seventh stock", 1.99, 3.5, "This ist the seventh stock", ['IT']),
    new Stock(8, "Eighth stock", 1.99, 3, "This ist the eighth stock", ['IT', 'UI'])
];
//# sourceMappingURL=stock_server.js.map