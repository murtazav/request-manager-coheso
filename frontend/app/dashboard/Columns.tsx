"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DataRequest } from "@/types/data-request";
import { deleteDataRequestApi } from "@/services/api-services";

export const columns: ColumnDef<DataRequest>[] = [
    {
        accessorKey: "requestType",
        header: "Request Type",
    },
    {
        accessorKey: "purpose",
        header: "Purpose",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            const request = row.original;
            return request?.createdAt ? new Date(request.createdAt).toLocaleDateString() : "";
        },
    },
    {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => {
            const dataRequest = row.original;
            const deleteDataRequest = async () => {
                try {
                    await deleteDataRequestApi(dataRequest.id as number);
                    window.location.reload();
                } catch (error) {
                    console.error(error);
                }
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(dataRequest?.id?.toString() ?? "")}>
                            Copy Request ID
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                // router.push(`/add-or-update-request?id=${dataRequest?.id}`);
                                window.history.pushState({}, "", `/add-or-update-request?id=${dataRequest?.id}`);
                            }}
                        >
                            Update
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={deleteDataRequest}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
