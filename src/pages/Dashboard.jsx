import DashboardLayout from "../layouts/DashboardLayout";
import ChatInput from "../components/ChatInput";

const Dashboard = () => {
  return (
    <DashboardLayout>

      <div
        className="
        h-full
        flex
        flex-col
        items-center
        justify-center
        px-5
        "
      >
        <h1
          className="
          text-5xl
          font-semibold
          mb-10
          text-center
          "
        >
          What's on your mind today?
        </h1>

        <div className="w-full max-w-4xl">
          <ChatInput />
        </div>
      </div>

    </DashboardLayout>
  );
};

export default Dashboard;