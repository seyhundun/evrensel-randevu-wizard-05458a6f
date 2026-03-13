import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import ControlPanel from "@/components/ControlPanel";
import StatusPanel from "@/components/StatusPanel";
import ApplicantList from "@/components/ApplicantList";
import TrackingLogs from "@/components/TrackingLogs";
import VfsAccounts from "@/components/VfsAccounts";
import IdataControlPanel from "@/components/IdataControlPanel";
import IdataAccounts from "@/components/IdataAccounts";
import IdataTrackingLogs from "@/components/IdataTrackingLogs";
import { useTracking } from "@/hooks/useTracking";

const Index = () => {
  const t = useTracking();
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-4 py-2 flex items-center justify-between">
        <h1 className="text-lg font-semibold">🛂 Randevu Takip Paneli</h1>
        <Button variant="ghost" size="sm" onClick={signOut} className="gap-1.5 text-muted-foreground">
          <LogOut className="w-4 h-4" />
          Çıkış
        </Button>
      </header>

      <Tabs defaultValue="vfs" className="w-full">
        <div className="border-b border-border bg-card px-4">
          <TabsList className="h-10 bg-transparent p-0 gap-4">
            <TabsTrigger value="vfs" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-1 pb-2">
              🌍 VFS Global
            </TabsTrigger>
            <TabsTrigger value="idata" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-1 pb-2">
              🇮🇹 iDATA İtalya
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="vfs" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] min-h-[calc(100vh-90px)]">
            <ControlPanel
              country={t.country}
              setCountry={t.setCountry}
              city={t.city}
              setCity={t.setCity}
              visaCategory={t.visaCategory}
              setVisaCategory={t.setVisaCategory}
              personCount={t.personCount}
              setPersonCount={t.setPersonCount}
              interval={t.interval}
              setIntervalValue={t.setIntervalValue}
              keepAlive={t.keepAlive}
              setKeepAlive={t.setKeepAlive}
              status={t.status}
              onStart={t.startTracking}
              onStop={t.stopTracking}
            />
            <main className="p-4 md:p-6 lg:p-8 space-y-6 overflow-y-auto max-h-[calc(100vh-90px)]">
              <StatusPanel
                status={t.status}
                country={t.country}
                city={t.city}
                elapsedSeconds={t.elapsedSeconds}
                checksCount={t.checksCount}
                onSimulateFound={t.simulateFound}
                configId={t.configId}
              />
              <ApplicantList
                applicants={t.applicants}
                onUpdate={t.updateApplicant}
                personCount={t.personCount}
                setPersonCount={t.setPersonCount}
              />
              <VfsAccounts />
              <TrackingLogs configId={t.configId} />
            </main>
          </div>
        </TabsContent>

        <TabsContent value="idata" className="mt-0">
          <main className="p-4 md:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto">
            <IdataControlPanel />
            <IdataAccounts />
            <IdataTrackingLogs />
          </main>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
