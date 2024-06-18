<script setup lang="ts">
import { toast, ToastAction } from "@/components/ui/toast";
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

const emit = defineEmits(["petRegistered"]);

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
    name: z
      .string({ required_error: $generateMessages("O nome").required })
      .min(1, { message: $generateMessages("O nome").min(1) }),
    coordinate_x: z
      .number({ required_error: $generateMessages("A coordenada x").required })
      .positive({ message: $generateMessages("A coordenada x").minNumber(1) }),
    coordinate_y: z
      .number({ required_error: $generateMessages("A coordenada y").required })
      .positive({ message: $generateMessages("A coordenada x").minNumber(1) }),
    breed: z
      .string({ required_error: $generateMessages("A raça").required })
      .min(6, { message: $generateMessages("A raça").min(6) }),
    type: z
      .string({ required_error: $generateMessages("O tipo").required })
      .min(1, { message: $generateMessages("O tipo").min(1) }),
    additional_info: z
      .string({
        required_error: $generateMessages("A informação adicional").required,
      })
      .min(1, { message: $generateMessages("O tipo").min(1) }),
    images: z
      .array(
        z
          .instanceof(File)
          .refine((file) => file.size <= MAX_FILE_SIZE, {
            message: "O tamanho da imagem não pode exceder 5MB",
          })
          .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
            message: "Tipo de imagem não suportado",
          })
      )
      .min(1, { message: "Pelo menos uma imagem é necessária" }),
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

  if (!files || files.length === 0) {
    alert("Pelo menos uma imagem é necessária");
    return;
  }

  for (let i = 0; i < files.length; i++) {
    formData.append("pet_images[]", files[i]);
  }

  await registerPet(formData);

  if (error.value) {
    return;
  }

  if (fileInput.value) {
    fileInput.value.value = "";
  }

  toast({ title: "Post cadastrado com sucesso" });

  resetForm();
  emit("petRegistered");
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
            <FormField v-slot="{ componentField }" name="images">
              <FormItem v-auto-animate>
                <FormLabel>Fotos</FormLabel><br />
                <FormControl>
                  <input
                    type="file"
                    ref="fileInput"
                    id="pet_images"
                    accept="image/*"
                    multiple
                    @change="componentField.onChange"
                  />
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
