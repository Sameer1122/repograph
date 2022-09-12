import React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  Tooltip,
  ColumnSeries,
  DataLabel,
} from "@syncfusion/ej2-react-charts";

import { data1, barPrimaryXAxis, barPrimaryYAxis } from "../data/dummy";

const Bar = ({ barData }) => {
  return (
    <div>
      <div>
        <ChartComponent
          id="charts"
          primaryXAxis={barPrimaryXAxis}
          primaryYAxis={barPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          height="70%"
          tooltip={{ enable: true }}
          background={"white"}
          legendSettings={{ visible: false }}
        >
          <Inject
            services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={barData}
              type="Column"
              xName="x"
              width={2}
              yName="y"
              name="Commits"
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default Bar;
