"use client";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import FullPageLoader from "./FullPageLoader";

const ProtectedComponent = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { isLoggedIn, loading } = useContext(AuthContext);

    if (loading) {
        return <FullPageLoader />;
    }

    if (!isLoggedIn) {
        router.push("/login");
    }

    return <>{children}</>;
};

export default ProtectedComponent;
