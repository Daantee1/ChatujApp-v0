const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyparser = require("body-parser");
const app = express();
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.json());
app.use(bodyparser.json());

http = require("http");
server = http.createServer(app);

socketIo = require("socket.io");
io = socketIo(server);

let rooms = {};

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("createRoom", (data) => {
    rooms[data.userId] = [socket.id];
    socket.join(data.userId);
  });


  socket.on("join", (data) => {
    if (rooms[data.room] && rooms[data.room].length === 2) {
      socket.emit('error', 'Room is full');
    } else if (rooms[data.room]) {
      rooms[data.room].push(socket.id);
      socket.join(data.room);
      socket.broadcast.to(data.room).emit("new user joined", data);
    } else {
      socket.emit('error', 'Room does not exist');
    }
  });

  socket.on('message', (msg) => {
    io.in(msg.room).emit('message', msg.message);
  });

  socket.on('disconnect', () => {
    for (let room in rooms) {
      rooms[room] = rooms[room].filter(id => id !== socket.id);
    }
  });
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chatuj",
});

app.get("/", (req, res) => {
  return res.json("Hello World");
});

app.post("/api/users/add", async (req, res) => {
  const saltRound = 10;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRound);
  let details = {
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword,
  };
  let sql = "INSERT INTO users SET ?";
  db.query(sql, details, (err) => {
    if (err) {
      res
        .status(500)
        .send({ status: false, message: "Database insertion error", error });
    } else {
      res.send({ status: true, message: "User added successfully" });
    }
  });
});

app.get("/api/users", async (req, res) => {
  let sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) {
      res
        .status(500)
        .send({ status: false, message: "Database selection error", error });
    } else {
      res.send({ status: true, message: "User list", result });
    }
  });
});

app.get("/api/users/:id", async (req, res) => {
  const userId = req.params.id;
  let sql = "SELECT * FROM users WHERE id=" + userId;
  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      res
        .status(500)
        .send({ status: false, message: "Database selection error", error });
    } else {
      res.send({ status: true, message: "User details", result });
    }
  });
});
app.delete("/api/users/delete/:id", async (req, res) => {
  let sql = "DELETE FROM users WHERE id=?";
  db.query(sql, req.params.id, (err) => {
    if (err) {
      res
        .status(500)
        .send({ status: false, message: "Database deletion error", err });
    } else {
      res.send({ status: true, message: "User deleted successfully" });
    }
  });
});

app.get("/api/users/checkEmail/:email", async (req, res) => {
  const email = req.params.email;
  console.log(email);
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, email, (err, result) => {
    if (err) {
      res
        .status(500)
        .send({ status: false, message: "Database selection error", error });
    } else {
      if (result.length > 0) {
        res.send({ status: false, message: "Email already exists" });
      } else {
        res.send({ status: true, message: "Email is available" });
      }
    }
  });
});
app.get("/api/users/checkUsername/:username", async (req, res) => {
  const email = req.params.username;
  const sql = "SELECT * FROM users WHERE username= ?";
  db.query(sql, email, (err, result) => {
    if (err) {
      res
        .status(500)
        .send({ status: false, message: "Database selection error", error });
    } else {
      if (result.length > 0) {
        res.send({ status: false, message: "Username already exists" });
      } else {
        res.send({ status: true, message: "Username is available" });
      }
    }
  });
});

app.get("/api/users/login/:email/:password", async (req, res) => {
  const email = req.params.email;
  const password = req.params.password;
  const sql = "SELECT * FROM users WHERE email= ?";
  db.query(sql, [email], async (err, result) => {
    if (err) {
      res
        .status(500)
        .send({ status: false, message: "Database selection error", error });
    } else {
      if (result.length > 0) {
        const match = await bcrypt.compare(password, result[0].password);
        if (match) {
          res.send({ status: true, message: "Login successful", result });
        } else {
          res.send({ status: false, message: "Login failed" });
        }
      } else {
        res.send({ status: false, message: "Login failed" });
      }
    }
  });
});

app.post("/api/profiles/add", async (req, res) => {
  let details = {
    gender: req.body.gender,
    age: req.body.age,
    province: req.body.province,
    hobbies: req.body.hobbies.join(","),
    userId: req.body.userId,
  };
  let sql = "INSERT INTO profiles SET ?";
  db.query(sql, details, (err) => {
    if (err) {
      res
        .status(500)
        .send({ status: false, message: "Database insertion error", err });
    } else {
      res.send({ status: true, message: "Profiles added successfully" });
    }
  });
});

app.listen(8081, () => {
  console.log("Server is running on port 8081");
});

db.connect((err) => {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Database Connected Successful!");
  }
});
