export default defineNuxtRouteMiddleware((to, from) => {
    const isLogin =false;
    const admin = true;
    if (to.path === '/' && !isLogin) {
        return navigateTo('/auth/login')
    }
    else if (to.path === '/admin' && !isLogin) {
        return navigateTo('/auth/login')
    }
})
