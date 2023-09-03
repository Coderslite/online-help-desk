// plugins/auth-middleware.js

export default defineNuxtPlugin(() => {
  addRouteMiddleware("auth", (to, from) => {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin == null || isLogin === "false") {
      console.log("User is not logged in");
      console.log(to.fullPath);
      return navigateTo("/auth/login"); // Redirect if not logged in
    }
    return Promise.resolve(); // Continue middleware chain
  });
});
