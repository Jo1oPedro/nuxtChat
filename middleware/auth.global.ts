export default defineNuxtRouteMiddleware((to, from) => {
  if (to.fullPath !== "/login" && false) {
    return navigateTo("/login");
  }
});
