<template>
    <ion-content class="ion-padding">
        <ion-list>
            <ion-item button @click="setFilter(data, 'open')">Unseen or Chasing Ix</ion-item>
            <ion-item button @click="setFilter(data, 'last24')">Last 24 hours</ion-item>
            <ion-item button @click="setFilter(data, 'datetime')">By Date</ion-item>
        </ion-list>
    </ion-content>
</template>

<script>
import { IonContent } from '@ionic/vue';
import { IonList, IonItem } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Popover',
    components: { IonContent, IonList, IonItem },
    props: {
        data:{ type: Object, default: () => {return {}} },

    },
    setup() {
        const setFilter = async (data, x) => {
            data['type'] = x;
        };
        return {
            setFilter,
        }
        }
});
</script>