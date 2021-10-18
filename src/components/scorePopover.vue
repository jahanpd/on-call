<template>
    <ion-content class="ion-padding">
        <ion-list>
            <ion-item button @click="ohno">NELA</ion-item>
            <ion-item button @click="openForm(data, 'CHADSVASC')">CHADSVASC</ion-item>
            <ion-item button @click="ohno">APACHE</ion-item>
        </ion-list>
    </ion-content>
</template>

<script>
import { IonContent } from '@ionic/vue';
import { IonList, IonItem } from '@ionic/vue';
import { defineComponent } from 'vue';
import { modalController } from '@ionic/vue';
import ModalEdit from './editEntry.vue'
import ModalView from './viewEntry.vue'
import CHADSVASC from './CHADSVASC.vue'

export default defineComponent({
    name: 'Popover',
    components: { IonContent, IonList, IonItem },
    props: {
        data:{ type: Object, default: () => {return {}} },
    },
    setup() {
        const ohno = async () => {
            alert('only chadsvasc is implemented')
        };
        const openForm = async (dataDict, form) => {
            // define components here
            let Modal = ModalView
            let Title = 'Editing Entry'
            if (form == 'NELA') {
            Modal = ModalEdit;
            Title = 'NELA Score'
            } else if (form == 'CHADSVASC') {
            Modal = CHADSVASC;
            Title = 'CHADSVASC Score'
            } else if (form == 'APACHE') {
                Modal = ModalView;
                Title = 'APACHE Score'
            }
            const componentDict = {
            title: Title,
            data: dataDict,
            content:'test'
            };

            const modal = await modalController
            .create({
                component: Modal,
                componentProps: componentDict,
            })
            return modal.present()
        };
        return {
            openForm,
            ohno
        }
        }
});
</script>