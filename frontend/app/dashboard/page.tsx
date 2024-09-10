import { columns, Payment } from "./Columns";
import { DataTable } from "./DataTable";
import Header from "./Header";

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
    ]
  }

const Dashboard: React.FC = async () => {
    const data = await getData();

    return (
        <div className="flex min-h-screen w-screen flex-col overflow-x-hidden">
            <Header />
            <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />

            </div>
        </div>
    );
};

export default Dashboard;