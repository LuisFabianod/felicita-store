exports.index = (req, res) => {
   res.json({ loggedIn: req.isLoggedIn || false});
}