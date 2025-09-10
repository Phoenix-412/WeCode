require('dotenv').config()
const app= require('./app')
const connectDB= require('./db/index')

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 3000, ()=>{
        console.log(`Server running on address http://localhost:${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log('MONGODB connection failed!!! ',err);
});