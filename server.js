const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", async (req, res) => {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization:
          "Bearer d035adbfa78f3c420af7cd3c6c12637047fc29b39a4a9772b33224a999fb95df",
      },
    };

    const response = await fetch(
      //`https://jsonplaceholder.typicode.com/todos/1`
      `https://api.webflow.com/v2/sites/669ca79ffbea6888c8cd512c/collections`,
      options
    );

    if (!response.ok) {
      console.log("here");
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }
    console.log("here");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      error: error.message || "An error occurred while fetching data",
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
