export default defineNuxtRouteMiddleware((to, from) => {
  const { authenticated } = storeToRefs(useAuthStore());
  const token = useCookie("token");

  if (token.value) {
    authenticated.value = true;
  }

  if (token.value && (to?.name === "login" || to?.name === "register")) {
    return navigateTo("/");
  }

  if (!token.value && to?.name !== "login" && to?.name !== "register") {
    abortNavigation();
    return navigateTo("/login");
  }
});
