export default defineNuxtRouteMiddleware((to, from) => {
  const { authenticated } = storeToRefs(useAuthStore());
  const token = useCookie("token");

  if (token.value) {
    authenticated.value = true;
  }

  if (token.value && (to?.name === "login" || to?.name === "register")) {
    return navigateTo("/");
  }
  console.log("valor da porra do token: " + token.value);
  if (!token.value && to?.name !== "login" && to?.name !== "register") {
    abortNavigation();
    return navigateTo("/login");
  }
  console.log("entrou pra porra da rota");
});
