const generateMessages = (fieldName) => ({
  min: (value: string | number) =>
    `${fieldName} precisa ter pelo menos ${value} caracteres`,
  max: (value: string | number) =>
    `${fieldName} não pode exceder ${value} caracteres`,
  required: `${fieldName} é obrigatório`,
});

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      generateMessages,
    },
  };
});
