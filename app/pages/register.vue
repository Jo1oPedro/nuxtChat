<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";

const { $generateMessages } = useNuxtApp();
const formSchema = toTypedSchema(
  z
    .object({
      //email: z.string().email({ message: $generateMessages("O email").required }),
      nome: z
        .string()
        .min(2, { message: $generateMessages("O nome").min(2) })
        .max(50, { message: $generateMessages("O nome").max(50) }),
      senha: z
        .string()
        .min(6, { message: $generateMessages("A senha").min(6) }),
      senhaConfirmacao: z.string().min(6, {
        message: $generateMessages("A confirmação da senha").min(6),
      }),
      email: z.string().email({ message: "O email inserido é inválido" }),
    })
    .refine((data) => data.senha === data.senhaConfirmacao, {
      message: "As senhas não coincidem",
      path: ["senhaConfirmacao"],
    })
);

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
});
const router = useRouter();
const { authenticated, error } = storeToRefs(useAuthStore());
const { registerUser } = useAuthStore();
const onSubmit = handleSubmit(async (values) => {
  const user = ref({
    username: values.nome,
    password: values.senha,
    passwordConfirmation: values.senhaConfirmacao,
    email: values.email,
  });

  await registerUser(user.value);
  if (authenticated.value) {
    router.push("/");
  }
});
</script>

<template>
  <div class="absolute inset-0 flex h-full items-center justify-center p-2">
    <div
      class="flex flex-col gap-4 md:w-[400px] bg-neutral-300 p-8 items-center justify-center"
    >
      <span class="font-bold">Registrar-se</span>
      <form class="flex flex-col gap-4 w-full" @submit.prevent="onSubmit">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem v-auto-animate>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" v-bind="componentField" />
            </FormControl>
            <!--<FormDescription>
              This is your public display name.
            </FormDescription>-->
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="nome">
          <FormItem v-auto-animate>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" placeholder="emilys" />
            </FormControl>
            <!--<FormDescription>
              This is your public display name.
            </FormDescription>-->
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="senha">
          <FormItem v-auto-animate>
            <FormLabel>Senha</FormLabel>
            <FormControl>
              <Input
                type="password"
                v-bind="componentField"
                placeholder="emilyspass"
              />
            </FormControl>
            <!--<FormDescription>
              This is your public display name.
            </FormDescription>-->
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="senhaConfirmacao">
          <FormItem v-auto-animate>
            <FormLabel>Confirmação da senha</FormLabel>
            <FormControl>
              <Input type="password" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <div
          v-if="error"
          class="bg-red-500 rounded-full text-center text-base p-2 font-bold"
        >
          {{ error }}
        </div>
        <div class="flex justify-center">
          <Button type="submit"> Submit </Button>
        </div>
      </form>
    </div>
  </div>
</template>
