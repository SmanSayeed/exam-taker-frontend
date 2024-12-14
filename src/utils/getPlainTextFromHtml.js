// Utility function to extract plain text from HTML
export const getPlainTextFromHtml = (htmlString) => {
    if (!htmlString) return "";
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.body.textContent || "";
};