exports.index = (req, res, next) => {
   if(!req.isLoggedIn){
      res.send('Você não está logado')
   }

   res.send('Você está logado')
}