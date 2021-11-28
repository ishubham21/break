const router = require("express").Router();
const { fetchAllCodes } = require('./../controllers/codeData')

router.get("/", async (req, res) => {
    res.json({
        error: null,
        data: {
            title: "My dashboard",
            content: await fetchAllCodes(req.user.id),  //sending all the codes of the user as an array
            user: req.user, // token payload information - user information
        },
    });
});

module.exports = router;