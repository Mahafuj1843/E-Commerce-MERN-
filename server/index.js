import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connected } from './config/db.js'
import authRouter from './routes/authRoute.js'
import usersRouter from './routes/usersRoute.js'
import productsRouter from './routes/productsRoute.js'
import categorysRoute from './routes/categorysRoute.js'
import brandsRoute from './routes/brandsRoute.js'
import couponsRoute from './routes/couponsRoute.js'

const app = express()
dotenv.config()
const PORT = process.env.PORT || 1200

app.use(cookieParser())
app.use(express.json())
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/categorys', categorysRoute);
app.use('/brands', brandsRoute);
app.use('/coupons', couponsRoute);

app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something wents wrong."
    return res.status(errorStatus).json({
      success : false,
      status : errorStatus,
      message : errorMessage,
      stack : err.stack,
    });
  });

app.listen(PORT || 1200, ()=>{
    connected()
    console.log(`Server is running at port ${PORT}`)
})