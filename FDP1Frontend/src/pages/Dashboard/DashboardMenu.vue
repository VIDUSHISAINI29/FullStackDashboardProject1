<script setup>
import { ref } from 'vue';

import { useGlobalStore } from "@/stores/global";

    const global = useGlobalStore()


function displaySidebar(){
    global.isSideBarVisible = !global.isSideBarVisible
    console.log(global.isSideBarVisible);
    console.log('ia m in menu')
}
// import { useRouter } from 'vue-router';


// import { useAuth0 } from '@auth0/auth0-vue';
// const auth0 = useAuth0();
// const router = useRouter();

// function logout() {
//   auth0.logout({
//     logoutParams: {
//       returnTo: window.location.origin
//     }
//   }).then(() => {
//     router.push('/log-in'); // Or wherever you want to redirect after logout
//   }).catch((error) => {
//     console.log('Logout error:', error);
//   });

//   console.log('Logout function triggered');
// }

</script>

<template>
   <div  class="md:tw-hidden tw-w-full tw-flex tw-justify-between">
      <i @click="displaySidebar" class="ham md:tw-hidden tw-text-white tw-text-5xl ri-menu-2-fill"></i>
  
      <div class="tw-p-2 tw-w-28 tw-rounded-tl-full tw-rounded-br-full  tw-flex tw-justify-center tw-items-center   tw-text-center tw-bg-white">
                <span class="tw-text-base  tw-font-bold tw-bg-gradient-to-r tw-from-pink-500  tw-to-purple-500 tw-bg-clip-text tw-text-transparent tw-leading-none"> Dashboard
                </span>
            </div>
   
   </div>
</template>

<style scoped></style>
