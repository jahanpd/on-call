<template>
    <div
        v-for="listItem in display" :key="listItem.did"
    >
        {{listItem}}
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default {
    name: 'Accordion',
    props: ["list"],
    data () {
        return {
            displayList: this.list
        }
    }
    
}
</script>

<style scoped>

</style>