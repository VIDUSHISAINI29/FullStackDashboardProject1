<script setup>

  
     
  </script>
  
<template>
    <div>
      <!-- No button needed, the user will be redirected automatically -->
     <span>This is detail view</span>
     <div class="tw-bg-green-300 tw-p-2 tw-mt-10">
            <DatePicker clearIcon v-model="yearAsParams" :minDate="minDate" :maxDate="maxDate" view="year" dateFormat="yy" />
        </div>
    </div>
  </template>
  
  