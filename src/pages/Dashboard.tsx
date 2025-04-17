import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  return (
    <div>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Dashboard</TabsTrigger>
          <TabsTrigger value="password">account</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            alias itaque vel. Doloribus at aliquam, quidem porro soluta iusto
            veniam vero fugiat quis maxime earum perspiciatis iste, et expedita
            eveniet.
          </div>
        </TabsContent>
        <TabsContent value="password">
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            alias itaque vel. Doloribus at aliquam, quidem porro soluta iusto
            veniam vero fugiat quis maxime earum perspiciatis iste, et expedita
            eveniet. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quae doloremque quisquam similique quod, libero ullam culpa, earum
            maiores a dolorem ipsum eveniet voluptatum itaque alias provident ut
            reprehenderit, deleniti in.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
