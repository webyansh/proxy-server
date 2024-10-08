const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  try {
    const url = req.query.request_url;
    const requestOptions = {
      method: "GET",
    };

    const response = await fetch(`${url}`, requestOptions);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      error: error.message || "An error occurred while fetching data",
    });
  }
});

app.post("/webflow-api", async (req, res) => {
  try {
    const options = req.body.options;
    const url = req.body.request_url;

    const response = await fetch(`${url}`, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      error: error.message || "An error occurred while fetching data",
    });
  }
});

app.post("/others", async (req, res) => {
  try {
    const options = req.body.options;
    const url = req.body.request_url;

    const response = await fetch(`${url}`, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }
   // const data = await response.json();
   // res.json(data);
    
    const contentType = response.headers.get("content-type");
    let responseData;
  
    if (contentType && contentType.indexOf("application/json") !== -1) {
      // If the response is JSON, parse it as JSON
      responseData = await response.json();
    } else {
      // If the response is not JSON, read it as text
      responseData = await response.text();
    }
    // Send the response back to the client
    res.status(response.status).send(responseData);
    
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
