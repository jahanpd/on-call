<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>CHADSVASC</ion-title>
            <ion-buttons slot="end">
            <ion-button @click="closeModal()">Close</ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <ion-card>
            <ion-card-content v-show="true">
                <form
                @submit.prevent="onSubmit(form, data)"
                >
                <ion-item>
                    <ion-label>age</ion-label>
                    <ion-input type=number v-model="form.age" ></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label>female</ion-label>
                    <ion-radio-group  v-model="form.female">
                        <ion-radio :value=true></ion-radio>
                    </ion-radio-group>
                </ion-item>
                <ion-item>
                    <ion-label>chf</ion-label>
                    <ion-radio-group v-model="form.chf">
                        <ion-radio :value=true></ion-radio>
                    </ion-radio-group>
                </ion-item>
                <ion-item>
                    <ion-label>htn</ion-label>
                    <ion-radio-group v-model="form.htn">
                        <ion-radio :value=true></ion-radio>
                    </ion-radio-group>
                </ion-item>
                <ion-item>
                    <ion-label>cva</ion-label>
                    <ion-radio-group v-model="form.cva">
                        <ion-radio :value=true></ion-radio>
                    </ion-radio-group>
                </ion-item>
                <ion-item>
                    <ion-label>vasc</ion-label>
                    <ion-radio-group v-model="form.vasc">
                        <ion-radio :value=true></ion-radio>
                    </ion-radio-group>
                </ion-item>
                <ion-item>
                    <ion-label>diabetes</ion-label>
                    <ion-radio-group v-model="form.diab">
                        <ion-radio :value=true></ion-radio>
                    </ion-radio-group>
                </ion-item>
                <ion-button
                    expand="block"
                    color="primary"
                    class="ion-margin-top"
                    type="submit"
                >
                    Submit
                </ion-button>
                </form>
            </ion-card-content>
        </ion-card>
        <ion-card-content v-if="form.errorMsg" class="error-message">
            {{ form.errorMsg }}
        </ion-card-content>
    </ion-content>
</template>

<script>
import { modalController } from "@ionic/vue";
import { IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, IonItem} from '@ionic/vue';
import { IonCardContent, IonCard } from '@ionic/vue';
import { IonButton, IonLabel, IonInput, IonRadio, IonRadioGroup} from '@ionic/vue';
import { defineComponent, reactive, toRefs} from 'vue';
import { doc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "../main";


export default defineComponent({
    name: 'Modal',
    props: {
        title: { type: String, default: 'Super Modal' },
        data:{ type: Object, default: () => {return {}} },
        content:{ type: String, default: 'Input here' }
    },
    components: {
        IonHeader,
        IonButtons,
        IonToolbar,
        IonTitle,
        IonContent,
        IonButton,
        IonLabel, 
        IonInput,
        IonItem,
        IonCardContent,
        IonCard,
        IonRadio,
        IonRadioGroup
    },
    setup() {
        const state = reactive({
        form:{
            age:64,
            female:false,
            chf:false,
            htn:false,
            cva:false,
            vasc:false,
            diab:false,
            errorMsg:"",
        },
        loaded:false
        });
        const closeModal = async () => {
            await modalController.dismiss();
        };
        const onSubmit = async (x, y) => {
            console.log(x);
            console.log(y);
            
            // calculate score
            let score = 0
            if (x.age >= 65) {
                score += 1
            }
            if (x.age >= 75){
                score += 1
            }
            if (x.female) {
                score += 1
            }
            if (x.chf) {
                score += 1
            }
            if (x.htn) {
                score += 1
            }
            if (x.cva) {
                score += 2
            }
            if (x.vasc) {
                score += 1
            }
            if (x.diab) {
                score += 1
            }
            x["score"] = score
            y.data["CHADSVASC"] = x

            const time = new Date();
            const newEntry = {
                timestamp: time,
                value: x
            }
            // check if a chadsvasc array, otherwise create one
            if (Object.keys(y.data).includes("CHADSVASC")){
                try {
                    const docRef = doc(db, 'referrals', y.did);
                    const update = {}
                    update["CHADSVASC"] = arrayUnion(newEntry);
                    await updateDoc(docRef, update);
                } catch (e) {
                    console.log(e);
                }
            } else {
                try {
                    const docRef = doc(db, 'referrals', y.did);
                    await setDoc(docRef, { CHADSVASC: [newEntry] }, { merge: true });
                } catch (e) {
                    console.log(e);
                }
            }
            await modalController.dismiss();
        };
        return {
            ...toRefs(state),
            closeModal,
            onSubmit,
        }
    }
});
</script>

<style scoped>

ion-textarea {
    height: 66px
}
textarea { height: auto; }

</style>