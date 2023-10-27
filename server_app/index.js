const express = require('express')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);

const cors = require("cors");

// Khởi tạo paypal
var paypal = require('paypal-rest-sdk');

// const io = require('socket.io')(http);

var upload = require('express-fileupload');
const port = 8000

const UserAPI = require('./API/Router/user.router')

const ProductAdmin = require('./API/Router/admin/product.router')
const CategoryAdmin = require('./API/Router/admin/category.router')
const Permission = require('./API/Router/admin/permission.router')
const UserAdmin = require('./API/Router/admin/user.router')

const mongoose = require("mongoose");
mongoose.connect("", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to database ')
})
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });


app.use('/', express.static('public'))
app.use(upload());

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());


app.use('/api/User', UserAPI)

app.use('/api/admin/Product', ProductAdmin)
app.use('/api/admin/Category', CategoryAdmin)
app.use('/api/admin/Permission', Permission)
app.use('/api/admin/User', UserAdmin)
app.use('/api/admin/Order', Order)
app.use('/api/admin/Coupon', Coupon)
app.use('/api/admin/Sale', Sale)


io.on("connection", (socket) => {
  console.log(`Có người vừa kết nối, socketID: ${socket.id}`);


  socket.on('send_order', (data) => {
    console.log(data)

    socket.broadcast.emit("receive_order", data);
  })
})

http.listen(port, () => {
  console.log('listening on *: ' + port);
});