import { Bell } from "lucide-react";

const Navbar = () => {
  return (
    <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold">
        SWS AI
      </h1>

      <button className="relative">
        <Bell size={22} />
      </button>
    </div>
  );
};

export default Navbar;