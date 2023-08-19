export default defineNuxtRouteMiddleware((to, from) => {
    const isLogin =true;
    const admin = true;
    if (to.path === '/user' && !isLogin) {
        return navigateTo('/auth/login')
    }
    else if (to.path === '/admin' && !isLogin) {
        return navigateTo('/auth/login')
    }
})
