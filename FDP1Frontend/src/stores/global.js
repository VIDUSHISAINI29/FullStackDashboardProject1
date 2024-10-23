import {ref, computed} from 'vue';
import{ defineStore} from 'pinia';
export const useGlobalStore = defineStore('global', () =>{
    const isSideBarVisible = ref(false)
    return {isSideBarVisible}
})