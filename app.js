import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const key = "";
const everyEnd = "https://newsapi.org/v2/everything";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let data;

app.get('/home.ejs', async (req, res) => {
    try {
        const response = await axios.get("https://newsapi.org/v2/everything?q=bitcoin&"+ key);
        const result = response.data.articles.slice(0,60);
        // console.log("-------------------------------\n")
        // console.log(result);
        // console.log("-------------------------------\n")
        res.render("home.ejs", { data: result});
    } catch (error) {
        console.error("Failed to make request:", error.message);
    }
});


app.post("/home.ejs", async (req, res) => {
    try {
        let q = "bitcoin";
        q = req.body.searchBar;
        let from = `${req.body.fYear}-${req.body.fMonth}-${req.body.fDate}`;
        let to = `${req.body.tYear}-${req.body.tMonth}-${req.body.tDate}`;
        let sort = req.body.sortBy;
        let domain = req.body.domains;
        // console.log(q,from,to,sort);
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${q}&from=${from}&to=${to}&sortBy=${sort}&domains=${domain}&`+ key);
        const result = response.data.articles.slice(0,60);
        data = result;
        // console.log("-------------------------------\n")
        // console.log(result);
        // console.log("-------------------------------\n")
        // console.log(req.body);
        res.render("home.ejs", { data: result});
    } catch (error) {
        console.error("Failed to make request:", error.message);
    }
});

app.get('/moreinfo?:url', async (req, res) => {
    try {
        const url = req.query.url;
        // const response = await axios.get("http://localhost:8000/api/v1/alerts/gdacs/"+id+"/");
        // const result = response.data;
        // console.log("-------------------------------\n")
        // console.log(result);
        // console.log("-------------------------------\n")
        res.redirect(url);
    } catch (error) {
        console.error("Failed to make request:", error.message);
    }
});


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});