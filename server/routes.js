const express = require("express");
const jwt = require("jsonwebtoken");
const users = require("./users");
const cors = require("cors");

const router = express.Router();

router.use(cors({ origin: true }));
router.use(express.json());

router.post("/auth", (req, res) => {
  const credentials = req.body;

  const user = users.find((it) => it.username === credentials.username);
  const isAuthentic = user && user.password === credentials.password;

  if (isAuthentic)
    return res.send({
      token: jwt.sign({ username: user.username }, process.env.JWT_SECRET),
    });

  res.status(401).json({ message: "Invalid credentials" });
});

module.exports = router;
