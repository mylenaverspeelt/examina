'use client';
import React from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

interface GlucoseData {
    normalCount: number;
    preDiabetesCount: number;
    diabetesCount: number;
}

const GlucoseChart: React.FC<GlucoseData> = ({ normalCount, preDiabetesCount, diabetesCount }) => {
    const options: echarts.EChartsOption = {
        title: {
            text: 'Distribuição de Resultados de Glicose',
            left: 'center',  
            top: 'top',      
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold',
            },
        },
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

    return <ReactECharts option={options} style={{ height: '500px', width: '100%' }} />;
};

export default GlucoseChart;
