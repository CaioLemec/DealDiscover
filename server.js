import fetch from "node-fetch";
import express from "express";

const app = express();
const PORT = 5172;
const username = import.meta.env.VITE_OXYLABS_API_USERNAME;
const password = import.meta.env.VITE_OXYLABS_API_PASSWORD;

app.use(express.json());

app.get("/deals", async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  try {
    const body = {
      source: "amazon_search",
      domain: "com.br",
      query: "Ofertas do dia",
      parse: true,
      pages: 1,
    };

    const response = await fetch("https://realtime.oxylabs.io/v1/queries", {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data = await response.json();
    const results = data.results[0].content.results.organic;
    const filteredResults = results.filter((deal) => deal.price_strikethrough);
    const sortByBestResult = filteredResults.sort((a, b) => {
      return (
        ((a.price_strikethrough - a.price) / a.price_strikethrough) * 100 -
        ((b.price_strikethrough - b.price) / b.price_strikethrough) * 100
      );
    });
    res.json(sortByBestResult);
  } catch (error) {
    console.error("Erro na requisição:", error);
    res.status(500).send("Erro interno do servidor");
  }
});

app.listen(PORT, () => 
  console.log(`Server is running on port: ${'http://localhost:'+PORT+'/deals'} - ${new Date().toLocaleString()}`)
);

// Documentation:
// https://developers.oxylabs.io/scraper-apis/e-commerce-scraper-api/amazon/search