
import { Sidebar } from "@/components/sidebar";
import { UserGreeting } from "@/components/user-greeting";
import { ToolsTabs } from "@/components/tools-tabs";
import { InputPrompt } from "@/components/input-prompt";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10">
        <div className="mx-auto max-w-4xl flex flex-col items-center">
          <UserGreeting username="ProxyYt" />
          <div className="w-full mt-12">
            <ToolsTabs />
          </div>
          <div className="w-full mt-10">
            <InputPrompt />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
