// linkUtils.js

// Function to check if a given link is active
export const isActiveLink = (location, link) => {
    // Assuming the link is a string representing the path, e.g., "/account/dashboard"
    // This function checks if the current pathname starts with the provided link
    // Adjust the comparison logic based on your needs, for example, for exact match, you can use `location.pathname === link`
    return location.pathname.startsWith(link);
  };