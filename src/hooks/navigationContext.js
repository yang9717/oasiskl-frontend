export const saveNavigationContext = (sourceType, sourceId = null) => {
    const context = {
      sourceType, // 'space', 'gallery', 'care', 'identify'
      sourceId,   // ID of the source (if applicable)
      timestamp: Date.now()
    };
    localStorage.setItem('navigationContext', JSON.stringify(context));
  };
  
export const getNavigationContext = () => {
    const contextString = localStorage.getItem('navigationContext');
    if (!contextString) return null;

    try {
        return JSON.parse(contextString);
    } catch (e) {
        console.error('Failed to parse navigation context', e);
        return null;
    }
};