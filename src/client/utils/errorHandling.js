export function handleApiError(error) {
  if (error.response) {
    // Server responded with error
    const { status, data } = error.response;
    switch (status) {
      case 400:
        return {
          type: 'validation',
          message: data.message || 'Invalid request data'
        };
      case 401:
        return {
          type: 'auth',
          message: 'Please log in to continue'
        };
      case 403:
        return {
          type: 'permission',
          message: 'You do not have permission to perform this action'
        };
      case 404:
        return {
          type: 'notFound',
          message: 'The requested resource was not found'
        };
      case 429:
        return {
          type: 'rateLimit',
          message: 'Too many requests. Please try again later'
        };
      default:
        return {
          type: 'server',
          message: 'An unexpected error occurred'
        };
    }
  }

  if (error.request) {
    // Request made but no response
    return {
      type: 'network',
      message: 'Unable to connect to server'
    };
  }

  // Error in request setup
  return {
    type: 'client',
    message: 'An error occurred while processing your request'
  };
}

export function formatErrorMessage(error) {
  const { type, message } = handleApiError(error);
  return {
    title: type.charAt(0).toUpperCase() + type.slice(1) + ' Error',
    message,
    action: type === 'auth' ? 'Login' : 'Try Again'
  };
}