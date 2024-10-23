<script setup>

import { onMounted, reactive, ref, defineAsyncComponent } from "vue";
import axios from "axios";

import { useGlobalStore } from "@/stores/global";
import { color } from "echarts";
import DatePicker from 'primevue/datepicker';
import dayjs from "dayjs";
const global = useGlobalStore();
const Select = defineAsyncComponent(() => import("primevue/select"));

const rankdedDepartmentsData = ref(null);
const optionsRankingDepartments = ref(null);
const topDepartment = ref(null);
const resultYear = ref(null);
const totalStudents = ref(null);
const optionsTotalStudents = ref(null);
const optionsEmpPerDepartment = ref(null);
let employeeCount = reactive([null]);
const employeeCountDirect = ref(null);
const topperOfYear = ref(null);
const topDepartmentOfYear = ref(null);
const studentsPerDepartment = ref(null);
const optionsStuPerDepartment = ref(null);



// let today = new Date('01-01-2016');
// // let month = today.getMonth();
// // let year = today.getFullYear();

// const yearAsParams = ref(null);
// const minDate = ref(new Date());
// const maxDate = ref(new Date());

// minDate.value = '2016'
// maxDate.value = '2022'

// const empDepartmentNameArray = ref(null);
// const numberOfEmployees = ref(null)

const employeePerDepartment = ref(null);

function displaySidebar() {
   global.isSideBarVisible = !global.isSideBarVisible;
   console.log(global.isSideBarVisible);
}
function displaySidebarFalse() {
   global.isSideBarVisible = false;
   console.log(global.isSideBarVisible);
}

const fetchData = async (api) => {
   try {
      const result = await axios.post(api);
      return result.data;
   } catch (error) {
      console.log("error in fetching api", error);
   }
};

const graphRankingDepartments = async (departmentsNumber) => {
   const y_data = rankdedDepartmentsData.value
      .map((arr) => arr.Percentage)
      .slice(0, departmentsNumber);

   const x_data = rankdedDepartmentsData.value
      .map((arr) => arr.Department_Name)
      .slice(0, departmentsNumber);

   topDepartment.value = x_data[0];
   resultYear.value = rankdedDepartmentsData.value
      .map((arr) => arr.Year_Of_Result)
      .slice(0, 1)[0];

   optionsRankingDepartments.value = {
      tooltip: {
         trigger: "axis", // Show tooltip when hovering on the axis (common for bar charts)
         axisPointer: {
            type: "shadow", // Type of pointer (shadow for bar charts)
         },
      },

      title: {
         top: "30px",
         text: "Department Performance Rankings", // Main title for the chart
         left: "center", // Position the title in the center
         textStyle: {
            fontSize: 18, // Adjust title font size
            fontWeight: "bold",
         },
      },

      grid: {
         left: "20%",
         right: "10%",
         bottom: "20%",
         top: "20%", // Adjust the grid top to leave room for the title
      },

      xAxis: {
         type: "category",
         data: x_data,
         name: "Departments",
         nameLocation: "middle",
         nameTextStyle: {
            fontSize: 14,
            padding: 15,
         },
         axisLabel: {
            show: false,
         },
      },
      yAxis: {
         type: "value",
         name: "Percentage (%)",
         nameLocation: "middle",
         nameTextStyle: {
            fontSize: 14,
            padding: 20,
         },
      },
      series: [
         {
            data: y_data,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
               color: "rgba(180, 180, 180, 0.2)",
            },
            itemStyle: {
               color: "#5d4bb9",
            },
         },
      ],
   };
};
const graphTotalStudents = async () => {
   optionsTotalStudents.value = {
      backgroundColor: "transparent", // Optional: set the background to transparent
      xAxis: {
         type: "category",
         data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
         axisLine: {
            show: false, // Hide the x-axis line
         },
         splitLine: {
            show: false, // Hide the vertical grid lines
         },
         axisLabel: {
            show: false, // Hide the x-axis labels
         },
      },
      yAxis: {
         type: "value",
         axisLine: {
            show: false, // Hide the y-axis line
         },
         splitLine: {
            show: false, // Hide the horizontal grid lines
         },
         axisLabel: {
            show: false, // Hide the y-axis labels
         },
      },
      series: [
         {
            data: [5, 6, 5.5, 7, 6.5, 7, 5],
            type: "line",
            lineStyle: {
               color: "#000", // Set the color of the line
               width: 2, // Set the width of the line
            },
            areaStyle: {
               // This will ensure no area is filled under the line
               opacity: 10, // Make area invisible
            },
         },
      ],
      tooltip: {
         trigger: "none", // Disable tooltips if desired
      },
   };
};

const graphEmployeesPerDepartment = async () => {
   const dep_data = employeePerDepartment.value
      .map((arr) => arr.Department_Name)
      .slice(0, 10);
   const emp_data = employeePerDepartment.value
      .map((arr) => arr.Employee_Count)
      .slice(0, 10);

   optionsEmpPerDepartment.value = {
      tooltip: {
         trigger: "axis", // Show tooltip when hovering on the axis (common for bar charts)
         axisPointer: {
            // type: "shadow", // Type of pointer (shadow for bar charts)
         },
      },

      title: {
         top: "10px",
         text: "Number of Employees in Departments", // Main title for the chart
         left: "center", // Position the title in the center
         textStyle: {
            fontSize: 18, // Adjust title font size
            fontWeight: "bold",
         },
      },
      grid: {
         left: "15%",
         right: "5%",
         top: "10%",
         bottom: "15%",
      },
      xAxis: {
         type: "category",
         data: dep_data,
         name: "Departments",
         nameLocation: "middle",
         nameTextStyle: {
            fontSize: 15,
            padding: 15,
         },
         axisLabel: {
            show: false,
         },
      },
      yAxis: {
         type: "value",
         name: "Number of Employees",
         nameLocation: "middle",
         nameTextStyle: {
            fontSize: 14,
            padding: 40,
         },
      },
      series: [
         {
            data: emp_data,
            type: "line",
            symbol: "triangle",
            symbolSize: 20,
            lineStyle: {
               color: "#feb92e",
               width: 5,
               type: "dashed",
            },
            itemStyle: {
               borderWidth: 3,
               borderColor: "#f67e59",
               color: "#f67e59",
            },
         },
      ],
   };
};

const graphStudentsPerDepartment = async () => {
   const finalData = studentsPerDepartment.value
      .map((arr) => {
         return {
            value: arr.Students_Count,
            name: arr.Department_Name,
         };
      })
      .slice(0, 7);
   console.log("i am finalData", finalData);

   optionsStuPerDepartment.value = {
      tooltip: {
         trigger: "item",
         font: 8,
      },
      title: {
         top: "12px",
         padding: 5,
         text: "Number of Students in Departments", // Main title for the chart
         left: "center", // Position the title in the center
         textStyle: {
            fontSize: 18, // Adjust title font size
            fontWeight: "bold",
         },
      },

      color: [
         "#feb92e",
         "#44c4f3",
         "#af82e3",
         "#fc8452",
         "#ba53a6",
         "#483da7",
         "#ea4582",
      ],

      series: [
         {
            top: "5%",
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
               borderRadius: 10,
               borderColor: "#fff",
               borderWidth: 2,
            },
            label: {
               show: false,
               position: "center",
            },
            emphasis: {
               label: {
                  show: true,
                  fontSize: 10,
                  fontWeight: "bold",
               },
            },
            labelLine: {
               show: false,
            },
            data: finalData,
         },
      ],
   };
};

async function getTopper() {
   topperOfYear.value = await rankdedDepartmentsData.value
      .map((arr) => arr.Student_ID)
      .slice(0, 1)[0];
}

onMounted(async () => {
   rankdedDepartmentsData.value = await fetchData(
      `${import.meta.env.VITE_BACKEND_URL}/departments`,
   );
   totalStudents.value = await fetchData(
      `${import.meta.env.VITE_BACKEND_URL}/students`,
   );
   employeePerDepartment.value = await fetchData(
      `${import.meta.env.VITE_BACKEND_URL}/employees-per-department`,
   );
   employeeCount = await fetchData(
      `${import.meta.env.VITE_BACKEND_URL}/employees-count`,
   );
   studentsPerDepartment.value = await fetchData(
      `${import.meta.env.VITE_BACKEND_URL}/students-per-department`,
   );
   //    employeeCountDirect.value = employeeCount.value[0]
   //    console.log(employeeCountDirect.value);

   await graphRankingDepartments(10);
   await graphTotalStudents();
   await graphEmployeesPerDepartment();
   await getTopper();
   await graphStudentsPerDepartment();
});
</script>

<template>
   <div class="tw-relative tw-w-full">
      <!-- <DashboardSidebar /> -->
      
      <div class="tw-flex tw-w-full tw-flex-col">
       
         <div
            class="KpiContainer tw-m-10 tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-gap-5 tw-p-1 sm:tw-gap-10 md:tw-flex md:tw-flex-nowrap">
            <div
               class="tw-flex tw-h-28 tw-w-48 tw-flex-col tw-justify-center tw-rounded-xl tw-bg-gradient-to-br tw-from-[#feb92e] tw-to-[#f67e59] tw-p-2 lg:tw-w-52">
               <span
                  class="tw-text-center tw-text-xl tw-font-semibold tw-text-white">
                  {{ totalStudents }}
                  <br />
                  Total Students
               </span>
            </div>
            <div
               class="tw-flex tw-h-28 tw-w-48 tw-flex-col tw-justify-center tw-rounded-xl tw-bg-gradient-to-br tw-from-[#44c4f3] tw-to-[#4e86cf] tw-p-2 lg:tw-w-52">
               <span
                  class="tw-text-center tw-text-xl tw-font-semibold tw-text-white">
                  {{ employeeCount[0] }}
                  <br />
                  Total Employees
               </span>
            </div>
            <div
               class="tw-flex tw-h-28 tw-w-48 tw-flex-col tw-justify-center tw-rounded-xl tw-bg-gradient-to-br tw-from-[#af82e3] tw-to-[#483da7] tw-p-2 lg:tw-w-52">
               <span
                  class="tw-text-center tw-text-xl tw-font-semibold tw-text-white">
                  {{ topperOfYear }}
                  <br />
                  Topper of Year
               </span>
            </div>
            <div
               class="tw-flex tw-h-28 tw-w-48 tw-flex-col tw-justify-center tw-rounded-xl tw-bg-gradient-to-br tw-from-[#ea4582] tw-to-[#ba53a6] tw-p-2 lg:tw-w-52">
               <span
                  class="tw-text-center tw-text-xl tw-font-semibold tw-text-white">
                  {{ topDepartment }}
                  <br />
                  Top Department
               </span>
            </div>
         </div>

         <div
            class="tw-flex tw-w-full tw-items-center tw-justify-center tw-gap-10">
            <div
               class="tw-m-3 tw-flex tw-w-full tw-items-center tw-justify-center tw-rounded-2xl tw-shadow-2xl md:tw-w-[600px]">
               <v-chart
                  class="tw-h-[340px] md:tw-h-[400px]"
                  :option="optionsEmpPerDepartment"></v-chart>
            </div>
            <div
               class="tw-hidden tw-h-40 tw-w-[340px] tw-rounded-2xl tw-bg-[#fca63c] tw-p-2 tw-text-center tw-text-xl tw-font-semibold tw-text-white lg:tw-flex lg:tw-items-center">
               <span>
                  Line Graph Illustrating number of Employees involved in
                  different departments .
               </span>
            </div>
         </div>

         <div
            class="tw-flex tw-w-full tw-items-center tw-justify-center tw-gap-10">
            <div
               class="tw-hidden tw-h-40 tw-w-[340px] tw-rounded-2xl tw-bg-[#e14a8d] tw-p-2 tw-text-center tw-text-lg tw-text-white lg:tw-flex lg:tw-items-center">
               <span>
                  Highest Percentage is achieved by the student of
                  <br />
                  <span class="tw-text-2xl tw-font-semibold">
                     {{ topDepartment }}
                  </span>
                  department in the year
                  <br />
                  <span class="tw-text-2xl tw-font-semibold">
                     {{ resultYear }}
                  </span>
                  .
               </span>
            </div>
            <div
               class="tw-m-3 tw-flex tw-w-full tw-items-center tw-justify-center tw-rounded-2xl tw-shadow-2xl md:tw-w-[600px]">
               <v-chart
                  class="tw-h-[340px] md:tw-h-[400px]"
                  :option="optionsRankingDepartments"></v-chart>
            </div>
         </div>

         <div
            class="tw-flex tw-w-full tw-items-center tw-justify-center tw-gap-10">
            <div
               class="tw-m-3 tw-flex tw-w-full tw-items-center tw-justify-center tw-rounded-2xl tw-shadow-2xl md:tw-w-[600px]">
               <v-chart
                  class="tw-h-[340px] md:tw-h-[400px]"
                  :option="optionsStuPerDepartment"></v-chart>
            </div>
            <div
               class="tw-hidden tw-h-40 tw-w-[340px] tw-rounded-2xl tw-bg-[#47aee6] tw-p-2 tw-text-center tw-text-xl tw-font-semibold tw-text-white lg:tw-flex lg:tw-items-center">
               <span>
                  Pie Chart Illustrating number of Students enrolled in
                  different departments .
               </span>
            </div>
         </div>
      </div>
   </div>
   <router-view />
</template>

<style scoped></style>
