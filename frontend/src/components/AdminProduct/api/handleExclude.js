

export const handleExclude = async ( productId, setIsLoading) => {
    try{
        setIsLoading(true); 
        const response = await fetch('http://localhost:5000/product/exclude-product', { 
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId })
        });

        if (response.ok) {
            setIsLoading(false);
            window.alert('O produto foi excluído.');
            window.location.reload();
            
        } else {
            window.alert('Ocorreu um erro ao excluir o produto.');
            setIsLoading(false);
          
        }
      
    }catch(error){
        window.alert('Erro no servidor ao excluir o produto.');
        setIsLoading(false);
    }
    
  }