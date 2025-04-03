export const addFavorite = async ( productId, userEmail, setIsLoading, setNotificationTitle) => {
    try{
        setIsLoading(true); 

        const response = await fetch(`http://localhost:5000/favorite/add`, { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId, userEmail })
        });

        const data = await response.json();
        
        if (response.ok) {
            setIsLoading(false);
            setNotificationTitle('Produto adicionado aos favoritos');
        } else {
            setIsLoading(false);
            setNotificationTitle(data.message)
          
        }
      
    }catch(error){
        setIsLoading(false);
        setNotificationTitle('Erro no servidor ao favoritar o produto')
    }
    
  }