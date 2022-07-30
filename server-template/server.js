import config from "./config.js"
import express from "express"
import cors from "cors"
import morgan from "morgan"
import "./connect-db.js"
import userRouter from "./routes/user.router.js"
import {errorHandler404, errorHandlerGeneric} from "./lib/error-handler.js"

const app = express()

app.use(morgan("dev")) // log all requests to API
app.use(cors()) // this is enough setup for token exchange
app.use(express.json()) // JSON Parser => req.body

app.get("/", (req, res) => {
  // res.send("Hello from API!")
  res.send(`
  <h2>Hello from API!</h2>
  <div> Frontend URL: <a href="${process.env.ORIGIN_URL}"> ${process.env.ORIGIN_URL}</a></div>
  `)
})
{/* <div>Our routes:</div>
<div>Home: <a href="/">/</a></div>
<div>Courses: <a href="/user">/user</a></div> */}

// load ROUTERS
app.use("/user", userRouter)


app.use(errorHandler404)
/// 404 error handler
// app.use((req, res, next) => {
  //   const error = new Error("Route does not exist")
  //   error.status = 404
  //   next(error) // forward error to central error handler
  // })
  
  app.use(errorHandlerGeneric)
// GENERIC error handler
// ALL errors in our code, are automatically
// forwarded from express to here
// app.use((err, req, res, next) => {
  // errors of our OWN code we wanna log
  // to the terminal
  // so we can fix them easy :)
//   if (!err.status) {
//     console.log(err)
//   }
//   res.status(err.status || 500).json({
//     error: err.message || err
//   })
// })

const PORT = process.env.PORT || 5555
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`)
})
