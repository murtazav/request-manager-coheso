"use client";
import React, { useContext, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/auth";

const SignUp: React.FC = () => {
    const { signup } = useContext(AuthContext);
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [isValidationError, setIsValidationError] = useState(true);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setIsValidationError(validateForm(e.target.value, password, rePassword));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setIsValidationError(validateForm(email, e.target.value, rePassword));
    };

    const handleRePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRePassword(e.target.value);
        setIsValidationError(validateForm(email, password, e.target.value));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("submit");
        await signup(email, password);
    };

    const validateForm = (email: string, password: string, rePassword: string) => {
        if (email === "" || password === "" || rePassword === "") {
            return true;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            return true;
        }

        if (password !== rePassword) {
            return true;
        }

        return false;
    };

    return (
        <div className="flex min-h-screen w-screen flex-col justify-center items-center">
            <Card className="w-10/12 md:w-2/3 lg:w-1/3">
                <CardHeader>
                    <CardTitle className="text-3xl">Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <label htmlFor="email" className="font-semibold">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            className="w-full border rounded-md p-2 mt-1 focus:outline-gray-300"
                        />
                        <label htmlFor="password" className="font-semibold mt-4">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="w-full border rounded-md p-2 mt-1 focus:outline-gray-300"
                        />
                        <label htmlFor="rePassword" className="font-semibold mt-4">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="rePassword"
                            value={rePassword}
                            onChange={handleRePasswordChange}
                            className="w-full border rounded-md p-2 mt-1 focus:outline-gray-300"
                        />
                        <Button type="submit" className="mt-6 py-6 text-lg" disabled={isValidationError}>
                            Sign Up
                        </Button>
                        <CardFooter className="flex justify-center mt-6">
                            <CardDescription>Already have an account?</CardDescription>
                            <Button className="ml-2" onClick={(e) => {
                                e.preventDefault();
                                router.push("/login")}}>
                                Login
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default SignUp;
