<script setup>
import { useGlobalStore } from "@/stores/global";
import DashboardMenu from '@/pages/Dashboard/DashboardMenu.vue'
import DashboardSidebar from '@/pages/Dashboard/DashboardHome/DashboardSidebar.vue'
const global = useGlobalStore();

import { useAuth0 } from '@auth0/auth0-vue';

function displaySidebar() {
   global.isSideBarVisible = !global.isSideBarVisible;
   console.log(global.isSideBarVisible);
}
function displaySidebarFalse() {
   global.isSideBarVisible = false;
   console.log(global.isSideBarVisible);
}

import { useRouter } from 'vue-router';

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
    <div class="tw-relative tw-flex tw-w-full">
    <div
         @click="displaySidebarFalse"
         v-if="global.isSideBarVisible"
         class="overlay tw-fixed tw-right-0 tw-top-0 tw-z-10 tw-h-full tw-w-1/2 tw-bg-black tw-bg-opacity-50 tw-transition-transform"></div>
      <div
         class="navbar tw-flex tw-w-full tw-justify-between tw-bg-gradient-to-r tw-from-pink-600 tw-to-[#644ebb] tw-p-2 tw-px-4">
         <div class="tw-flex tw-w-full tw-justify-between md:tw-hidden">
            <DashboardMenu />
         </div>
         <div v-if="global.isSideBarVisible" class="tw-z-50">
            <DashboardSidebar />
         </div>

         <div
            class="largeScreen tw-hidden tw-w-full tw-justify-between md:tw-flex">
            <div
               class="tw-w-36 tw-rounded-br-full tw-rounded-tl-full tw-bg-white tw-p-2 tw-text-center">
               <span
                  class="tw-bg-gradient-to-r tw-from-pink-500 tw-to-purple-500 tw-bg-clip-text tw-text-sm tw-font-bold tw-leading-none tw-text-transparent md:tw-text-xl">
                  Dashboard
               </span>
            </div>
            <div class="tw-flex tw-gap-2">
               <div
                  class="tw-w-32 tw-rounded-br-full tw-rounded-tl-full tw-bg-white tw-p-2 tw-text-center">
                  <router-link to="/home"
                     class="tw-bg-gradient-to-r tw-from-pink-500 tw-to-purple-500 tw-bg-clip-text tw-text-xl tw-font-bold tw-leading-none tw-text-transparent">
                     Home
                  </router-link>
               </div>
               <div
                  class="tw-w-32 tw-rounded-br-full tw-rounded-tl-full tw-bg-white tw-p-2 tw-text-center tw-text-xl">
                  <router-link to="/details"
                     class="tw-bg-gradient-to-r tw-from-pink-500 tw-to-purple-500 tw-bg-clip-text tw-text-xl tw-font-bold tw-leading-none tw-text-transparent">
                     Details
                  </router-link>
               </div>
            </div>
            <div
               class="tw-w-32 tw-rounded-br-full tw-rounded-tl-full tw-bg-white tw-p-2 tw-text-center tw-text-xl">
               <button   @click="logout"
                  class="tw-bg-gradient-to-r tw-from-pink-500 tw-to-purple-500 tw-bg-clip-text tw-font-bold tw-leading-none tw-text-transparent">
                  Logout
               </button>
            </div>
         </div>
      </div>
</div>
</template>