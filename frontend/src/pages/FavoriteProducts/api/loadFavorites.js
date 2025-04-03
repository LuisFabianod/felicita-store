export const loadFavorites = async (userEmail, setIsLoading, setFavorites ,setApiMessage) => {
    try{
        setIsLoading(true); 

        const response = await fetch(`http://localhost:5000/favorite/load`, { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userEmail })
        });

        const data = await response.json();
        
        if (response.ok) {
            setIsLoading(false);
            setFavorites(data.favoriteProducts)
        } else {
            setIsLoading(false);
            setApiMessage(data.message);
        }
      
    }catch(error){
        setIsLoading(false);
        setApiMessage('Erro no servidor ao carregar produtos favoritos')
        console.log(error)
    }
    
  }