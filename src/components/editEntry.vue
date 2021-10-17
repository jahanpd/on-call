<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>{{ title }}</ion-title>
            <ion-buttons slot="end">
            <ion-button @click="closeModal()">Close</ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <ion-card>
            <ion-card-header button=true @click="openAccordion" color="light">
            details
            </ion-card-header>
            <ion-card-content v-show="false">
                <form
                @submit.prevent=""
                >
                <ion-item>
                    <ion-label position="floating">name</ion-label>
                    <ion-input v-model="initData.data.name" :value="data.data.name" ></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="floating">dob</ion-label>
                    <ion-datetime v-model="initData.data.dob" display-format="DD/MM/YYYY" :value="data.data.dob"></ion-datetime>
                </ion-item>
                <ion-item>
                    <ion-label position="floating">urn/uid</ion-label>
                    <ion-input v-model="initData.data.urn" :value="data.data.urn"></ion-input>
                </ion-item> 
                <ion-item>
                    <ion-label position="floating">sex</ion-label>
                    <ion-select v-model="initData.data.sex" :value="data.data.sex">
                        <ion-select-option value="f">Female</ion-select-option>
                        <ion-select-option value="m">Male</ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-item>
                    <ion-label position="floating">location</ion-label>
                    <ion-input v-model="initData.data.location" :value="data.data.location"></ion-input>
                </ion-item> 
                </form>
            </ion-card-content>
        </ion-card>
        
        <ion-card>
            <ion-card-header button=true @click="openAccordion" color="light">
            story
            </ion-card-header>
            <ion-card-content v-show="false">
            <form
            @submit.prevent=""
            >
                <ion-item height=100% width=100% >
                    <ion-label position="stacked">Brief history here</ion-label>
                    <ion-textarea rows=10
                    height=100% auto-grow="false" v-model="initData.data.story" clear-on-edit="false" :value="data.data.story">
                    </ion-textarea>
                </ion-item>
            </form>
            </ion-card-content> 
        </ion-card>

        <ion-card>
            <ion-card-header button=true @click="openAccordion" color="light">
            other
            </ion-card-header>
            <ion-card-content v-show="false">
            <form
            @submit.prevent=""
            >
            <ion-item >
                <ion-label position="stacked">comorb</ion-label>
                <ion-textarea rows=3 v-model="initData.data.comorb"  autogrow="false" clear-on-edit="false" :value="data.data.comorb"></ion-textarea>
            </ion-item>
            <ion-item >
                <ion-label position="stacked">meds</ion-label>
                <ion-textarea rows=3 v-model="initData.data.meds"  autogrow="false" clear-on-edit="false" :value="data.data.meds"></ion-textarea>
            </ion-item>
            <ion-item >
                <ion-label position="stacked">investigations</ion-label>
                <ion-textarea rows=3 v-model="initData.data.inv"  autogrow="false" clear-on-edit="false" :value="data.data.inv"></ion-textarea>
            </ion-item>
            </form>
            </ion-card-content> 
        </ion-card>

        <ion-card>
            <ion-card-header button=true @click="openAccordion" color="light">
            diagnosis
            </ion-card-header>
            <ion-card-content v-show="false">
            <form
            @submit.prevent=""
            >
            <ion-item >
                <ion-label position="stacked">working dx</ion-label>
                <ion-textarea rows=1 v-model="initData.data.workingDx"  autogrow="false" clear-on-edit="false" :value="data.data.workingDx"></ion-textarea>
            </ion-item>
            <ion-item >
                <ion-label position="stacked">evidence for</ion-label>
                <ion-textarea rows=2 v-model="initData.data.evidenceFor"  autogrow="false" clear-on-edit="false" :value="data.data.evidenceFor"></ion-textarea>
            </ion-item>
            <ion-item >
                <ion-label position="stacked">evidence against</ion-label>
                <ion-textarea rows=2 v-model="initData.data.evidenceAgainst"  autogrow="false" clear-on-edit="false" :value="data.data.evidenceAgainst"></ion-textarea>
            </ion-item>
            <ion-item>
                <ion-label position="stacked">provisional plan</ion-label>
                <ion-textarea rows=3 v-model="initData.data.plan"  autogrow="false" clear-on-edit="false" :value="data.data.plan"></ion-textarea>
            </ion-item>
            </form>
            </ion-card-content> 
        </ion-card>

        <ion-card>
            <ion-card-header button=true @click="openAccordion" color="light">
            misc
            </ion-card-header>
            <ion-card-content v-show="false">
            <form
            @submit.prevent=""
            >
            <ion-item>
                <ion-label position="floating">bowels last open</ion-label>
                <ion-datetime v-model="initData.data.BLO" display-format="D/MMM/YYYY H:mm" :value="data.data.BLO"></ion-datetime>
            </ion-item>
            <ion-item>
                <ion-label position="floating">last ate</ion-label>
                <ion-datetime v-model="initData.data.lastAte" display-format="D/MMM/YYYY H:mm" :value="data.data.lastAte"></ion-datetime>
            </ion-item>
            <ion-item>
                <ion-label position="floating">last dose of blood thinners</ion-label>
                <ion-datetime v-model="initData.data.bloodthin" display-format="D/MMM/YYYY H:mm" :value="data.data.bloodthin"></ion-datetime>
            </ion-item>
            <ion-item>
                <ion-label position="floating">allergies</ion-label>
                <ion-input v-model="initData.data.allergies"  autogrow="false" clear-on-edit="false" :value="data.data.allergies"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="floating">smoking history</ion-label>
                <ion-input v-model="initData.data.smoking"  autogrow="false" clear-on-edit="false" :value="data.data.smoking"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="floating">bmi</ion-label>
                <ion-input v-model="initData.data.bmi"  autogrow="false" clear-on-edit="false" :value="data.data.bmi"></ion-input>
            </ion-item>
            </form>
            </ion-card-content> 
        </ion-card>

        <ion-card>
            <ion-card-header button=true @click="openAccordion" color="light">
            referral type information
            </ion-card-header>
            <ion-card-content v-show="false">
            <form
            @submit.prevent=""
            >
            <ion-item>
                <ion-label position="floating">projected arrival time (if transfer)</ion-label>
                <ion-datetime v-model="initData.data.arrival" display-format="D/MMM/YYYY H:mm" :value="data.data.arrival"></ion-datetime>
            </ion-item>
            <ion-item>
                <ion-label position="floating">home team (if consult)</ion-label>
                <ion-input v-model="initData.data.consult"  autogrow="false" clear-on-edit="false" :value="data.data.consult"></ion-input> 
            </ion-item>
            </form>
            </ion-card-content> 
        </ion-card>
        <form @submit.prevent="onSubmit(initData, data)">
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
import { IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, IonItem} from '@ionic/vue';
import { IonSelect, IonSelectOption} from '@ionic/vue';
import { IonCardContent, IonCard, IonCardHeader } from '@ionic/vue';
import { IonButton, IonLabel, IonInput, IonTextarea, IonDatetime} from '@ionic/vue';
import { defineComponent, reactive, toRefs} from 'vue';
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth, db } from "../main";


export default defineComponent({
    name: 'Modal',
    props: {
        title: { type: String, default: 'Super Modal' },
        data:{ type: Object, default: () => {return {}} },
        content:{ type: String, default: 'Input here' }
    },
    data() {
        const dataCopy = {
            data: {}
        }
        for (const key in this.data.data) {
            dataCopy.data[key] = this.data.data[key]
        }
        console.log(dataCopy)
        return {
            initData: dataCopy
        }
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
        IonTextarea,
        IonDatetime,
        IonItem,
        IonSelect,
        IonSelectOption,
        IonCardContent,
        IonCard,
        IonCardHeader
    },
    setup() {
        const state = reactive({
        form:{
            errorMsg:"",
        },
        loaded:false
        });
        const closeModal = async () => {
            await modalController.dismiss();
        };
        const openAccordion = async (event) => {
            // event.classList.toggle("active");
            const panel = event.target.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
                } else {
                panel.style.display = "block";
            }
            };
        const onSubmit = async (x, y) => {
            for (const key in x.data) {
                if (x.data[key] == y.data[key]){
                    continue
                } else {
                    // write change data to db and change local data
                    try {
                        const time = new Date();
                        console.log(y.did)
                        const docRef = doc(db, 'referrals', y.did);
                        const update = {};
                        update[key] = arrayUnion({
                                timestamp: time,
                                value: x.data[key]
                            });
                        console.log(update);
                        await updateDoc(docRef, update);
                        console.log("updated");
                        y.data[key] = x.data[key];
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        };
        const onChange = async(x) => {
            console.log(x)
        };
        return {
            ...toRefs(state),
            closeModal,
            openAccordion,
            onSubmit,
            onChange
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