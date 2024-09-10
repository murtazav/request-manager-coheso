'use client';
import ProtectedComponent from "@/components/custom/ProtectedComponent";
import { useRouter } from "next/navigation";

function Home() {
  const router = useRouter();

  router.push("/dashboard");
  return <></>;
}

const ProtectedHome = () => {
  return <ProtectedComponent><Home /></ProtectedComponent>;
}

export default ProtectedHome;