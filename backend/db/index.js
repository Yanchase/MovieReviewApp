const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://wenwenyan:yan1060732029@cluster0.cxebjv3.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("db connected");
  })
  .catch((exp) => {
    console.log("throw error: ", exp);
  });
