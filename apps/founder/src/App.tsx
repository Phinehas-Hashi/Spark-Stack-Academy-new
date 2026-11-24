import { LayoutDashboard, Users, PanelsTopLeft, Wallet, ArrowLeftRight, CreditCard, Building2, Bot, ShieldCheck, ChartNoAxesCombined, Settings, Activity } from "lucide-react";
import { Button, Card, PageHeader, PortalShell, StatusBadge, ThemeProvider, useTheme } from "@spark-stack/ui";

const navigation = [
    { id: "overview", label: "Overview", href: "/", icon: <LayoutDashboard size={18} strokeWidth={1.8} /> },
    { id: "users", label: "User Management", href: "/users", icon: <Users size={18} strokeWidth={1.8} /> },
    { id: "portals", label: "Portal Management", href: "/portals", icon: <PanelsTopLeft size={18} strokeWidth={1.8} /> },
    { id: "finance", label: "Finance & Treasury", href: "/finance", icon: <Wallet size={18} strokeWidth={1.8} /> },
    { id: "payouts", label: "Payouts", href: "/payouts", icon: <ArrowLeftRight size={18} strokeWidth={1.8} /> },
    { id: "subscriptions", label: "Subscriptions", href: "/subscriptions", icon: <CreditCard size={18} strokeWidth={1.8} /> },
    { id: "institutions", label: "Institutions", href: "/institutions", icon: <Building2 size={18} strokeWidth={1.8} /> },
    { id: "ai", label: "AI Control Centre", href: "/ai", icon: <Bot size={18} strokeWidth={1.8} /> },
    { id: "security", label: "Security Centre", href: "/security", icon: <ShieldCheck size={18} strokeWidth={1.8} /> },
    { id: "reports", label: "Reports", href: "/reports", icon: <ChartNoAxesCombined size={18} strokeWidth={1.8} /> },
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
      portalName="Founder Portal"
      items={navigation}
      mobileItems={navigation.slice(0, 5)}
      activeHref={activeHref}
      topbarActions={<ThemeAction />}
      accountMenu={<span className="portal-account-label">Workspace</span>}
    >
      <PageHeader
        eyebrow="Executive command centre"
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
    <ThemeProvider storageKey="ssa-theme-founder" defaultTheme="light">
      <div data-ssa-app data-portal="founder">
        <PortalContent />
      </div>
    </ThemeProvider>
  );
}
