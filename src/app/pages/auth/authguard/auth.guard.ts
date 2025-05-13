import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = !!localStorage.getItem('token'); // Check if the user is logged in by checking for a token in local storage
  if (!isLoggedIn) {
    // If the user is not logged in, redirect them to the login page
    window.location.href = '/login'; // Redirect to the login page
  }
  return isLoggedIn; // Allow access if the user is logged in, otherwise block access
};
