'use client'
import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import styles from "./page.module.css"
interface GlucoseData {
  normalCount: number;
  preDiabetesCount: number;
  diabetesCount: number;
}

const LineChart: React.FC<GlucoseData> = ({ normalCount, preDiabetesCount, diabetesCount }) => {
  const options: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: ['Normal', 'Pré-diabetes', 'Diabetes'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [normalCount, preDiabetesCount, diabetesCount],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
        itemStyle: {
          color: (params: { dataIndex: number }) => {
            const colors = ['#4caf50', '#ff9800', '#f44336'];
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: colors[params.dataIndex] },
              { offset: 1, color: '#fff' },
            ]);
          },
        },
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: '400px', width: '100%' }} />;
};

export default function Analytics() {
  const [data, setData] = useState<GlucoseData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getGlucose');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Erro ao buscar dados de glicose:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.chartDiv}>
      <LineChart
        normalCount={data.normalCount}
        preDiabetesCount={data.preDiabetesCount}
        diabetesCount={data.diabetesCount}
      />
    </div>
  );
}
