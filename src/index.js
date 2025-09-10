require('dotenv').config()
const app= require('./app')

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server running on address http://localhost:${process.env.PORT}`);
})