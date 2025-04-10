import React from "react";
import Navbar from "../components/navigationbar";
import { Line, Bar } from "react-chartjs-2";
import ProtectedRoute from "./protectedroute";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { User, Clock, Chart as ChartIcon } from "iconsax-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Data untuk Grafik Pengguna Aktif
  const penggunaAktifData = {
    labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni"],
    datasets: [
      {
        label: "Pengguna Aktif",
        data: [120, 150, 200, 250, 300, 350], // Contoh data pengguna aktif
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
      },
    ],
  };

  // Data untuk Grafik Aktivitas Terbaru
  const aktivitasTerbaruData = {
    labels: ["A", "B", "C", "D", "E"],
    datasets: [
      {
        label: "Aktivitas Terbaru",
        data: [10, 20, 15, 25, 30], // Contoh data aktivitas terbaru
        backgroundColor: "#2196F3",
      },
    ],
  };

  // Data untuk Grafik Pembaruan Data Terbaru
  const pembaruanData = {
    labels: ["Update 1", "Update 2", "Update 3"],
    datasets: [
      {
        label: "Pembaruan Data Terbaru",
        data: [5, 10, 8], // Contoh data pembaruan
        backgroundColor: "#F44336",
      },
    ],
  };

  // Data untuk Grafik Garis (Jumlah Pengguna)
  const userGrowthData = {
    labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni"],
    datasets: [
      {
        label: "Jumlah Pengguna",
        data: [120, 190, 300, 500, 700, 900],
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <ProtectedRoute>
      <div className="p-8">
        <Navbar />
        <div className="p-6  min-h-screen">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">
            Selamat Datang di Dashboard
          </h2>
          <p className="text-lg text-gray-500 mb-8">
            Ini adalah area dashboard Anda. Silakan pilih opsi di navbar untuk
            melanjutkan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card Statistik Pengguna dengan Grafik Garis */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center mb-4">
                <User size="24" color="#4CAF50" className="mr-2" />
                <h3 className="text-xl font-semibold text-gray-700">
                  Statistik Pengguna
                </h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Grafik pertumbuhan jumlah pengguna terdaftar.
              </p>
              <Line data={userGrowthData} />
            </div>

            {/* Card Pengguna Aktif dengan Grafik */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center mb-4">
                <ChartIcon size="24" color="#9C27B0" className="mr-2" />
                <h3 className="text-xl font-semibold text-gray-700">
                  Pengguna Aktif
                </h3>
              </div>
              <Line data={penggunaAktifData} />
            </div>

            {/* Card Aktivitas Terbaru dengan Grafik */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center mb-4">
                <Clock size="24" color="#FFC107" className="mr-2" />
                <h3 className="text-xl font-semibold text-gray-700">
                  Aktivitas Terbaru
                </h3>
              </div>
              <Bar data={aktivitasTerbaruData} />
            </div>

            {/* Card Pembaruan Data Terbaru dengan Grafik */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center mb-4">
                <Clock size="24" color="#F44336" className="mr-2" />
                <h3 className="text-xl font-semibold text-gray-700">
                  Pembaruan Data Terbaru
                </h3>
              </div>
              <Bar data={pembaruanData} />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
