import { Avatar, Button } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getFullName } from "../../utils/app-utils";
import { userMenus, adminMenus } from "../../data/component-data";
import { useGetAuth } from "@/lib/react-query/query";
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activePath = location.pathname.split("/").filter(e => e).at(0);
  const {data: user} = useGetAuth()
  const menuItems = user.role == 'customer' ? userMenus: adminMenus
  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/login")
  }
  return (
    <div className="px-3 py-4 text-text-soft w-[270px]">
      <h2 className="text-emerald-500 text-[25px] font-semibold mb-5 text-center">{user.role == 'customer'? 'E Recycling': 'E-recycling Admin'}</h2>
      <div className="flex items-center mt-3 flex-col">
        <Avatar className="mx-auto" size={56} src={user.photo} />
        <h3 className="mt-2 font-medium">{getFullName(user.firstName, user.lastName)}</h3>
      </div>
      <div className="mt-5 text-base">
        {menuItems.map((menu) => {
          return (
            <div key={menu.title} className="font-medium">
              <p className="px-3 pt-3 pb-2 mt-3 uppercase text-sm font-semibold">{menu.title}</p>
              {menu.list.map((link, idx) => {
                return (!activePath && link.path === "/") ||  link.path.includes(activePath) ? (
                  <Link
                    to={link.path}
                    key={idx}
                    className={`flex gap-3 items-center ml-3 px-1 py-2 bg-[#EBF8F4] text-[#00A76F] hover:bg-[#D6F1E8] rounded-md`}
                  >
                    <div className="ml-2">{link.icon}</div>
                    <span>{link.label}</span>
                  </Link>
                ) : (
                  <Link
                    to={link.path}
                    key={idx}
                    className={`flex gap-3 items-center ml-3 px-1 py-2 hover:bg-zinc-200 rounded-md`}
                  >
                    <div className="ml-2">{link.icon}</div>
                    <span> {link.label} </span>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="mt-20 text-center">
        <Button type="primary" size="large" onClick={logout} >Đăng xuất</Button>
      </div>
    </div>
  );
};

export default Sidebar;
