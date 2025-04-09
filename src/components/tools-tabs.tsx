
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToolCard } from './tool-card';

export function ToolsTabs() {
  const [activeTab, setActiveTab] = useState("interactive-tools");
  
  return (
    <Tabs defaultValue="interactive-tools" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-2 bg-[#1A1F2C]">
        <TabsTrigger value="interactive-tools" className="data-[state=active]:bg-blue-600">Interactive Tools</TabsTrigger>
        <TabsTrigger value="examples" className="data-[state=active]:bg-blue-600">Examples</TabsTrigger>
      </TabsList>
      <div className="mt-8">
        <p className="text-center text-gray-400 mb-6">
          Learn exactly how you want to alongside Feynman, with every learning tool you might need at your disposal.
        </p>
      </div>
      <TabsContent value="interactive-tools" className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ToolCard 
          icon="graph"
          title="GRAPHING"
          description="Generate, edit, and analyze graphs and plots"
          tag="@graph"
        />
        <ToolCard 
          icon="video"
          title="VIDEO GENERATION"
          description="Generate personalized video lessons to visualize concepts"
          tag="@video"
        />
        <ToolCard 
          icon="whiteboard"
          title="WHITEBOARD"
          description="Draw and diagram your ideas and notes"
          tag="@whiteboard"
        />
      </TabsContent>
      <TabsContent value="examples">
        <div className="text-center text-gray-400">
          Example content would go here.
        </div>
      </TabsContent>
    </Tabs>
  );
}
