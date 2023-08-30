import React, { useEffect, useRef, useState } from "react";
import { SciChartSurface } from "scichart";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import { NumberRange } from "scichart/Core/NumberRange";
import { ELabelPlacement } from "scichart/types/LabelPlacement";
import { HorizontalLineAnnotation } from "scichart/Charting/Visuals/Annotations/HorizontalLineAnnotation";

const App = () => {
  const chartRef = useRef(null);
  const [sciChartSurface, setSciChartSurface] = useState(null);
  const [y1, setY1] = useState(4); // <-- initial value
  const [annotation, setAnnotation] = useState(null);

  useEffect(() => {
    const initChart = async () => {
      const { sciChartSurface, wasmContext } = await SciChartSurface.create(
        chartRef.current
      );

      const xAxis = new NumericAxis(wasmContext);
      xAxis.visibleRange = new NumberRange(0, 10);
      sciChartSurface.xAxes.add(xAxis);

      const yAxis = new NumericAxis(wasmContext);
      yAxis.visibleRange = new NumberRange(0, 10);
      sciChartSurface.yAxes.add(yAxis);

      const annotation = new HorizontalLineAnnotation({
        labelPlacement: ELabelPlacement.Axis,
        showLabel: true,
        stroke: "Red",
        strokeThickness: 2,
        y1: y1, // use y1 from state here
        axisLabelFill: "Red",
      });
      sciChartSurface.annotations.add(annotation);
      annotation.y1 = 9;
      setAnnotation(annotation);
      console.log("annotation", annotation);

      // sciChartSurface.annotations.add(
      //   new HorizontalLineAnnotation({
      //     labelPlacement: ELabelPlacement.Axis,
      //     showLabel: true,
      //     stroke: "Red",
      //     strokeThickness: 2,
      //     y1: 4,
      //     axisLabelFill: "Red",
      //   })
      // );

      setSciChartSurface(sciChartSurface);
    };

    initChart();

    return () => {
      sciChartSurface && sciChartSurface.delete();
    };
  }, [y1]);

  return (
    <div>
      <div ref={chartRef} style={{ width: "500px", height: "500px" }}></div>
      <input
        type="range"
        min="0"
        max="10"
        value={y1}
        onChange={(e) => setY1(parseFloat(e.target.value))}
      />
      <p>Y1 Value: {y1}</p>
      <button
        onClick={() => {
          console.log("change anootation");
          annotation.y1 = 2;
        }}
      >
        changeAnnotation
      </button>
      <p>test</p>
    </div>
  );
};

export default App;
