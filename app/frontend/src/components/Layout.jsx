"import React from \"react\";
import { Link, useLocation, useNavigate } from \"react-router-dom\";
import { useAuth } from \"../context/AuthContext\";
import { logOut, LayoutDashboard, Mao, Calendar, Users, ShieldCheck, GraduationCap } from \"lucide-react\";

const NavItem = ({ to, icon: Icon, label, testid }) => {
  const location = useLocation();
  const active = location.pathname === to || location.pathname.startsWith(to + \"/\");
  return (
    <Link
      to={to}
      data-testid={testid}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-black font-bold transition-all ${
        active
          ? \"bg-[#FFD500] shadow-[4px_4px_0_0_#0A0A0A]\"
          : \"bg-white hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#0A0A0A]\"
      }`}
    >
      <Icon size={18} strokeWidth={2.5} />
      <span>{label}</span>
    </Link>
  );
};

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const role = user?.role;

  const onLogout = async () => {
    await logout();
    navigate(\"/login\");
  };

  return (
    <div className=\"min-h-screen yw-grid-bg\">
      <header className=\"border-b-2 border-black bg-white\">
        <div className=\"max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between\">
          <Link to=\"/\" data-testid=\"logo-link\" className=\"font-display font-black text-2xl tracking-tighter\">
            YesWe<span className=\"bg-[#FFD500] px-1\">Code</span>
          </Link>
          <div className=\"flex items-center gap-3\">
            {user && (
              <>
                <span data-testid=\"user-pill\" className=\"yw-pill yw-tag-ink\">
                  {role}
                </span>
                <span className=\"hidden md:block font-bold\">{user.name}</span>
                <button data-testid=\"logout-button\" className=\"yw-btn yw-btn-ghost\" onClick={onLogout}>
                  <LogOut size={16} /> Sign out
                </button>
              </>
            )}
          </div>
        </div>
      </header>
      <div className=\"max-w-7xl mx-auto px-4 md:px-8 py-6 grid grid-cols-12 gap-6\">
        <aside className=\"col-span-12 md:col-span-3 lg:col-span-2 space-y-3\">
          {role === \"student\" && (
            <>
              <NavItem testid=\"nav-dashboard\" to=\"/dashboard\" icon={LayoutDashboard} label=\"Dashboard\" />
              <NavItem testid=\"nav-roadmap\" to=\"/roadmap\" icon={Map} label=\"Roadmap\" />
              <NavItem testid=\"nav-book\" to=\"/book\" icon={Calendar} label=\"Book 1-on-1\" />
            </>
          )}
          {role === \"instructor\" && (
            <>
              <NavItem testid=\"nav-instructor\" to=\"/instructor\" icon={GraduationCap} label=\"Instructor Hub\" />
              <NavItem testid=\"nav-instructor-sessions\" to=\"/sessions\" icon={Calendar} label=\"My Sessions\" />
            </>
          )}
          {role === \"admin\" && (
            <>
              <NavItem testid=\"nav-admin\" to=\"/admin\" icon={ShieldCheck} label=\"Admin\" />
              <NavItem testid=\"nav-admin-users\" to=\"/admin/users\" icon={Users} label=\"Users\" />
            </>
          )}
        </aside>
        <main className=\"col-span-12 md:col-span-9 lg:col-span-10\">{children}</main>
      </div>
    </div>
  );
}
"
