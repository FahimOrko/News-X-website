import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

const everyEnd = "https://newsapi.org/v2/everything";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let data;

app.get('/home.ejs', async (req, res) => {
    try {
        const response = await axios.get(everyEnd + "?q=bitcoin&"+ key);
        const result = response.data;
        // console.log("-------------------------------\n")
        // console.log(result);
        // console.log("-------------------------------\n")
        res.render("home.ejs", { data: result});
    } catch (error) {
        console.error("Failed to make request:", error.message);
    }
});


// app.get('/moreinfo?:id', async (req, res) => {
//     try {
//         const id = req.query.id;
//         const response = await axios.get("http://localhost:8000/api/v1/alerts/gdacs/"+id+"/");
//         const result = response.data;
//         // console.log("-------------------------------\n")
//         // console.log(result);
//         // console.log("-------------------------------\n")
//         res.redirect(result.link);
//     } catch (error) {
//         console.error("Failed to make request:", error.message);
//     }
// });


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});