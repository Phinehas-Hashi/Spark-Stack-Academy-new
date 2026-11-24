import { LayoutDashboard, BookOpen, SquarePen, Users, ClipboardCheck, Video, ChartNoAxesCombined, Wallet, ArrowDownToLine, Star, UserRound, Activity } from "lucide-react";
import { Button, Card, PageHeader, PortalShell, StatusBadge, ThemeProvider, useTheme } from "@spark-stack/ui";

const navigation = [
    { id: "overview", label: "Overview", href: "/", icon: <LayoutDashboard size={18} strokeWidth={1.8} /> },
    { id: "courses", label: "My Courses", href: "/courses", icon: <BookOpen size={18} strokeWidth={1.8} /> },
    { id: "builder", label: "Course Builder", href: "/builder", icon: <SquarePen size={18} strokeWidth={1.8} /> },
    { id: "students", label: "Students", href: "/students", icon: <Users size={18} strokeWidth={1.8} /> },
    { id: "assessments", label: "Assessments", href: "/assessments", icon: <ClipboardCheck size={18} strokeWidth={1.8} /> },
    { id: "live", label: "Live Learning", href: "/live", icon: <Video size={18} strokeWidth={1.8} /> },
    { id: "analytics", label: "Analytics", href: "/analytics", icon: <ChartNoAxesCombined size={18} strokeWidth={1.8} /> },
    { id: "earnings", label: "Earnings", href: "/earnings", icon: <Wallet size={18} strokeWidth={1.8} /> },
    { id: "withdrawals", label: "Withdrawals", href: "/withdrawals", icon: <ArrowDownToLine size={18} strokeWidth={1.8} /> },
    { id: "reviews", label: "Reviews", href: "/reviews", icon: <Star size={18} strokeWidth={1.8} /> },
    { id: "profile", label: "Profile", href: "/profile", icon: <UserRound size={18} strokeWidth={1.8} /> },
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
      portalName="Instructor Portal"
      items={navigation}
      mobileItems={navigation.slice(0, 5)}
      activeHref={activeHref}
      topbarActions={<ThemeAction />}
      accountMenu={<span className="portal-account-label">Workspace</span>}
    >
      <PageHeader
        eyebrow="Teaching and creator workspace"
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
    <ThemeProvider storageKey="ssa-theme-instructor" defaultTheme="light">
      <div data-ssa-app data-portal="instructor">
        <PortalContent />
      </div>
    </ThemeProvider>
  );
}
