
import { Sidebar } from "@/components/sidebar";
import { UserGreeting } from "@/components/user-greeting";
import { ToolsTabs } from "@/components/tools-tabs";
import { InputPrompt } from "@/components/input-prompt";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className={`flex-1 p-4 md:p-10 ${isMobile ? 'pt-16' : ''}`}>
        <div className="mx-auto max-w-4xl flex flex-col items-center">
          <UserGreeting username="ProxyYt" />
          <div className="w-full mt-8 md:mt-12">
            <ToolsTabs />
          </div>
          <div className="w-full mt-6 md:mt-10">
            <InputPrompt />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
