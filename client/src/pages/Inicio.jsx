import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell
} from 'recharts';

const data = [
  { nome: 'Carta A', valor: 120 },
  { nome: 'Carta B', valor: 90 },
  { nome: 'Carta C', valor: 75 },
];

const colors = ['#3B82F6', '#10B981', '#EF4444'];

function Graphs() {
  return (
    <main className="flex justify-center items-center py-16 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-xl">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Gráfico de Cores</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nome" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="valor">
              {data.map((entry, index) => (
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Graphs;
