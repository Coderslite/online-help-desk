export default defineNuxtRouteMiddleware(async (to, from) => {
  const isLogin = isAuthenticated();
  if (!isLogin) {
    // Redirect to login page only when not authenticated
    return navigateTo('/auth/login')
  };
});
