"use client";
import { DataRequest } from "@/types/data-request";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import Header from "./Header";
import { getDataRequestsApi } from "@/services/api-services";
import { use, useEffect, useState } from "react";

const Dashboard: React.FC = () => {
    const [data, setData] = useState<DataRequest[]>([]);
    const getData = async () => {
        try {
            const data = await getDataRequestsApi();
            setData(data.dataRequests);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getData();
    }, []);

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
