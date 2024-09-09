'use client';

import FullPageLoader from "@/components/custom/FullPageLoader";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Home() {
  const { isLoggedIn, loading } = useContext(AuthContext);
  const router = useRouter();

  if(loading) {
    return <FullPageLoader />;
  }

  if(!isLoggedIn) {
    // redirect to login page
    router.push('/login');
  } else {
    // redirect to dashboard
    router.push('/dashboard');
  }
}
