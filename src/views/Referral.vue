<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Referral</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Referral</ion-title>
        </ion-toolbar>
      </ion-header>
    
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
                  <ion-input v-model="form.name"></ion-input>
              </ion-item>
              <ion-item>
                  <ion-label position="stacked">dob</ion-label>
                  <ion-input v-model="form.dob" type="date" value="" ></ion-input>
              </ion-item>
              <ion-item>
                  <ion-label position="floating">urn/uid</ion-label>
                  <ion-input v-model="form.urn"></ion-input>
              </ion-item> 
              <ion-item>
                  <ion-label position="floating">sex</ion-label>
                  <ion-select v-model="form.sex">
                    <ion-select-option value="f">Female</ion-select-option>
                    <ion-select-option value="m">Male</ion-select-option>
                  </ion-select>
              </ion-item>
              <ion-item>
                  <ion-label position="floating">location</ion-label>
                  <ion-input v-model="form.location"></ion-input>
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
            <ion-item height=100% width=100%>
                <ion-label position="stacked">Brief history here</ion-label>
                <ion-textarea rows=10 height=100% auto-grow="false" v-model="form.story" clear-on-edit="false"></ion-textarea>
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
          <ion-item>
              <ion-label position="stacked">comorb</ion-label>
              <ion-textarea rows=3 v-model="form.comorb"  autogrow="false" clear-on-edit="false"></ion-textarea>
          </ion-item>
          <ion-item>
              <ion-label position="stacked">meds</ion-label>
              <ion-textarea rows=3 v-model="form.meds"  autogrow="false" clear-on-edit="false"></ion-textarea>
          </ion-item>
          <ion-item>
              <ion-label position="stacked">investigations</ion-label>
              <ion-textarea rows=3 v-model="form.inv"  autogrow="false" clear-on-edit="false"></ion-textarea>
          </ion-item>
          </form>
        </ion-card-content> 
      </ion-card>

      <ion-card>
        <ion-card-header button=true @click="openAccordion" color="light">
          diagnosis and plan
        </ion-card-header>
        <ion-card-content v-show="false">
          <form
          @submit.prevent=""
          >
          <ion-item>
              <ion-label position="stacked">working dx</ion-label>
              <ion-textarea rows=1 v-model="form.workingDx"  autogrow="false" clear-on-edit="false"></ion-textarea>
          </ion-item>
          <ion-item>
              <ion-label position="stacked">evidence for</ion-label>
              <ion-textarea rows=2 v-model="form.evidenceFor"  autogrow="false" clear-on-edit="false"></ion-textarea>
          </ion-item>
          <ion-item>
              <ion-label position="stacked">evidence against</ion-label>
              <ion-textarea rows=2 v-model="form.evidenceAgainst"  autogrow="false" clear-on-edit="false"></ion-textarea>
          </ion-item>
          <ion-item>
              <ion-label position="stacked">provisional plan</ion-label>
              <ion-textarea rows=3 v-model="form.plan"  autogrow="false" clear-on-edit="false"></ion-textarea>
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
          @submit.prevent="onSubmit(form)"
          >
          <ion-item>
              <ion-label position="floating">bowels last open</ion-label>
              <ion-datetime v-model="form.BLO" display-format="D/MMM/YYYY H:mm"></ion-datetime>
          </ion-item>
          <ion-item>
              <ion-label position="floating">last ate</ion-label>
              <ion-datetime v-model="form.lastAte" display-format="D/MMM/YYYY H:mm"></ion-datetime>
          </ion-item>
          <ion-item>
              <ion-label position="floating">last dose of blood thinners</ion-label>
              <ion-datetime v-model="form.bloodthin" display-format="D/MMM/YYYY H:mm"></ion-datetime>
          </ion-item>
          <ion-item>
              <ion-label position="floating">allergies</ion-label>
              <ion-input v-model="form.allergies"  autogrow="false" clear-on-edit="false"></ion-input>
          </ion-item>
          <ion-item>
              <ion-label position="floating">smoking history</ion-label>
              <ion-input v-model="form.smoking"  autogrow="false" clear-on-edit="false"></ion-input>
          </ion-item>
          <ion-item>
              <ion-label position="floating">bmi</ion-label>
              <ion-input v-model="form.bmi"  autogrow="false" clear-on-edit="false"></ion-input>
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
              <ion-datetime v-model="form.arrival" display-format="D/MMM/YYYY H:mm"></ion-datetime>
          </ion-item>
          <ion-item>
              <ion-label position="floating">home team (if consult)</ion-label>
              <ion-input v-model="form.consult"  autogrow="false" clear-on-edit="false"></ion-input> 
          </ion-item>
        </form>
        </ion-card-content> 
      </ion-card>
      <form @submit.prevent="onSubmit(form)">
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
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem} from '@ionic/vue';
import { IonSelect, IonSelectOption} from '@ionic/vue';
import { IonCardContent, IonCard, IonCardHeader } from '@ionic/vue';
import { IonButton, IonLabel, IonInput, IonTextarea, IonDatetime} from '@ionic/vue';
import { defineComponent, reactive, toRefs} from 'vue';
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../main";

export default defineComponent({
  components: { 
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
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
        name: "",
        dob: "",
        urn: "",
        location:"",
        sex:"",
        story:"",
        comorb:"",
        meds:"",
        inv:"",
        workingDx:"",
        evidenceFor:"",
        evidenceAgainst:"",
        plan:"",
        BLO:"",
        lastAte:"",
        allergies:"",
        bloodthin:"",
        smoking:"",
        bmi:"",
        arrival:"",
        consult:"",
        persist:"",
        errorMsg: "",
      }
    });

    const onSubmit = async (
      x: Record<string, any>
      ) => {
        try {
          if (+!!x.name + +!!x.dob + +!!x.urn < 2 ) {
            state.form.errorMsg = "Need two or more of [name, dob, urn]";
            return;
          }
          const dateTime = new Date();
          console.log(x);
          console.log(dateTime.toString());
          const user = auth.currentUser;
          if (user !== null) {
            const uid = user.uid;
            console.log(uid);
            // make sure each field is a timestamped array of objects
            const dataInput: Record<string, any> = {}
            for (const key in x){
              dataInput[key] = [{
                timestamp: dateTime,
                value: x[key]
              }];
              x[key]=""
            }
            dataInput["uid"] = uid;
            dataInput["timestamp"]=dateTime;
            dataInput["open"]=true;
            dataInput["seen"]=false;
            try {
              const docRef = await addDoc(collection(db, "referrals"), dataInput);
              console.log("written_data");
              console.log(docRef); 
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          }
        } catch (error) {
        state.form.errorMsg = "error";
      }
    };
    const openAccordion = async (event: any) => {
      // event.classList.toggle("active");
      const panel = event.target.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
        } else {
        panel.style.display = "block";
      }
    };
    return{
      ...toRefs(state),
      onSubmit,
      openAccordion
    }
  }

});

</script>

<style scoped>

</style>