import React from "react";
import Stack from "@mui/material/Stack";
import {
  GaugeContainer,
  GaugeReferenceArc,
  GaugeValueArc,
} from "@mui/x-charts/Gauge";

const RadialBarChart = ({ name, value }) => {
  const getGradientColor = (percent, name) => {
    if (name === "AI") {
      return "#1ecbe1";
    } else {
      if (percent <= 10) return "rgb(34, 139, 34)";
      if (percent <= 40) return "rgb(1, 77, 250)";
      if (percent <= 60) return "rgb(255, 195, 0)";
      return "rgb(250, 1, 1)";
    }
  };

  const generateGradientStops = (value) => {
    const stops = [];
    const step = 1;

    for (let i = 0; i <= value; i += step) {
      const color = getGradientColor(i, name);
      stops.push(<stop key={i} offset={`${i}%`} stopColor={color} />);
    }

    return stops;
  };

  const gradientStops = generateGradientStops(value);

  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 1, md: 3 }}>
      <GaugeContainer
        value={value}
        valueMax={100}
        startAngle={-180}
        endAngle={180}
        innerRadius="78%"
        outerRadius="93%"
        height={137}
        width={140}
        cornerRadius="50%"
      >
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="0%" y2="0%">
            {gradientStops.map((stop, index) => (
              <React.Fragment key={index}>{stop}</React.Fragment>
            ))}
            <animate
              attributeName="x2"
              values="0%;100%"
              keyTimes="0;1"
              dur="1s"
              fill="freeze"
              begin="0s"
            />
            <animate
              attributeName="x1"
              values="0%;100%"
              keyTimes="0;1"
              dur="1s"
              fill="freeze"
              begin="0s"
            />
          </linearGradient>
        </defs>
        <GaugeReferenceArc />
        <GaugeValueArc
          sx={() => ({
            fill: `url(#gaugeGradient)`,
          })}
        />
        <text
          x="52%"
          y="43%"
          fontSize="20px"
          fontWeight={500}
          fill="#999999"
          fontFamily="Roboto"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {value}%
        </text>
        <text
          x="50%"
          y="59%"
          fontSize="13px"
          fill="#999999"
          fontFamily="Roboto"
          fontWeight={500}
          textAnchor="middle"
          dominantBaseline="central"
          color="#707070"
        >
          {name}
        </text>
      </GaugeContainer>
    </Stack>
  );
};

export default RadialBarChart;
