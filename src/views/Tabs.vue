<template>
  <ion-page>


    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">

        <ion-tab-button tab="referral" href="/tabs/referral">
          <ion-icon :icon="personAddOutline" />
          <ion-label>referral</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="list" href="/tabs/list">
          <ion-icon :icon="listCircleOutline" />
          <ion-label>list</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="tools" href="/tabs/tools">
          <ion-icon :icon="menuOutline" />
          <ion-label>menu</ion-label>
        </ion-tab-button>
        
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { personAddOutline, listCircleOutline, menuOutline} from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
      personAddOutline, 
      listCircleOutline, 
      menuOutline
    }
  }
}
</script>