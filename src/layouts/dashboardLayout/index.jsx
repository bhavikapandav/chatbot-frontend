import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
import { useDashboardHook } from "../../hook/dashboard.hook";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doFetchUserAuthDetails } from "../../actions";
import { storeUserAuthDetails } from "../../redux/reducers(slices)/userDetails.reducer";
import LoadingScreen from "../../components/LoadingScreen";

const DashboardLayout = () => {
  const dashboardState = useDashboardHook();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails.userDetails);
  const [loadingDetails, setLoadingDetails] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      const token = localStorage.getItem("_token");
      const userId = localStorage.getItem("_userId");

      if (token && userId && !userDetails) {
        try {
          const response = await doFetchUserAuthDetails(userId);
          if (response?.status === 200) {
            dispatch(storeUserAuthDetails(response.data));
          } else {
            localStorage.clear();
          }
        } catch (error) {
          console.error("Failed to fetch user details:", error);
        }
      }
      setLoadingDetails(false);
    };

    fetchDetails();
  }, [dispatch, userDetails]);

  if (loadingDetails && localStorage.getItem("_token") && !userDetails) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex h-screen bg-black text-white">

      <Sidebar
        activeChatId={dashboardState.activeChatId}
        setActiveChatId={dashboardState.setActiveChatId}
        conversationList={dashboardState.conversationList}
        handleMessageList={dashboardState.handleMessageList}
        setMessageList={dashboardState.setMessageList}
        handleRenameConversation={dashboardState.handleRenameConversation}
        handlePinConversation={dashboardState.handlePinConversation}
        handleDeleteConversation={dashboardState.handleDeleteConversation}
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