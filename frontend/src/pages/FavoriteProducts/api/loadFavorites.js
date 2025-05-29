export const loadFavorites = async (userEmail, setIsLoading, setFavorites ,setApiMessage) => {

    const BACK_END = process.env.REACT_APP_BACK_END;

    try{
        setIsLoading(true); 

        const response = await fetch(`${BACK_END}/favorite/load`, { 
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