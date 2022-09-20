import express from "express";
const app = express();
app.get('/', (req, res) => {
    return res.json({
        res: 'Hello World!'
    });
});
app.listen(3333, () => {
    console.log("Application running on port 3333");
});
