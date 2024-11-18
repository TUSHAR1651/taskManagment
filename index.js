const express = require("express");
const app = express();
app.use(express.json());
const db = require("./utils/db");
const { userRouter } = require("./Routes/UserRoute");
const { taskRouter } = require("./Routes/taskRoute");


app.use("/user", userRouter);
app.use("/task", taskRouter);
const PORT = 8000;



app.listen(PORT, () => {
    console.log(`App is Running on the PORT ${PORT}`);
});
