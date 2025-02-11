require('dotenv').config()
const port = process.env.PORT || 8080;
const express = require('express');
const http = require('http');
const https = require('https');
const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const sendVerificationMail = require('./authenticators/MailVerificator');
const userConnections = require('./utils');
const { URL } = require('url');

const app = express();
const allowedOrigins = ['http://localhost:3000', 'https://kanteen-ase.netlify.app']
app.use(cors())
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(express.json())

// Use the appropriate module for the protocol
const keepAlive = () => {
    const url = new URL(process.env.SERVER_URL);
    const protocol = url.protocol === 'https:' ? https : http;
    protocol.get(process.env.SERVER_URL);
};

setInterval(keepAlive, 300000);

const server = http.createServer(app);

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws, req) => {
    const protocol = (req.headers['x-forwarded-proto'] || 'http') + '://';
    const host = req.headers.host;
    const fullUrl = new URL(req.url, protocol + host);
    const emailId = decodeURIComponent(fullUrl.searchParams.get('emailId')); 
    const token = jwt.sign({ emailId: emailId }, process.env.VERIFICATION_SECRET, { expiresIn: '1h' });
    sendVerificationMail(emailId, token);
    ws.send(JSON.stringify({ message: "Verification mail sent successfully", success: true }));
    if (!userConnections[emailId]) userConnections[emailId] = { ws, verified: false, token: '' }
    userConnections[emailId].token = token;
    ws.on('close', () => {
        delete userConnections[emailId];
        console.log('client disconnected : from server');
    })
});

wss.on('error', (err) => {
    console.error('WebSocket server error:', err);
});

server.on('upgrade', (req, socket, head) => { 
    wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
    });
});

server.on('error', (err) => {
    console.error('Server error:', err);
});

const connectDB = require('./db')
connectDB().then(() => {
    server.listen(port, () => {
        console.log(`HTTP and WebSocket server is running on ${process.env.SERVER_URL}`)
    })
}).catch(err => {
    console.log(err)
    console.error("DB connection failed")
})

app.get('/',(req,res)=>{
    return res.status(302).json({"message":"Server Found"});
})

const authRouter = require('./routes/auth')
app.use('/api/auth', authRouter)

const verifyRouter = require('./routes/verify')
app.use('/api/verify', verifyRouter)

const itemsRouter = require('./routes/items')
app.use('/api/items', itemsRouter)

const cartRouter = require('./routes/cart')
app.use('/api/cart', cartRouter)

const paymentRouter = require('./routes/payment')
app.use('/api/payment', paymentRouter)

const orderRouter = require('./routes/orders')
app.use('/api/orders', orderRouter)

const transactionRouter = require('./routes/transaction')
app.use('/api/transaction', transactionRouter)