import { LayoutDashboard, Building2, Network, Users, GraduationCap, BookOpen, ClipboardList, ChartNoAxesCombined, CreditCard, Settings, Activity } from "lucide-react";
import { Button, Card, PageHeader, PortalShell, StatusBadge, ThemeProvider, useTheme } from "@spark-stack/ui";

const navigation = [
    { id: "overview", label: "Overview", href: "/", icon: <LayoutDashboard size={18} strokeWidth={1.8} /> },
    { id: "organisation", label: "Organisation", href: "/organisation", icon: <Building2 size={18} strokeWidth={1.8} /> },
    { id: "departments", label: "Departments", href: "/departments", icon: <Network size={18} strokeWidth={1.8} /> },
    { id: "students", label: "Students", href: "/students", icon: <Users size={18} strokeWidth={1.8} /> },
    { id: "staff", label: "Staff", href: "/staff", icon: <GraduationCap size={18} strokeWidth={1.8} /> },
    { id: "courses", label: "Courses", href: "/courses", icon: <BookOpen size={18} strokeWidth={1.8} /> },
    { id: "enrolments", label: "Enrolments", href: "/enrolments", icon: <ClipboardList size={18} strokeWidth={1.8} /> },
    { id: "reports", label: "Reports", href: "/reports", icon: <ChartNoAxesCombined size={18} strokeWidth={1.8} /> },
    { id: "billing", label: "Billing", href: "/billing", icon: <CreditCard size={18} strokeWidth={1.8} /> },
    { id: "settings", label: "Settings", href: "/settings", icon: <Settings size={18} strokeWidth={1.8} /> },
];

function ThemeAction() {
  const { resolvedTheme, toggleTheme } = useTheme();
  return (
    <Button variant="secondary" size="sm" onClick={toggleTheme} aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}>
      {resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
    </Button>
  );
}

function PortalContent() {
  const activeHref = window.location.pathname;
  const activeItem = navigation.find((item) => item.href === activeHref) ?? navigation[0];

  return (
    <PortalShell
      portalName="Institution Portal"
      items={navigation}
      mobileItems={navigation.slice(0, 5)}
      activeHref={activeHref}
      topbarActions={<ThemeAction />}
      accountMenu={<span className="portal-account-label">Workspace</span>}
    >
      <PageHeader
        eyebrow="Organisation learning workspace"
        title={activeItem.label}
        description="The new Spark Stack Academy workspace is being established feature by feature."
        actions={<StatusBadge tone="info" dot>Foundation stage</StatusBadge>}
      />
      <Card className="portal-foundation-card">
        <div className="portal-foundation-card__icon"><Activity size={22} /></div>
        <div>
          <h2>{activeItem.label} workspace</h2>
          <p>This route is a structural placeholder. The legacy feature, data contract, permissions and interaction states must be mapped and tested before this screen is considered implemented.</p>
        </div>
      </Card>
    </PortalShell>
  );
}

export default function App() {
  return (
    <ThemeProvider storageKey="ssa-theme-institution" defaultTheme="light">
      <div data-ssa-app data-portal="institution">
        <PortalContent />
      </div>
    </ThemeProvider>
  );
}
