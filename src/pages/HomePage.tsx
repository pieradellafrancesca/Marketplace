import DeleteDialog from "@/components/DeleteDialog";
import Header from "@/components/Header";
import Table from "@/components/Table";
import { Card } from "@/components/ui/card";

const HomePage = () => {
  return (
    <div className="p-5 border w-full min-h-screen">
      <Card className="flex flex-col shadow-none p-5">
        <DeleteDialog />
        <Header />
        <Table />
      </Card>
    </div>
  );
};

export default HomePage;
