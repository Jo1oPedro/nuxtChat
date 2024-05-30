<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

import { h } from "vue";
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
import { useToast } from "@/components/ui/toast/use-toast";
const { $generateMessages } = useNuxtApp();

const { toast } = useToast();

const formSchema = toTypedSchema(
  z.object({
    nome: z
      .string()
      .min(2, { message: $generateMessages("O nome").min(2) })
      .max(50, { message: $generateMessages("O nome").max(50) }),
    senha: z.string().min(2, { message: $generateMessages("A senha").min(2) }),
  })
);

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
  navigateTo("/");
});
</script>

<template>
  <div class="absolute inset-0 flex h-full items-center justify-center">
    <div
      class="flex flex-col gap-4 md:w-[400px] bg-neutral-300 p-8 items-center justify-center"
    >
      <span class="font-bold">Registrar-se</span>
      <form class="flex flex-col gap-4 w-full" @submit.prevent="onSubmit">
        <FormField v-slot="{ componentField }" name="nome">
          <FormItem v-auto-animate>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormDescription>
              This is your public display name.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="senha">
          <FormItem v-auto-animate>
            <FormLabel>Senha</FormLabel>
            <FormControl>
              <Input type="text" placeholder="" v-bind="componentField" />
            </FormControl>
            <!--<FormDescription>
              This is your public display name.
            </FormDescription>-->
            <FormMessage />
          </FormItem>
        </FormField>
        <div class="flex justify-center">
          <Button type="submit"> Submit </Button>
        </div>
      </form>
    </div>
  </div>
</template>
