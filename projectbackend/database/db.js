// DB Connection
//(URLString, objects )
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected!");
  })
  .catch(console.log("Database Connection Failed...!"));
