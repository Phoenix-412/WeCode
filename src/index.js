require('dotenv').config()
const app= require('./app')
const connectDB= require('./db/index');
const redisClient = require('./db/redis');


Promise.all([connectDB(), redisClient.connect()])
.then(()=>{
    const PORT= process.env.PORT || 3000
    app.listen(PORT, ()=>{
        console.log(`Server running on address http://localhost:${PORT}`);
    })
})
.catch((err)=>{
    console.log('MONGODB or REDIS connection failed!!! ',err);
});