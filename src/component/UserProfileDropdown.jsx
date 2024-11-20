import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { LogOut, User, ChevronDown } from "lucide-react";

export default function DropdownMenuComponent({
  onLogout = () => console.log("Logout clicked"),
  onEditProfile = () => console.log("Edit profile clicked"),
}) {
  return (
    <div className="w-full  text-black">
      <div className="max-w flex justify-start md:justify-end ">
        {/* Dropdown Menu */}
        <Menu as="div" className="relative">
          {({ open }) => (
            <>
              <MenuButton className="flex items-center  gap-2 bg-transparent text-black hover:text-[#eca453]  rounded-lg focus:outline-none">
                <User className="w-5 h-5" />
                Profile
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </MenuButton>

              <MenuItems className="absolute right-0 mt-2 w-56 bg-slate-800 text-gray-200 border border-slate-700 rounded-md shadow-lg focus:outline-none">
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={onEditProfile}
                      className={`${
                        active ? "bg-slate-700 text-white" : "text-gray-200"
                      } flex items-center gap-2 w-full px-4 py-2 text-sm`}
                    >
                      <User className="w-4 h-4" />
                      Edit Profile
                    </button>
                  )}
                </MenuItem>
                <div className="border-t border-slate-700"></div>
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={onLogout}
                      className={`${
                        active ? "bg-red-500 text-white" : "text-red-400"
                      } flex items-center gap-2 w-full px-4 py-2 text-sm`}
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  )}
                </MenuItem>
              </MenuItems>
            </>
          )}
        </Menu>
      </div>
    </div>
  );
}
