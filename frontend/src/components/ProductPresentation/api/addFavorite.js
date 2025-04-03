export const addFavorite = async ( productId, setIsLoading, setNotificationTitle) => {
    try{
        setIsLoading(true); 

        const response = await fetch(`http://localhost:5000/favorite/add`, { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId })
        });
        
        if (response.ok) {
            setIsLoading(false);
            setNotificationTitle('Produto Excluído com sucesso')
        } else {
            setIsLoading(false);
            setNotificationTitle('Ocorreu um erro ao excluir o produto')
          
        }
      
    }catch(error){
        setIsLoading(false);
        setNotificationTitle('Erro no servidor ao excluir o produto')
    }
    
  }