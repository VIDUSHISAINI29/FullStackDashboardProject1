import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { LineChart } from 'echarts/charts'
import { PieChart } from 'echarts/charts'
import { GridComponent,
    TitleComponent,
   ToolboxComponent,
   TooltipComponent,
   LegendComponent,
   DatasetComponent,
 } from 'echarts/components'
import { SVGRenderer } from 'echarts/renderers'



export function setupECharts(){
    use([GridComponent, BarChart, SVGRenderer, 
        TitleComponent,
   ToolboxComponent,
   TooltipComponent,
   LegendComponent,
   DatasetComponent,
   LineChart,
   PieChart,
    ])
}