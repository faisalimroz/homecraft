import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, LabelList, ResponsiveContainer } from 'recharts';

const BarChartComponent = ({ revenueData }:any) => {
  return (
    <div className="h-96 w-full ml-[-30px] ">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={revenueData}
          className='p-6'
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="name"
            tick={{ fill: '#333', fontSize: 12, fontWeight: 500 }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#333', fontSize: 12, fontWeight: 500 }}
            tickLine={false}
            axisLine={{ stroke: '#333' }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#333', color: '#fff', borderRadius: 4 }}
            cursor={{ fill: 'transparent' }} // Custom cursor style
          />
          <Legend
            wrapperStyle={{ marginBottom: 20 }}
          />
          <Bar
            dataKey="earning"
            fill="#4c40ed"
            barSize={60} // Adjust bar size for wider bars
            radius={[10, 10, 0, 0]} // Rounded corners on top of the bars
          >
            <LabelList
              dataKey="earning"
              position="top"
              fill="#333"
              fontSize={12}
              fontWeight={500}
            />
          </Bar>
    
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
