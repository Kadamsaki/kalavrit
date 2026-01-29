import { useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Bell,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Command,
  CreditCard,
  Download,
  FileText,
  Filter,
  Flame,
  Layers,
  LineChart,
  Search,
  Settings,
  Shield,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

type KPI = {
  id: string;
  label: string;
  value: string;
  delta: number;
  hint: string;
  icon: React.ReactNode;
  tone: "primary" | "accent" | "good" | "warn";
};

type ActivityItem = {
  id: string;
  title: string;
  detail: string;
  time: string;
  icon: React.ReactNode;
  tone: "primary" | "good" | "warn" | "muted";
};

type Workflow = {
  id: string;
  name: string;
  status: "Running" | "Scheduled" | "Paused";
  owner: string;
  lastRun: string;
  successRate: number;
};

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.06 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

function toneClass(tone: ActivityItem["tone"] | KPI["tone"]) {
  switch (tone) {
    case "primary":
      return "bg-primary/12 text-primary border-primary/20";
    case "accent":
      return "bg-[hsl(var(--accent)/0.14)] text-[hsl(var(--accent))] border-[hsl(var(--accent)/0.22)]";
    case "good":
      return "bg-[hsl(158_68%_46%/0.14)] text-[hsl(158_68%_40%)] border-[hsl(158_68%_46%/0.22)]";
    case "warn":
      return "bg-[hsl(32_94%_60%/0.14)] text-[hsl(32_94%_45%)] border-[hsl(32_94%_60%/0.22)]";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

function Delta({ value }: { value: number }) {
  const positive = value >= 0;
  return (
    <span
      data-testid="text-kpi-delta"
      className={
        "inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[12px] font-medium " +
        (positive
          ? "border-[hsl(158_68%_46%/0.25)] bg-[hsl(158_68%_46%/0.10)] text-[hsl(158_68%_38%)]"
          : "border-[hsl(0_78%_62%/0.25)] bg-[hsl(0_78%_62%/0.10)] text-[hsl(0_78%_52%)]")
      }
    >
      {positive ? (
        <TrendingUp className="h-3.5 w-3.5" />
      ) : (
        <TrendingDown className="h-3.5 w-3.5" />
      )}
      {Math.abs(value).toFixed(1)}%
    </span>
  );
}

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl px-3 py-2 text-sm" data-testid="tooltip-chart">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 font-semibold text-foreground">
        {payload[0].name}: {payload[0].value}
      </div>
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-sheen">
      <div className="grain">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-10">{children}</div>
      </div>
    </div>
  );
}

function TopBar({
  mode,
  setMode,
  search,
  setSearch,
}: {
  mode: "Live" | "Last 7 days" | "Last 30 days";
  setMode: (v: "Live" | "Last 7 days" | "Last 30 days") => void;
  search: string;
  setSearch: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2">
            <span
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-card-border bg-white/60 shadow-xs"
              data-testid="img-brandmark"
            >
              <Sparkles className="h-5 w-5 text-primary" />
            </span>
            <div>
              <h1
                className="font-serif text-2xl tracking-[-0.02em] text-foreground sm:text-3xl"
                data-testid="text-title"
              >
                Pulseboard
              </h1>
              <p className="mt-1 text-sm text-muted-foreground" data-testid="text-subtitle">
                Motion-first analytics mockup with dummy data
              </p>
            </div>
          </div>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <Button
            variant="secondary"
            className="glass h-10 border-card-border/70 bg-white/40"
            data-testid="button-export"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="h-10 shadow-sm" data-testid="button-new-report">
            <FileText className="mr-2 h-4 w-4" />
            New report
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:justify-end">
        <div className="relative w-full sm:w-[360px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search workflows, owners, alerts…"
            className="h-11 pl-10"
            data-testid="input-search"
          />
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                className="h-11 gap-2"
                data-testid="button-mode"
              >
                <Calendar className="h-4 w-4" />
                {mode}
                <ChevronDown className="h-4 w-4 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>View mode</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setMode("Live")} data-testid="menu-mode-live">
                Live
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setMode("Last 7 days")} data-testid="menu-mode-7d">
                Last 7 days
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setMode("Last 30 days")}
                data-testid="menu-mode-30d"
              >
                Last 30 days
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="secondary"
            className="h-11 w-11 px-0"
            data-testid="button-notifications"
          >
            <Bell className="h-4 w-4" />
          </Button>

          <Button variant="secondary" className="h-11 w-11 px-0" data-testid="button-settings">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function KPIGrid({ kpis }: { kpis: KPI[] }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      data-testid="grid-kpis"
    >
      {kpis.map((kpi) => (
        <motion.div key={kpi.id} variants={item}>
          <Card className="glass group overflow-hidden rounded-2xl" data-testid={`card-kpi-${kpi.id}`}>
            <div className="relative p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">{kpi.label}</div>
                  <div className="mt-1 flex items-center gap-2">
                    <div
                      className="text-2xl font-semibold tracking-[-0.02em]"
                      data-testid={`text-kpi-value-${kpi.id}`}
                    >
                      {kpi.value}
                    </div>
                    <Delta value={kpi.delta} />
                  </div>
                </div>

                <div
                  className={
                    "inline-flex h-10 w-10 items-center justify-center rounded-2xl border " +
                    toneClass(kpi.tone)
                  }
                  data-testid={`img-kpi-icon-${kpi.id}`}
                >
                  {kpi.icon}
                </div>
              </div>

              <div className="mt-4 text-sm text-muted-foreground">{kpi.hint}</div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="h-full bg-gradient-to-t from-primary/12 via-primary/0 to-transparent" />
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

function Insights({ series, bars }: { series: any[]; bars: any[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3" data-testid="grid-insights">
      <Card className="glass rounded-2xl p-5 lg:col-span-2" data-testid="card-area">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <LineChart className="h-4 w-4 text-primary" />
              <h2 className="font-semibold" data-testid="text-area-title">
                Demand curve
              </h2>
            </div>
            <p className="mt-1 text-sm text-muted-foreground" data-testid="text-area-subtitle">
              Smooth trend with highlighted inflection points
            </p>
          </div>
          <Badge variant="secondary" className="border-card-border" data-testid="badge-live">
            Live
          </Badge>
        </div>

        <div className="mt-4 h-[280px]" data-testid="chart-demand">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series} margin={{ left: -10, right: 8, top: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                  <stop offset="70%" stopColor="hsl(var(--primary))" stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="hsl(var(--border))" strokeOpacity={0.5} vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} width={36} />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                name="Signals"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#g)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="glass rounded-2xl p-5" data-testid="card-bars">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-[hsl(var(--accent))]" />
              <h2 className="font-semibold" data-testid="text-bars-title">
                Channel heat
              </h2>
            </div>
            <p className="mt-1 text-sm text-muted-foreground" data-testid="text-bars-subtitle">
              Where attention concentrates this week
            </p>
          </div>
          <Button variant="secondary" className="h-9" data-testid="button-filter">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="mt-4 h-[280px]" data-testid="chart-channels">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bars} margin={{ left: -16, right: 10, top: 10, bottom: 0 }}>
              <CartesianGrid stroke="hsl(var(--border))" strokeOpacity={0.5} vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} width={30} />
              <Tooltip content={<ChartTooltip />} />
              <Bar
                dataKey="value"
                name="Focus"
                fill="hsl(var(--accent))"
                radius={[8, 8, 8, 8]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <Card className="glass rounded-2xl p-5" data-testid="card-activity">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <h2 className="font-semibold" data-testid="text-activity-title">
              Activity
            </h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground" data-testid="text-activity-subtitle">
            Signals, alerts, and approvals
          </p>
        </div>
        <Button variant="secondary" className="h-9" data-testid="button-view-all">
          View all
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="mt-4 space-y-2" data-testid="list-activity">
        {items.map((a) => (
          <div
            key={a.id}
            className="flex items-start gap-3 rounded-xl border border-card-border bg-white/35 px-3 py-3 transition-colors hover:bg-white/55"
            data-testid={`row-activity-${a.id}`}
          >
            <div
              className={
                "mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-xl border " +
                toneClass(a.tone)
              }
              data-testid={`img-activity-icon-${a.id}`}
            >
              {a.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <div className="font-medium" data-testid={`text-activity-title-${a.id}`}>
                  {a.title}
                </div>
                <div className="text-xs text-muted-foreground" data-testid={`text-activity-time-${a.id}`}>
                  {a.time}
                </div>
              </div>
              <div className="mt-0.5 text-sm text-muted-foreground" data-testid={`text-activity-detail-${a.id}`}>
                {a.detail}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function WorkflowsTable({ rows, onToggle }: { rows: Workflow[]; onToggle: (id: string) => void }) {
  return (
    <Card className="glass rounded-2xl p-5" data-testid="card-workflows">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-primary" />
            <h2 className="font-semibold" data-testid="text-workflows-title">
              Workflows
            </h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground" data-testid="text-workflows-subtitle">
            Dummy jobs with status, ownership, and reliability
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" className="h-9" data-testid="button-shortcut">
            <Command className="mr-2 h-4 w-4" />
            Shortcuts
          </Button>
          <Button variant="secondary" className="h-9" data-testid="button-billing">
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </Button>
          <Button className="h-9" data-testid="button-create-workflow">
            <Zap className="mr-2 h-4 w-4" />
            Create
          </Button>
        </div>
      </div>

      <div className="mt-4 space-y-2" data-testid="list-workflows">
        {rows.map((w) => (
          <div
            key={w.id}
            className="rounded-2xl border border-card-border bg-white/35 px-4 py-4 transition-colors hover:bg-white/55"
            data-testid={`row-workflow-${w.id}`}
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="truncate font-semibold" data-testid={`text-workflow-name-${w.id}`}>
                    {w.name}
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      "border " +
                      (w.status === "Running"
                        ? toneClass("good")
                        : w.status === "Scheduled"
                          ? toneClass("primary")
                          : toneClass("muted"))
                    }
                    data-testid={`badge-workflow-status-${w.id}`}
                  >
                    {w.status}
                  </Badge>
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span data-testid={`text-workflow-owner-${w.id}`}>Owner: {w.owner}</span>
                  <span data-testid={`text-workflow-last-${w.id}`}>Last run: {w.lastRun}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                <div className="min-w-[220px]">
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground" data-testid={`text-workflow-sr-label-${w.id}`}>
                      Success rate
                    </span>
                    <span className="font-medium" data-testid={`text-workflow-sr-${w.id}`}>
                      {w.successRate}%
                    </span>
                  </div>
                  <Progress value={w.successRate} data-testid={`progress-workflow-${w.id}`} />
                </div>

                <Button
                  variant="secondary"
                  onClick={() => onToggle(w.id)}
                  className="h-10"
                  data-testid={`button-workflow-toggle-${w.id}`}
                >
                  {w.status === "Paused" ? (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Resume
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Pause
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function DashboardPage() {
  const [mode, setMode] = useState<"Live" | "Last 7 days" | "Last 30 days">("Live");
  const [search, setSearch] = useState("");
  const [paused, setPaused] = useState<Record<string, boolean>>({});

  const today = useMemo(() => format(new Date(), "MMM d, yyyy"), []);

  const kpis: KPI[] = useMemo(
    () => [
      {
        id: "revenue",
        label: "Net revenue",
        value: "$128.4k",
        delta: 8.3,
        hint: "Strong week-over-week lift from retention cohorts.",
        icon: <Zap className="h-5 w-5" />,
        tone: "primary",
      },
      {
        id: "users",
        label: "Active users",
        value: "42,018",
        delta: 3.2,
        hint: "Peak activity in EU evening hours.",
        icon: <Users className="h-5 w-5" />,
        tone: "accent",
      },
      {
        id: "risk",
        label: "Risk score",
        value: "12.7",
        delta: -4.1,
        hint: "Lower is better. Alerts are stabilizing.",
        icon: <Shield className="h-5 w-5" />,
        tone: "good",
      },
      {
        id: "velocity",
        label: "Ship velocity",
        value: "+17%",
        delta: 1.7,
        hint: "Automation improvements reduced cycle time.",
        icon: <Flame className="h-5 w-5" />,
        tone: "warn",
      },
    ],
    [],
  );

  const series = useMemo(
    () =>
      [
        { name: "Mon", value: 38 },
        { name: "Tue", value: 42 },
        { name: "Wed", value: 49 },
        { name: "Thu", value: 46 },
        { name: "Fri", value: 58 },
        { name: "Sat", value: 54 },
        { name: "Sun", value: 63 },
      ].map((d) => ({ ...d, value: mode === "Last 30 days" ? d.value + 10 : d.value })),
    [mode],
  );

  const bars = useMemo(
    () => [
      { name: "Search", value: 22 },
      { name: "Email", value: 18 },
      { name: "Social", value: 28 },
      { name: "Partners", value: 14 },
      { name: "Direct", value: 20 },
    ],
    [],
  );

  const activity: ActivityItem[] = useMemo(
    () => [
      {
        id: "a1",
        title: "Cohort uplift detected",
        detail: "Retention for Week-2 improved by 6.2%.",
        time: "2m ago",
        icon: <Sparkles className="h-4 w-4" />,
        tone: "primary",
      },
      {
        id: "a2",
        title: "Workflow run completed",
        detail: "Billing sync finished with 0 errors.",
        time: "11m ago",
        icon: <CheckCircle2 className="h-4 w-4" />,
        tone: "good",
      },
      {
        id: "a3",
        title: "Spike in chargeback risk",
        detail: "Review EU card traffic in the next hour.",
        time: "38m ago",
        icon: <CreditCard className="h-4 w-4" />,
        tone: "warn",
      },
    ],
    [],
  );

  const workflowsBase: Workflow[] = useMemo(
    () => [
      {
        id: "w1",
        name: "Revenue reconciliation",
        status: "Running",
        owner: "Ava",
        lastRun: "3 min ago",
        successRate: 97,
      },
      {
        id: "w2",
        name: "User onboarding stream",
        status: "Scheduled",
        owner: "Ken",
        lastRun: "Today 09:12",
        successRate: 92,
      },
      {
        id: "w3",
        name: "Fraud anomaly sweep",
        status: "Paused",
        owner: "Mina",
        lastRun: "Yesterday 18:44",
        successRate: 88,
      },
    ],
    [],
  );

  const workflows = useMemo(() => {
    const q = search.trim().toLowerCase();
    const rows = workflowsBase.map((w) => {
      const isPaused = paused[w.id] ?? w.status === "Paused";
      return {
        ...w,
        status: isPaused ? "Paused" : w.status,
      };
    });

    if (!q) return rows;
    return rows.filter(
      (w) => w.name.toLowerCase().includes(q) || w.owner.toLowerCase().includes(q),
    );
  }, [paused, search, workflowsBase]);

  function onToggle(id: string) {
    setPaused((p) => ({ ...p, [id]: !(p[id] ?? false) }));
  }

  return (
    <Shell>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={item}>
          <TopBar mode={mode} setMode={setMode} search={search} setSearch={setSearch} />
        </motion.div>

        <motion.div variants={item} className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="border-card-border bg-white/45" data-testid="badge-date">
            {today}
          </Badge>
          <Badge variant="secondary" className="border-card-border bg-white/45" data-testid="badge-dummy">
            Dummy data
          </Badge>
          <Badge variant="secondary" className="border-card-border bg-white/45" data-testid="badge-motion">
            Framer Motion
          </Badge>
        </motion.div>

        <KPIGrid kpis={kpis} />

        <motion.div variants={item}>
          <Tabs defaultValue="overview" className="w-full" data-testid="tabs-main">
            <TabsList
              className="glass inline-flex h-11 rounded-2xl border-card-border bg-white/30 p-1"
              data-testid="tabs-list"
            >
              <TabsTrigger value="overview" className="rounded-xl" data-testid="tab-overview">
                Overview
              </TabsTrigger>
              <TabsTrigger value="operations" className="rounded-xl" data-testid="tab-operations">
                Operations
              </TabsTrigger>
              <TabsTrigger value="security" className="rounded-xl" data-testid="tab-security">
                Security
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4 space-y-4" data-testid="tab-panel-overview">
              <Insights series={series} bars={bars} />
            </TabsContent>

            <TabsContent value="operations" className="mt-4" data-testid="tab-panel-operations">
              <div className="grid gap-4 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <WorkflowsTable rows={workflows} onToggle={onToggle} />
                </div>
                <ActivityFeed items={activity} />
              </div>
            </TabsContent>

            <TabsContent value="security" className="mt-4" data-testid="tab-panel-security">
              <Card className="glass rounded-2xl p-6" data-testid="card-security">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <h2 className="font-semibold" data-testid="text-security-title">
                        Guardrails
                      </h2>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground" data-testid="text-security-subtitle">
                      This is a frontend-only mockup. Actions are simulated.
                    </p>
                  </div>
                  <Button className="h-10" data-testid="button-review">
                    Review
                  </Button>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    { label: "Sessions", value: "Secure", icon: <Shield className="h-4 w-4" />, tone: "good" as const },
                    { label: "API Keys", value: "Not stored", icon: <Settings className="h-4 w-4" />, tone: "muted" as const },
                    { label: "Payments", value: "Sandbox", icon: <CreditCard className="h-4 w-4" />, tone: "warn" as const },
                    { label: "Exports", value: "Local only", icon: <Download className="h-4 w-4" />, tone: "primary" as const },
                  ].map((c, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-card-border bg-white/35 p-4"
                      data-testid={`card-guardrail-${idx}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm text-muted-foreground" data-testid={`text-guardrail-label-${idx}`}>
                            {c.label}
                          </div>
                          <div className="mt-1 font-semibold" data-testid={`text-guardrail-value-${idx}`}>
                            {c.value}
                          </div>
                        </div>
                        <div className={"inline-flex h-9 w-9 items-center justify-center rounded-xl border " + toneClass(c.tone)}>
                          {c.icon}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div variants={item}>
          <div
            className="flex flex-col gap-2 rounded-2xl border border-card-border bg-white/40 p-4 sm:flex-row sm:items-center sm:justify-between"
            data-testid="footer"
          >
            <div className="text-sm text-muted-foreground" data-testid="text-footer-left">
              Tip: press <span className="font-mono">/</span> to focus search (mock)
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" className="h-9" data-testid="button-help">
                Help
              </Button>
              <Button className="h-9" data-testid="button-upgrade">
                Upgrade
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Shell>
  );
}
