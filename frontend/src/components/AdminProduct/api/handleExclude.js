export const handleExclude = async ( productId, setIsLoading, setNotificationTitle) => {
    const BACK_END = process.env.REACT_APP_BACK_END;
    try{
        setIsLoading(true); 
        const response = await fetch(`${BACK_END}/product/exclude-product`, { 
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId })
        });
        
        if (response.ok) {
            setIsLoading(false);
            return 'Produto Excluído com sucesso';
        } else {
            setIsLoading(false);
            return 'Ocorreu um erro ao excluir o produto';
          
        }
      
    }catch(error){
        setIsLoading(false);
        return 'Erro no servidor ao excluir o produto';
    }
    
  }