export const addFavorite = async ( productId, userEmail, setIsLoading) => {

    const BACK_END = process.env.REACT_APP_BACK_END;
    try{
        setIsLoading(true); 

        const response = await fetch(`${BACK_END}/favorite/add`, { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId, userEmail })
        });

        const data = await response.json();
        
        if (response.ok) {
            setIsLoading(false);
            return 'Produto adicionado aos favoritos';
        } else {
            setIsLoading(false);
            return data.message;
        }
      
    }catch(error){
        setIsLoading(false);
        return 'Erro no servidor ao favoritar o produto';
    }
    
  }