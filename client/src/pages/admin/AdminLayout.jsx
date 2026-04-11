import { createContext, useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Layers,
  BarChart3,
  Menu,
  Search,
  User,
  X,
} from "lucide-react";

const AdminSearchContext = createContext({
  search: "",
  setSearch: () => {},
});

export const useAdminSearch = () => useContext(AdminSearchContext);

const menus = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Products", path: "/admin/products", icon: Package },
  { name: "Categories", path: "/admin/categories", icon: Layers },
  { name: "Inventory", path: "/admin/inventory", icon: BarChart3 },
];

const AdminLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();

  return (
    <AdminSearchContext.Provider value={{ search, setSearch }}>
      <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="md:flex">
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-72 bg-white/95 backdrop-blur border-r border-gray-200 shadow-lg transition-transform duration-300 md:static md:translate-x-0 ${
            open ? "translate-x-0" : "-translate-x-full"
          } md:w-64`}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-red-900">Boutique Admin</h2>
              <p className="text-xs text-gray-500">Sarees &amp; Suit Control</p>
            </div>
            <button
              className="md:hidden text-gray-600 hover:text-red-700"
              onClick={() => setOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          <nav className="px-2 py-4 space-y-1">
            {menus.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                      isActive
                        ? "bg-red-50 text-red-800 ring-1 ring-red-200"
                        : "text-slate-600 hover:bg-gray-100 hover:text-red-800"
                    }`
                  }
                >
                  <Icon size={18} className="shrink-0" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </aside>

        <div className="flex-1 md:ml-64">
          <header className="sticky top-0 z-20 flex items-center justify-between bg-white/90 backdrop-blur px-4 py-3 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOpen(true)}
                className="md:hidden rounded-lg bg-white p-2 text-gray-600 shadow-sm hover:text-red-700"
              >
                <Menu size={20} />
              </button>
              <h1 className="text-lg font-semibold text-red-900">
                {menus.find((m) => m.path === location.pathname)?.name || "Dashboard"}
              </h1>
              <div className="hidden sm:flex items-center gap-2 bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-sm">
                <Search size={16} />
                <input
                  type="search"
                  placeholder="Search products, categories..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent outline-none min-w-45"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">Admin</span>
              <div className="h-9 w-9 rounded-full bg-red-100 text-red-700 grid place-items-center font-semibold">
                A
              </div>
            </div>
          </header>

          <main className="p-4 sm:p-6">{children}</main>
        </div>
      </div>
      </div>
    </AdminSearchContext.Provider>
  );
};

export default AdminLayout;
