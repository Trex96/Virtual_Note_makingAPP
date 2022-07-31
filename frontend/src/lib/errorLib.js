export function onError(error) {
    let message = error.toString();
  
    
    if (!(error instanceof Error) && error.message) {
      message = error.message;
    }
  
    alert(message);
  }