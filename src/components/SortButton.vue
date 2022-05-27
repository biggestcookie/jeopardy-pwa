<script lang="ts" setup>
import { IonButton, IonButtons, IonIcon } from "@ionic/vue";
import { caretDownOutline, caretUpOutline } from "ionicons/icons";

const props = defineProps<{ isDescending: boolean }>();
const emit = defineEmits<{ (event: "setDescending", value: boolean): void }>();
</script>

<template>
  <ion-buttons slot="end">
    <ion-button @click="emit('setDescending', !props.isDescending)">
      <ion-icon
        slot="end"
        :icon="props.isDescending ? caretDownOutline : caretUpOutline"
      />
      {{ props.isDescending ? "Desc" : "Asc" }}
    </ion-button>
  </ion-buttons>
</template>
