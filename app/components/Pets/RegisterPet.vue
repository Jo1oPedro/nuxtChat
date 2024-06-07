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
import { usePetStore } from "~/stores/pet";
import { storeToRefs } from "pinia";

const open = ref(false);
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

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const { $generateMessages } = useNuxtApp();
const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, { message: $generateMessages("O nome").min(1) }),
    coordinate_x: z
      .number()
      .positive({ message: $generateMessages("A coordenada x").minNumber(1) }),
    coordinate_y: z
      .number()
      .positive({ message: $generateMessages("A coordenada x").minNumber(1) }),
    breed: z.string().min(6, { message: $generateMessages("A raça").min(6) }),
    type: z.string().min(1, { message: $generateMessages("O tipo").min(1) }),
    additional_info: z
      .string()
      .min(1, { message: $generateMessages("O tipo").min(1) }),
  })
);

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
});

const fileInput = ref(null);
const { error } = storeToRefs(usePetStore());
const { registerPet } = usePetStore();
const onSubmit = handleSubmit(async (values) => {
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("coordinate_x", values.coordinate_x.toString());
  formData.append("coordinate_y", values.coordinate_y.toString());
  formData.append("breed", values.breed);
  formData.append("type", values.type);
  formData.append("additional_info", values.additional_info);

  const files = fileInput.value.files;
  if (files) {
    for (let i = 0; i < files.length; i++) {
      formData.append("pet_images[]", files[i]);
    }
  }

  await registerPet(formData);

  if (fileInput.value) {
    fileInput.value.value = "";
  }

  resetForm();
});
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
          <form
            class="flex flex-col gap-4 w-full"
            @submit.prevent="onSubmit"
            enctype="multipart/form-data"
          >
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
                  <Input type="number" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="coordinate_y">
              <FormItem v-auto-animate>
                <FormLabel>Coordenada y</FormLabel>
                <FormControl>
                  <Input type="number" v-bind="componentField" />
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
                  <Input
                    type="text"
                    v-bind="componentField"
                    placeholder="cachorro, gato, etc"
                  />
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
            <div>
              <label for="pet_images">Fotos</label>
              <input
                type="file"
                ref="fileInput"
                id="pet_images"
                accept="image/*"
                multiple
              />
            </div>
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
