<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>List</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">List</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-grid>
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
        <ion-grid v-if="data[0].did">
        <ion-list v-for="d in data" :key="d.did">
          <ion-item button=true @click="openAccordion" color="light">
            {{d.did}}
          </ion-item>
          <ion-item v-show="false">
              {{d.data.name}}
          </ion-item>
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
import { defineComponent, reactive, toRefs} from 'vue';
import { query, getDocs, collection, where } from "firebase/firestore";
import { auth, db } from "../main";

export default defineComponent({
  components: { 
    IonItem, IonLabel, IonDatetime, IonHeader, IonToolbar, IonTitle, IonContent, IonList,
    IonPage, IonRefresher, IonRefresherContent, IonCardContent, IonGrid, IonRow, IonCol
    },
  setup() {
    const state = reactive({
      start:"",
      end:"",
      data:[{}],
      accordion:true,
      errorMsg:""
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
      console.log(state.start);
      if (!state.start && !state.end){
        state.errorMsg = "input datetime range";
        return;
      }
      const uid = user.uid;
      console.log(uid);
      try {
        const coll = collection(db, "referrals");
        const start = new Date(state.start);
        const end = new Date(state.end);
        const q = query(coll, where("uid", "==", uid), where("timestamp", ">", start));
        const querySnapshot = await getDocs(q);
        const dataList: Array<Record<any, any>> = [];
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
          const data = doc.data();
          data["isOpen"]=false;
          const did = doc.id;
          console.log(did);
          if (data.timestamp <= end){
            const save = {
              did:did,
              data:data
            }
            dataList.push(save)
            }
        });
        // order dataList by timestamps with larger timestamps first
        dataList.sort((a, b) => (a.data.timestamp > b.data.timestamp) ? -1: ((b.data.timestamp > a.data.timestamp) ? 1 : 0));
        // only choose first element occurring from repeated datapoints
        const dids = dataList.map(x => x.did)
        const dataListFiltered = dataList.filter((item, i) => dids.indexOf(item.did) === i);
        state.data = dataListFiltered;
        console.log(dataListFiltered);
      } catch (error){
        console.log(error);
        state.errorMsg = "failed to get data from database"
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
    return { 
      ...toRefs(state),
      doRefresh,
      openAccordion
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
</style>