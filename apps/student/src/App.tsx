import { House, Compass, BookOpen, PlayCircle, ClipboardCheck, ChartNoAxesCombined, Trophy, Medal, Award, Bot, Download, UserRound, Activity } from "lucide-react";
import { Button, Card, PageHeader, PortalShell, StatusBadge, ThemeProvider, useTheme } from "@spark-stack/ui";

const navigation = [
    { id: "home", label: "Home", href: "/", icon: <House size={18} strokeWidth={1.8} /> },
    { id: "explore", label: "Explore", href: "/explore", icon: <Compass size={18} strokeWidth={1.8} /> },
    { id: "learning", label: "My Learning", href: "/learning", icon: <BookOpen size={18} strokeWidth={1.8} /> },
    { id: "room", label: "Learning Room", href: "/room", icon: <PlayCircle size={18} strokeWidth={1.8} /> },
    { id: "assessments", label: "Assessments", href: "/assessments", icon: <ClipboardCheck size={18} strokeWidth={1.8} /> },
    { id: "progress", label: "Progress", href: "/progress", icon: <ChartNoAxesCombined size={18} strokeWidth={1.8} /> },
    { id: "rewards", label: "Rewards", href: "/rewards", icon: <Trophy size={18} strokeWidth={1.8} /> },
    { id: "leaderboard", label: "Leaderboard", href: "/leaderboard", icon: <Medal size={18} strokeWidth={1.8} /> },
    { id: "certificates", label: "Certificates", href: "/certificates", icon: <Award size={18} strokeWidth={1.8} /> },
    { id: "ai", label: "AI Assistant", href: "/ai", icon: <Bot size={18} strokeWidth={1.8} /> },
    { id: "offline", label: "Offline Library", href: "/offline", icon: <Download size={18} strokeWidth={1.8} /> },
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
      portalName="Student Portal"
      items={navigation}
      mobileItems={navigation.slice(0, 5)}
      activeHref={activeHref}
      topbarActions={<ThemeAction />}
      accountMenu={<span className="portal-account-label">Workspace</span>}
    >
      <PageHeader
        eyebrow="Your learning destination"
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
    <ThemeProvider storageKey="ssa-theme-student" defaultTheme="light">
      <div data-ssa-app data-portal="student">
        <PortalContent />
      </div>
    </ThemeProvider>
  );
}
