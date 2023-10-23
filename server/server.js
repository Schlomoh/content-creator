import express from "express";
import cors from "cors";
import { config } from "dotenv";
import "./config/passportSetup.js";
import morgan from "morgan"; // Make sure it's imported at the top

const session = require("express-session");
const passport = require("passport");

config();

const app = express();

// Middleware
app.use(morgan("combined"));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/auth/google/redirect", (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      console.log("Authentication failed:", err.message);
      return res.redirect("http://localhost:5173/login?error=Not+Allowed"); // Redirect with an error query param
    }
    if (!user) {
      console.log("No user found");
      return res.redirect("http://localhost:5173/login");
    }
    req.login(user, (err) => {
      if (err) {
        console.log("Error during login:", err);
        return next(err);
      }
      console.log("User authenticated, redirecting...");
      res.redirect("http://localhost:5173/");
    });
  })(req, res, next);
});

app.get("/auth/google", (req, res, next) => {
  console.log("Starting Google authentication...");
  passport.authenticate("google", {
    scope: ["profile"],
  })(req, res, next);
});

app.get("/auth/logout", (req, res) => {
  console.log("Loggin out user...");
  req.logout(() => {
    req.session.destroy((error) => {
      if (err) {
        return res.send("Error logging out");
      }
    });
    res.clearCookie("connect.sid"); // If you're using express-session, this clears the default session cookie name
    // Redirect the user to another page after logout
    res.redirect("http://localhost:5173/");
  });
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send("Not authenticated");
}

app.get("/api/isAuthenticated", (req, res) => {
  console.log("Checking if authenticated...");
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

app.get("/api/profile", isAuthenticated, (req, res) => {
  console.log("Getting profile...");
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

// You can use this middleware for routes that should be protected
app.get("/some-protected-route", isAuthenticated, (req, res) => {
  // Handle your protected route logic here
});

const PORT = process.env.PORT || 5090;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
