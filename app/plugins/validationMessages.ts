const generateMessages = (fieldName: string) => ({
  min: (value: string | number) =>
    `${fieldName} precisa ter pelo menos ${value} caracteres`,
  max: (value: string | number) =>
    `${fieldName} não pode exceder ${value} caracteres`,
  minNumber: (value: string | number) => `${fieldName} precisa ser >= ${value}`,
  maxNumber: (value: string | number) => `${fieldName} precisa ser <= ${value}`,
  required: `${fieldName} é obrigatório`,
});

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      generateMessages,
    },
  };
});
