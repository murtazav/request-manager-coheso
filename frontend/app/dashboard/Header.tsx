"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
    const router = useRouter();
    return (
        <div className="w-screen h-[56px] bg-gray-800 flex items-center justify-between px-12">
            <div className="">
                <p className="text-white text-xl">Data Requests</p>
            </div>
            <Button className="flex gap-2" onClick={() => router.push("/add-or-update-request")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 256 256">
                    <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
                </svg>
                Add Request
            </Button>
        </div>
    );
};

export default Header;
