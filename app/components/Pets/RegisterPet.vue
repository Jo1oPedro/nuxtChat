<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

const open = ref(true);
function toggleDialog() {
  if (
    open.value &&
    confirm(
      "Tem certeza que deseja sair? Todos os dados não salvos serão perdidos"
    )
  ) {
    open.value = false;
    return;
  } else if (!open.value) {
    open.value = true;
  }
}

function onSubmit() {
  alert("dALE");
}
</script>

<template>
  <Dialog :open="open">
    <DialogTrigger>
      <Button @click="toggleDialog">Cadastrar pet desaparecido</Button>
    </DialogTrigger>
    <DialogContent
      @close="toggleDialog()"
      @interact-outside="
        (event) => {
          //const target = event.target as HTMLElement;
          //if (target?.closest('[data-sonner-toaster]'))
          return event.preventDefault();
        }
      "
    >
      <DialogHeader>
        <DialogTitle></DialogTitle>
        <DialogDescription>
          <form class="flex flex-col gap-4 w-full" @submit.prevent="onSubmit">
            <FormField v-slot="{ componentField }" name="name">
              <FormItem v-auto-animate>
                <FormLabel>Nome do pet</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="coordinate_x">
              <FormItem v-auto-animate>
                <FormLabel>Coordenada x</FormLabel>
                <FormControl>
                  <Input type="number" v-bind="componentField" value="30" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="coordinate_y">
              <FormItem v-auto-animate>
                <FormLabel>Coordenada y</FormLabel>
                <FormControl>
                  <Input type="number" v-bind="componentField" value="30" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="breed">
              <FormItem v-auto-animate>
                <FormLabel>Raça</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="type">
              <FormItem v-auto-animate>
                <FormLabel>Tipo</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="additional_info">
              <FormItem v-auto-animate>
                <FormLabel>Informações adicionais</FormLabel>
                <FormControl>
                  <Textarea class="resize-none" v-bind="componentField" />
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
              <Button type="submit"> Cadastrar </Button>
            </div>
          </form>
        </DialogDescription>
      </DialogHeader>

      <DialogFooter></DialogFooter>
    </DialogContent>
  </Dialog>
</template>
