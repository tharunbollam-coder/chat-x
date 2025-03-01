import { Home, LogOut,Phone,BotMessageSquare } from "lucide-react";
import { logout } from "@redux/slices/authSlice";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  return (
    <div className="hidden md:block col-span-1">
      <div className="bg-purple-600 w-[100%] lg:w-[80%] h-[100%] flex flex-col items-center py-4 space-y-6 rounded-md">
        <div className="mb-auto">
          <Home className="text-[white] mb-5" />
          <Phone className="text-[white] mb-5" />
          <BotMessageSquare className="text-[white] mb-5" />
        </div>
        <LogOut className="text-red-400" onClick={()=> dispatch(logout())}/>
      </div>
    </div>
  );
};

export default Sidebar;
