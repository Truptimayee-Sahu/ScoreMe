import { useState, useCallback } from "react";
import { getRequests, getAuditLog, getStats } from "@/lib/workflow-engine";
import RequestForm from "@/components/RequestForm";
import RequestTable from "@/components/RequestTable";
import AuditLogTable from "@/components/AuditLogTable";
import StatCards from "@/components/StatCards";
import RulesConfig from "@/components/RulesConfig";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Workflow } from "lucide-react";

const Index = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = useCallback(() => setRefreshKey((k) => k + 1), []);

  // Re-read data on each render triggered by refreshKey
  const requests = getRequests();
  const auditEntries = getAuditLog();
  const stats = getStats();

  // Suppress unused var warning
  void refreshKey;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center gap-3 py-4 px-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Workflow className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Workflow Decision Platform</h1>
            <p className="text-xs text-muted-foreground">
              Configurable rule engine · Audit logging · Retry handling
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        <StatCards stats={stats} />

        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          {/* Left column */}
          <div className="space-y-6">
            <RequestForm onSubmitted={refresh} />
            <RulesConfig />
          </div>

          {/* Right column */}
          <Tabs defaultValue="requests" className="w-full">
            <TabsList>
              <TabsTrigger value="requests">Requests</TabsTrigger>
              <TabsTrigger value="audit">Audit Log</TabsTrigger>
            </TabsList>
            <TabsContent value="requests" className="mt-4">
              <RequestTable requests={requests} />
            </TabsContent>
            <TabsContent value="audit" className="mt-4">
              <AuditLogTable entries={auditEntries} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Index;
