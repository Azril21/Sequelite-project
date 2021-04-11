const express = require('express')
const cookieParser = require("cookie-parser")
const { v4: uuidv4 } = require('uuid'); const
fake_db = require('./db.js')
const matchCredentials = require('./utils.js')
const app = express()
app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

// show home with forms
app.get('/', function(req, res){
res.render('pages/home')
})
// create a user account
app.post('/create', function(req, res){
let body = req.body
let user = {
username: body.username,
password: body.password

}
fake_db.users[user.username] = user
res.redirect('/')
})
// login
app.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const whereUser = {
        username: username,
        password: password,
      };
  ​
      console.log("userPrs:", JSON.stringify(whereUser));
  ​
      console.log("\n\nusername:", username, "\n\n");
  ​
      const user = await User.findOne({
        where: whereUser,
      });
  ​
      if (user) {
        data.message = username;
        
        //creates the cookie that holds the UUID (the session ID)
        let id = uuidv4();
  ​
        res.cookie("SID", id, {
          expires: new Date(Date.now() + 5),
          httpOnly: true,
        });
  ​
        res.render("pages/members", data);
      } else {
        console.log("\n\nError Msgs.....\n\n");
        data.message = "Invalid username or password";
        res.render("pages/error", data);
      }
  ​
      //
    } catch (error) {
      console.log(error);
      data.message = error;
      res.redirect("pages/error", data);
    }
  });
    // this is the protected route
    app.get('/supercoolmembersonlypage', function(req, res){
    let id = req.cookies.SID
    // attempt to retrieve the session.
    // if session exists, get session
    // otherwise, session === undefined.
    let session = fake_db.sessions[id]

    // if session is undefined, then
// this will be false, and we get sent
// to error.ejs
if (session) {
    res.render('pages/members')
    } else {
    res.render('pages/error')
    }
    })
    // if something went wrong, you get sent here
    app.get('/error', function(req, res){
    res.render('pages/error')
    })
    // 404 handling
    app.all('*', function(req, res){
    res.render('pages/error')
    })

    app.listen(1612)
    console.log('server is running')