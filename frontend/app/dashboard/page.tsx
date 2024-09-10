"use client";
import { DataRequest } from "@/types/data-request";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import Header from "./Header";
import { getDataRequestsApi } from "@/services/api-services";
import { useEffect, useState } from "react";
import ProtectedComponent from "@/components/custom/ProtectedComponent";
import FullPageLoader from "@/components/custom/FullPageLoader";

const Dashboard: React.FC = () => {
    const [data, setData] = useState<DataRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const getData = async () => {
        try {
            const data = await getDataRequestsApi();
            setData(data.dataRequests);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getData();
    }, []);

    if (loading) {
        return <FullPageLoader/>;
    }

    return (
        <div className="flex min-h-screen w-screen flex-col overflow-x-hidden">
            <Header />
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    );
};

const ProtectedDashboard = () => {
    return (
        <ProtectedComponent>
            <Dashboard />
        </ProtectedComponent>
    );
};

export default ProtectedDashboard;
