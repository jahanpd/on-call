<template>
  <div>
    <ion-list>
        <ion-item v-for="entry in comorb" :key="entry.val">
          <ion-label>{{entry.val}}</ion-label>
          <ion-checkbox
            slot="end"
            @update:modelValue="entry.isChecked = $event"
            :modelValue="entry.isChecked">
          </ion-checkbox>
        </ion-item>
      </ion-list>
    </div>
</template>

<script lang="ts">
import { IonCheckbox, IonItem, IonLabel, IonList } from '@ionic/vue';
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'Modal',
  props: {
    title: { type: String, default: 'Super Modal' },
  },
  components: { IonCheckbox, IonItem, IonLabel, IonList },
  setup() {
    const comorb = [
      { val: 'CCF', isChecked: false },
      { val: 'Cardiac arrhythmia', isChecked: false },
      { val: 'Valvular heart disease', isChecked: false }
    ];

    return { comorb };
  }
});
</script>