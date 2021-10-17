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
    
      <ion-grid>
        <ion-item button=true @click="openAccordion" color="light">
          details
        </ion-item>
        <ion-item v-show="false">
              <form
              @submit.prevent=""
              >
              <ion-item>
                  <ion-label position="floating">name</ion-label>
                  <ion-input v-model="form.name"></ion-input>
              </ion-item>
              <ion-item>
                  <ion-label position="floating">dob</ion-label>
                  <ion-datetime v-model="form.dob" display-format="DD/MM/YYYY"></ion-datetime>
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
        </ion-item>
      </ion-grid>
      
      <ion-grid>
        <ion-item button=true @click="openAccordion" color="light">
          story
        </ion-item>
        <ion-item v-show="false">
          <form
          @submit.prevent=""
          >
            <ion-item height=100% width=100%>
                <ion-label position="floating">Free text</ion-label>
                <ion-textarea height=100% auto-grow=true v-model="form.story" clear-on-edit="false"></ion-textarea>
            </ion-item>
          </form>
        </ion-item> 
      </ion-grid>

      <ion-grid>
        <ion-item button=true @click="openAccordion" color="light">
          other
        </ion-item>
        <ion-item v-show="false">
          <form
          @submit.prevent=""
          >
          <ion-item>
              <ion-label position="floating">comorb</ion-label>
              <ion-textarea v-model="form.comorb"  autoGrow="true" clear-on-edit="false"></ion-textarea>
          </ion-item>
          <ion-item>
              <ion-label position="floating">meds</ion-label>
              <ion-textarea v-model="form.meds"  autoGrow="true" clear-on-edit="false"></ion-textarea>
          </ion-item>
          <ion-item>
              <ion-label position="floating">investigations</ion-label>
              <ion-textarea v-model="form.inv"  autoGrow="true" clear-on-edit="false"></ion-textarea>
          </ion-item>
          </form>
        </ion-item> 
      </ion-grid>

      <ion-grid>
        <ion-item button=true @click="openAccordion" color="light">
          diagnosis
        </ion-item>
        <ion-item v-show="false">
          <form
          @submit.prevent=""
          >
          <ion-item>
              <ion-label position="floating">working dx</ion-label>
              <ion-textarea v-model="form.workingDx"  autoGrow="true" clear-on-edit="false"></ion-textarea>
          </ion-item>
          <ion-item>
              <ion-label position="floating">evidence for</ion-label>
              <ion-textarea v-model="form.evidenceFor"  autoGrow="true" clear-on-edit="false"></ion-textarea>
          </ion-item>
          <ion-item>
              <ion-label position="floating">evidence against</ion-label>
              <ion-textarea v-model="form.evidenceAgainst"  autoGrow="true" clear-on-edit="false"></ion-textarea>
          </ion-item>
          <ion-item>
              <ion-label position="floating">provisional plan</ion-label>
              <ion-textarea v-model="form.plan"  autoGrow="true" clear-on-edit="false"></ion-textarea>
          </ion-item>
          </form>
        </ion-item> 
      </ion-grid>

      <ion-grid>
        <ion-item button=true @click="openAccordion" color="light">
          misc
        </ion-item>
        <ion-item v-show="false">
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
              <ion-textarea v-model="form.allergies"  autoGrow="true" clear-on-edit="false"></ion-textarea>
          </ion-item>
          <ion-item>
              <ion-label position="floating">smoking history</ion-label>
              <ion-textarea v-model="form.smoking"  autoGrow="true" clear-on-edit="false"></ion-textarea>
          </ion-item>
          <ion-item>
              <ion-label position="floating">bmi</ion-label>
              <ion-textarea v-model="form.bmi"  autoGrow="true" clear-on-edit="false"></ion-textarea>
          </ion-item>
          </form>
        </ion-item> 
      </ion-grid>

      <ion-grid>
        <ion-item button=true @click="openAccordion" color="light">
          referral type information
        </ion-item>
        <ion-item v-show="false">
          <form
          @submit.prevent=""
          >
          <ion-item>
              <ion-label position="floating">arrival time (if transfer)</ion-label>
              <ion-datetime v-model="form.arrival" display-format="D/MMM/YYYY H:mm"></ion-datetime>
          </ion-item>
          <ion-item>
              <ion-label position="floating">consult team</ion-label>
              <ion-textarea v-model="form.consult"  autoGrow="true" clear-on-edit="false"></ion-textarea> 
          </ion-item>
        </form>
        </ion-item> 
      </ion-grid>
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
import { IonGrid } from '@ionic/vue';
import { IonCardContent, IonButton, IonLabel, IonInput, IonTextarea, IonDatetime} from '@ionic/vue';
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
    IonGrid
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
            x["uid"] = uid;
            x["timestamp"]=dateTime;
            try {
              const docRef = await addDoc(collection(db, "referrals"), x);
              console.log("written_data");
              console.log(docRef); 
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          }
          //console.log(user);
          // db structure
          // {referrals:{userID:{timestamp:{data

        } catch (error) {
        state.form.errorMsg = "error";
      }
    };
    const resetForm = async (
      x: Record<string, string>
    ) => {
      try {
        console.log("yolo")
        for (const key of Object.keys(x)){
          x[key] = ""
        }
      } catch (error) {
        console.log("didn't reset")
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
      resetForm,
      openAccordion
    }
  }

});

</script>

<style scoped>

ion-grid {
    height: auto;
    width: 100%
  }

</style>