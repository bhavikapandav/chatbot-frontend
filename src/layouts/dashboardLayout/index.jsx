import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
import { useDashboardHook } from "../../hook/dashboard.hook";

const DashboardLayout = () => {
  const dashboardState = useDashboardHook();

  return (
    <div className="flex h-screen bg-black text-white">

      <Sidebar
        activeChatId={dashboardState.activeChatId}
        setActiveChatId={dashboardState.setActiveChatId}
        conversationList={dashboardState.conversationList}
        handleMessageList={dashboardState.handleMessageList}
        setMessageList={dashboardState.setMessageList}
      />

      <div className="flex-1 flex flex-col">

        <Header />

        <main className="flex-1 overflow-hidden">
          <Outlet context={dashboardState} />
        </main>

      </div>

    </div>
  );
};


export default DashboardLayout;