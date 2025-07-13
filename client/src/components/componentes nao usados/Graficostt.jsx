import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Dados fictícios de frequência de uso das cartas
const data = [
  { card: "Arqueiras", freq: 120 },
  { card: "Gigante", freq: 95 },
  { card: "Mago", freq: 70 },
  { card: "Pekka", freq: 60 },
];
const colors = ['#3B82F6', '#10B981', '#000', '#EF4444'];
function GraficoPage() {
  return (
    <div className="min-h-screen">{/*bg-gray-100*/} 
      {/* Barra de Navegação */}
      <nav className=" shadow-md">{/*bg-white*/}

         <h1 className="text-xl font-bold text-indigo-600">Graficos</h1>


        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-center items-center">
         
          
          <ul className="flex gap-12 text-indigo-700 font-medium">
            <li className="hover:text-indigo-600 cursor-pointer">Início</li>
            <li className="hover:text-indigo-600 cursor-pointer">Gráficos</li>
            <li className="hover:text-indigo-600 cursor-pointer">Cartas</li>
            <li className="hover:text-indigo-600 cursor-pointer">Configurações</li>
          </ul>
  
        </div>
      </nav>

      {/* Conteúdo com o Gráfico */}
      <main className="flex justify-center items-center py-16 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-xl">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Uso de Cartas</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="card" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="freq">
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                    </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}

export default GraficoPage;