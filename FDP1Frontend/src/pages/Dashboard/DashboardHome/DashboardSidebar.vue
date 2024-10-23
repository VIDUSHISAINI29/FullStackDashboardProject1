<script setup>
import { ref } from 'vue';

import { useGlobalStore } from "@/stores/global";



    const global = useGlobalStore()


function displaySidebar(){
    global.isSideBarVisible = !global.isSideBarVisible
    console.log(global.isSideBarVisible);
}

import { useRouter } from 'vue-router';


import { useAuth0 } from '@auth0/auth0-vue';
const auth0 = useAuth0();
const router = useRouter();

function logout() {
  auth0.logout({
    logoutParams: {
      returnTo: window.location.origin
    }
  }).then(() => {
    router.push('/log-in'); // Or wherever you want to redirect after logout
  }).catch((error) => {
    console.log('Logout error:', error);
  });

  console.log('Logout function triggered');
}

</script>

<template>
   <div class="tw-w-1/2 tw-transition-all tw-z-50 tw-flex tw-justify-between tw-p-2 tw-bg-gradient-to-t tw-from-pink-400 tw-to-purple-400  tw-min-h-screen  tw-fixed tw-overflow-y-scroll  tw-top-0 tw-left-0">
    
    <div class="tw-flex tw-flex-col tw-justify-center tw-gap-4 tw-w-full tw-items-center">
        
           
                <div class="tw-p-2 tw-w-24 tw-rounded-tl-full tw-rounded-br-full   tw-text-center tw-bg-white">
                    <span class="tw-text-sm md:tw-text-xl tw-font-bold tw-bg-gradient-to-r tw-from-pink-500  tw-to-purple-500 tw-bg-clip-text tw-text-transparent tw-leading-none"> Home
                    </span>
                </div>
                <div class="tw-p-2  tw-text-xl tw-w-24 tw-rounded-tl-full tw-rounded-br-full   tw-text-center tw-bg-white">
                    <span class="tw-text-sm md:tw-text-xl tw-font-bold tw-bg-gradient-to-r tw-from-pink-500  tw-to-purple-500 tw-bg-clip-text tw-text-transparent tw-leading-none"> Details
                    </span>
                </div>
           
            <div class="tw-p-2  tw-w-24 tw-rounded-tl-full tw-rounded-br-full   tw-text-center tw-bg-white">
                <button @click="logout" class="tw-text-sm md:tw-text-xl tw-font-bold tw-bg-gradient-to-r tw-from-pink-500  tw-to-purple-500 tw-bg-clip-text tw-text-transparent tw-leading-none"> Logout
                </button>
            </div>
    </div>
    <i @click="displaySidebar" class="cross tw-w-7 tw-text-center  tw-h-7 tw-text-white tw-text-3xl ri-close-line"></i>
    
   </div>
</template>

<style scoped></style>
