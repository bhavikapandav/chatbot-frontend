import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-black text-white">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Header />

        <main className="flex-1 overflow-hidden">
          {children}
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;