import Sidebar from "../components/sidebar";
import TopNav from "../components/topnav";

export default function DashboardLayout(props) {
  return (
    <div>
      <TopNav />
      <div className="flex 1920:gap-16 gap-10 px-[2rem] 1920:px-[2.5rem] mt-10">
        <div className="sticky">
          <Sidebar />
        </div>

        {props.children}
      </div>
    </div>
  );
}
