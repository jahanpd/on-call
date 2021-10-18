<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="primary">
          <ion-button @click="queryToggle" color="secondary" v-if="queryDateTime">
            OPEN CASES
          </ion-button>
          <ion-button @click="queryToggle" color="secondary" v-else>
            search by DATE
          </ion-button>
        </ion-buttons>
        <ion-title>List</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-grid v-if="queryDateTime">
      <ion-row>
        <ion-col>
          <ion-item>
            <ion-label position="floating">start shift</ion-label>
            <ion-datetime v-model="start" display-format="DD/MM/YYYY H:mm" ></ion-datetime>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-item>
            <ion-label position="floating">end shift</ion-label>
            <ion-datetime v-model="end" display-format="DD/MM/YYYY H:mm" ></ion-datetime>
          </ion-item>
        </ion-col>
      </ion-row>
      </ion-grid>
      
      <ion-grid v-if="returned>0">
        <ion-list v-for="d in data" :key="d.did">
          <ion-item button=true @click="openAccordion(d)" color="light">
            <p> <strong> {{d.data.name}} </strong> | {{ getDOBAgeStr(d.data.dob) }}</p>
          </ion-item>
          <ion-text v-if="d.show">
              <p class="inputText">
                <strong> Working Dx: </strong> {{ d.data.workingDx }}  <br>
                <strong> Evidence for dx: </strong> {{ d.data.evidenceFor }} <br>
                <strong> Evidence against dx: </strong> {{ d.data.evidenceAgainst }} <br>
                <strong> Story: </strong> {{ d.data.story }} <br>
              </p>
              <p class="inputText" v-if="Object.keys(d.data).includes('NELA')">
                <strong> NELA: </strong> {{ d.data.NELA }}
              </p>
              <p class="inputText" v-if="Object.keys(d.data).includes('CHADSVASC')">
                <strong> CHADSVASC: </strong> {{ d.data.CHADSVASC.score }} 
              </p>
          </ion-text>
          <ion-text>
          </ion-text>
  
          <ion-toolbar v-if="d.show">
            <ion-buttons slot="primary">
              <ion-button @click="openModal(d, 'edit')" color="secondary">
                edit
              </ion-button>
              <ion-button @click="openModal(d, 'view')" color="secondary">
                view
              </ion-button>  
            </ion-buttons>
            <ion-buttons slot="start">
              <ion-button @click="openPopover(d, $event)" color="secondary">
                  add score
              </ion-button>
              <ion-button v-if="d.data.open" @click="toggleCase(d)" color="secondary">
                  close case
              </ion-button>
              <ion-button v-else @click="toggleCase(d)" color="secondary">
                  open case
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-list>
      </ion-grid>

      <ion-card-content v-if="errorMsg" class="error-message">
            {{ errorMsg }}
      </ion-card-content>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList} from '@ionic/vue';
import { IonItem, IonLabel, IonDatetime, IonCardContent} from '@ionic/vue';
import { IonRefresher, IonRefresherContent } from '@ionic/vue';
import { IonGrid, IonRow, IonCol } from '@ionic/vue';
import { IonText, IonButtons, IonButton } from '@ionic/vue';
import { defineComponent, reactive, toRefs } from 'vue';
import { query, getDocs, collection, where, updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../main";
import { modalController, popoverController} from '@ionic/vue';
import ModalEdit from '../components/editEntry.vue'
import ModalView from '../components/viewEntry.vue'
import Popover from '../components/scorePopover.vue'

export default defineComponent({
  components: { 
    IonItem, IonLabel, IonDatetime, IonHeader, IonToolbar, IonTitle, IonContent, IonList,
    IonPage, IonRefresher, IonRefresherContent, IonCardContent, IonGrid, IonRow, IonCol,
    IonText, IonButtons, IonButton
    },
  setup() {
    const state = reactive({
      start:"",
      end:"",
      data:[{}],
      errorMsg:"",
      returned:0,
      queryDateTime:false,
      modalState:null,
      formSelect:"",
    });

    const doRefresh = async (event: any) => {
      state.errorMsg = "";
      const user = auth.currentUser;
      console.log('Begin async operation');
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete()
      }, 2000);
      if (!user) {
        state.errorMsg = "user not authenticated";
        return;
      }
      if (!state.start && !state.end && state.queryDateTime){
        state.errorMsg = "input datetime range";
        return;
      }
      const uid = user.uid;
      try {
        const coll = collection(db, "referrals");
        const start = new Date(state.start);
        const end = new Date(state.end);
        let q
        if (state.queryDateTime) {
          q = query(coll, where("uid", "==", uid), where("timestamp", ">", start));
        } else {
          q = query(coll, where("uid", "==", uid), where("open", "==", true));
        }
        const querySnapshot = await getDocs(q);
        const dataList: Array<Record<any, any>> = [];
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
          const docBuild: Record<string, any> = {};
          const data = doc.data();
          for (const key in data){
            if (Array.isArray(data[key])){
              const featArray = data[key];
              featArray.sort((a: any, b: any) => (a.timestamp > b.timestamp) ? -1 : ((b.timestamp > a.timestamp) ? 1 : 0));
              docBuild[key] = featArray[0].value
            } else {
              docBuild[key] = data[key]
            }
          }
          const did = doc.id;
          if (docBuild.timestamp.toDate() <= end || !state.queryDateTime){
            const save = {
              did:did,
              data:docBuild,
              show:false
            }
            dataList.push(save)
            }
        });
        state.data = dataList;
        state.returned = dataList.length
        if (dataList.length == 0){
          state.errorMsg = "Either no records in chosen timeperiod or none are currently open";
          return;
        }
      } catch (error){
        console.log(error);
        state.errorMsg = "failed to get data from database";
        alert('query failed, check internet connection or try logging in again')
        return;
      }
    };

    const openAccordion = async (d: any) => {
      d.show = !d.show
    };

    const getDOBAgeStr = (x: string) => {
      const today: any = new Date();
      const birthday: any = new Date(x);
      const diff = today - birthday
      const years = new Date(diff).getFullYear() - 1970;
      const outStr = birthday.toLocaleDateString('en-GB') + ' (' + years.toString() + ' years)'
      return outStr
    };
    const queryToggle = async () => {
      state.queryDateTime = !state.queryDateTime
    };
    const openModal = async (dataDict: any, view: string) => {
      // define components here
      let Modal = ModalView
      let Title = 'Editing Entry'
      if (view == 'edit') {
        Modal = ModalEdit;
        Title = 'Editing Entry'
      } else if (view == 'view') {
        Modal = ModalView;
        Title = 'View Entry'
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
  
    const openPopover = async (dataDict: any, ev: Event) => {
      const popover = await popoverController
        .create({
          component: Popover,
          event: ev,
          translucent: true,
          componentProps: {
            data: dataDict
          }
        })
      await popover.present();

      const { role } = await popover.onDidDismiss();
      console.log("dismissed with ", role)
    };
    const toggleCase = async (dataDict: any) => {
      try {
        const newOpen = !dataDict.data.open;
        const docRef = doc(db, 'referrals', dataDict.did);
        await updateDoc(docRef, {
          "open":newOpen
        });
        dataDict.data["open"] = newOpen;
      } catch (e) {
        console.log(e);
        alert('didnt update database, check internet connection or log in again')
      }
    };
    return { 
      ...toRefs(state),
      doRefresh,
      openAccordion,
      getDOBAgeStr,
      queryToggle,
      openModal,
      openPopover,
      toggleCase
      }
  }
});

</script>

<style scoped>
.accordion {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  text-align: left;
  border: none;
  outline: none;
  transition: 0.4s;
  box-sizing: border-box;
}

/* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
.active, .accordion:hover {
  background-color: #ccc;
}

/* Style the accordion panel. Note: hidden by default */
.panel {
  padding: 0 18px;
  background-color: white;
  display: none;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box
}

.inputText {
  padding: 0% 2% 0%;
}
</style>