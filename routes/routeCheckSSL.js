const express = require("express");
const router = express.Router();
const checkSSL = require("../js/checkSSL");
router.get("/", (req, res) => {
    checkSSL.checkSSL(req.query.url).then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        console.log(error);
        res.status(500).send(error);
    })
})
module.exports = router;