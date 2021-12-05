<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>{{ title }}</ion-title>
            <ion-buttons slot="end">
            <ion-button @click="closeModal(data)">Close</ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">

        <ion-card v-if="testChase(data)">
            <ion-card-header>
                List of tests to chase
            </ion-card-header>
            <ion-list 
                v-for="d in data.data.chase.values.filter((a) => !a.chased)" :key="d.duedate"
                >
                <ion-item slot="start">
                    <ion-text slot="start">
                        {{ d.test }}
                    </ion-text>
                    <ion-text slot="start">
                        {{ d.duedate }}
                    </ion-text>
                    <ion-button slot="end" color="danger" @click="chased(d)">
                        chased
                    </ion-button>
                </ion-item>
            </ion-list>
        </ion-card>

        <ion-card v-else>
            <ion-card-content>
                Nothing to chase... Add something!
            </ion-card-content>
        </ion-card>

        <ion-card>
            <ion-card-header>
                Add New Test to Chase
            </ion-card-header>
            <ion-card-content>
                <form @submit.prevent="">
                    <ion-item>
                        <ion-label>
                            Investigation
                        </ion-label>
                        <ion-input v-model="form.test" >

                        </ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label>
                            Due Date
                        </ion-label>
                        <ion-datetime  v-model="form.duedate" display-format="D/MMM/YYYY H:mm">
                            
                        </ion-datetime>
                    </ion-item>
                </form>
            </ion-card-content>
        </ion-card>
        <form @submit.prevent="onSubmit(form, data)">
        <ion-button
            expand="block"
            color="primary"
            class="ion-margin-top"
            type="submit"
        >
            Submit
        </ion-button>
        </form>
        <ion-card-content v-if="form.errorMsg" class="error-message">
            {{ form.errorMsg }}
        </ion-card-content>
    </ion-content>
</template>

<script>
import { modalController } from "@ionic/vue";
import { IonButtons, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonItem} from '@ionic/vue';
import { IonCardContent, IonCard, IonCardHeader, IonList, IonText } from '@ionic/vue';
import { IonLabel, IonInput, IonDatetime } from '@ionic/vue';
import { defineComponent, reactive, toRefs} from 'vue';
import { doc, setDoc } from "firebase/firestore";
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
        IonButton,
        IonToolbar,
        IonTitle,
        IonContent,

        IonLabel, 
        IonInput,
        IonDatetime,        
        IonItem,
        
        IonCardContent,
        IonCard,
        IonCardHeader, 
        IonList,
        IonText
    },
    setup() {
        const state = reactive({
        form:{
            test:"",
            duedate:"",
            errorMsg:"",
        },
        loaded:false
        });
        const closeModal = async (data) => {
            // add db writing element here
            try {
                const docRef = doc(db, 'referrals', data.did);
                await setDoc(docRef, {"chase":data.data.chase }, { merge: true })
                console.log("chase list update")
            } catch (e) {
                state.form.errorMsg = "did not write to DB. Check internet or authentication"
                return;
            }
            console.log('closing modal');
            await modalController.dismiss();
        };
        function testChase (x) {
            if (Object.keys(x.data).includes('chase')) {
                if (x.data.chase.values.filter((a) => !a.chased).length > 0){
                    return "ok"
            } else {
                return ""
            }
            } else {
                const timestamp = new Date();
                x.data['chase'] = {values: [], 'timestamp':timestamp};
                console.log("added chase");
                return ""
            }
        }
        const chased = async (x) => {
            console.log(x)
            x.chased = true
        }
        const onSubmit = async (x, y) => {
            // x is the form, y is the data where y.data.chase is a list to append to
            if (!x.test || !x.duedate){
                state.form.errorMsg = "please fill in both test and due datetime for test";
                return;
            } else {
                state.form.errorMsg = ""
            }
            console.log(y)
            y.data.chase.values.push({
                test: x.test,
                duedate: x.duedate,
                chased: false
            })
            console.log(y)
        };
        const onChange = async(x) => {
            console.log(x)
        };
        return {
            ...toRefs(state),
            closeModal,
            testChase,
            onSubmit,
            onChange,
            chased

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