const http=require('http');
const app=require('./API_Model/app');
const port =process.env.PORT || 5000;

const server=http.createServer(app);
server.listen(port,()=>{
    console.log('server running on:'+port);
});