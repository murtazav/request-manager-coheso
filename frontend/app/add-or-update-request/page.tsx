"use client";
import FullPageLoader from "@/components/custom/FullPageLoader";
import ProtectedComponent from "@/components/custom/ProtectedComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createDataRequestApi, getDataRequestByIdApi, updateDataRequestApi } from "@/services/api-services";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const isUnique = (arr: string[]) => new Set(arr).size === arr.length;

// Schema for validation
const formSchema = z.object({
    requestType: z.string().min(4, {
        message: "Request type must be at least 4 characters.",
    }),
    purpose: z.string().min(4, {
        message: "Purpose must be at least 4 characters.",
    }),
    info: z.array(
        z
            .object({
                format: z.enum(["text", "longText", "number", "date", "tags", "boolean", "option"]),
                isRequired: z.boolean(),
                name: z.string().min(4, {
                    message: "Name must be at least 4 characters.",
                }),
                description: z.string().min(4, {
                    message: "Description must be at least 4 characters.",
                }),
                boundValues: z
                    .array(z.string())
                    .refine(isUnique, {
                        message: "Bound values must be unique.",
                    })
                    .optional(),
            })
            .superRefine((data, ctx) => {
                if (["tags", "option"].includes(data.format)) {
                    if (!data.boundValues || data.boundValues.length === 0) {
                        ctx.addIssue({
                            code: z.ZodIssueCode.custom,
                            message: "Bound Values must be provided when format is 'tags' or 'option'.",
                            path: ["boundValues"],
                        });
                    }
                }
            })
    ),
});

const AddRequest = () => {
    const router = useRouter();
    const [loading, setloading] = useState(false);
    const search = useSearchParams();
    const id = search.get("id");

    const getData = async (id: number) => {
        try {
            const data = await getDataRequestByIdApi(id);
            form.reset(data.dataRequest);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (id) {
            getData(parseInt(id));
        }
    }, [id]);

    // Initialize the form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            requestType: "",
            purpose: "",
            info: [],
        },
    });

    // UseFieldArray for dynamic info fields
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "info",
    });

    // Watch for form changes
    const infoFields = form.watch("info");

    // Handle adding a bound value (tags or options)
    const addBoundValue = (index: number, value: string) => {
        const currentValues = form.getValues(`info.${index}.boundValues`) || [];
        form.setValue(`info.${index}.boundValues`, [...currentValues, value]);
        form.clearErrors(`info.${index}.boundValues`);
    };

    // Handle removing a bound value (tags or options)
    const removeBoundValue = (index: number, value: string) => {
        const currentValues = form.getValues(`info.${index}.boundValues`) || [];
        form.setValue(
            `info.${index}.boundValues`,
            currentValues.filter((v) => v !== value)
        );
    };

    // Form submit handler
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setloading(true);
            const res = id ? await updateDataRequestApi({ ...values, id: parseInt(id) }) : await createDataRequestApi(values);
            if (res) {
                router.push("/dashboard");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setloading(false);
        }
    };

    if (loading) {
        return <FullPageLoader />;
    }

    return (
        <div className="flex min-h-screen w-screen flex-col overflow-x-hidden">
            <div className="fixed w-screen h-[56px] bg-gray-900 flex items-center justify-between px-12">
                <p className="text-white text-xl">{`${id ? "Update" : "Add"}`} Request</p>
                <Button onClick={() => router.push("/dashboard")}>
                    <X size={20} color="white" />
                </Button>
            </div>
            <div className="w-full px-12 md:px-[200px] lg:px-[400px] py-10 mt-[56px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* Request Type */}
                        <FormField
                            control={form.control}
                            name="requestType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-gray-300">Request Type</FormLabel>
                                    <FormDescription>Type of request (e.g., Data Request)</FormDescription>
                                    <FormControl>
                                        <Input placeholder="Data Request" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Purpose */}
                        <FormField
                            control={form.control}
                            name="purpose"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-gray-300">Purpose</FormLabel>
                                    <FormDescription>State the purpose of this request</FormDescription>
                                    <FormControl>
                                        <Input placeholder="Purpose of the request" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Dynamic Info Fields */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-300">Info Fields</h3>
                            {fields.map((field, index) => (
                                <Card key={field.id}>
                                    <CardHeader className="">
                                        <div className="w-full flex justify-between">
                                            <CardTitle className="text-xl">Field {index + 1}</CardTitle>
                                            <Button variant="ghost" onClick={() => remove(index)}>
                                                <X size={20} />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {/* Format */}
                                        <FormField
                                            control={form.control}
                                            name={`info.${index}.format`}
                                            render={({ field: formatField }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-800 font-semibold">Format</FormLabel>
                                                    <FormDescription>Select the data format for this field</FormDescription>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={(value) => {
                                                                formatField.onChange(value);
                                                                // Reset boundValues when format changes
                                                                form.setValue(`info.${index}.boundValues`, []);
                                                            }}
                                                            value={formatField.value}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select a format" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="text">Text</SelectItem>
                                                                <SelectItem value="longText">Long Text</SelectItem>
                                                                <SelectItem value="number">Number</SelectItem>
                                                                <SelectItem value="date">Date</SelectItem>
                                                                <SelectItem value="tags">Tags</SelectItem>
                                                                <SelectItem value="boolean">Boolean</SelectItem>
                                                                <SelectItem value="option">Option</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Name */}
                                        <FormField
                                            control={form.control}
                                            name={`info.${index}.name`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-800 font-semibold">Name</FormLabel>
                                                    <FormDescription>Name of the field</FormDescription>
                                                    <FormControl>
                                                        <Input placeholder="Field Name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Description */}
                                        <FormField
                                            control={form.control}
                                            name={`info.${index}.description`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-800 font-semibold">Description</FormLabel>
                                                    <FormDescription>Provide a description of this field</FormDescription>
                                                    <FormControl>
                                                        <Textarea placeholder="Field Description" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Bound Values (Visible only for tags or option) */}
                                        {["tags", "option"].includes(infoFields[index]?.format) && (
                                            <FormField
                                                control={form.control}
                                                name={`info.${index}.boundValues`}
                                                render={() => (
                                                    <FormItem>
                                                        <FormLabel className="text-gray-800 font-semibold">Bound Values</FormLabel>
                                                        <FormDescription>Enter values for tags or options</FormDescription>
                                                        <FormControl>
                                                            <div className="flex flex-wrap items-center gap-2">
                                                                {infoFields[index]?.boundValues?.map((value, i) => (
                                                                    <div key={i} className="flex items-center bg-gray-200 px-2 py-1 rounded-md">
                                                                        <span>{value}</span>
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                removeBoundValue(index, value);
                                                                            }}
                                                                            className="ml-2"
                                                                        >
                                                                            <X size={12} />
                                                                        </Button>
                                                                    </div>
                                                                ))}
                                                                <Input
                                                                    placeholder="Add value"
                                                                    onKeyDown={(e) => {
                                                                        if (e.key === "Enter" && e.currentTarget.value) {
                                                                            e.preventDefault();
                                                                            addBoundValue(index, e.currentTarget.value);
                                                                            e.currentTarget.value = "";
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )}
                                    </CardContent>
                                </Card>
                            ))}

                            {/* Add Info Field Button */}
                            <Button
                                type="button"
                                onClick={() =>
                                    append({
                                        format: "text",
                                        isRequired: false,
                                        name: "",
                                        description: "",
                                        boundValues: [],
                                    })
                                }
                                className="flex gap-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" viewBox="0 0 256 256">
                                    <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
                                </svg>
                                Add Info Field
                            </Button>
                        </div>

                        {/* Submit Button */}
                        <Button type="submit" className="h-14 w-full flex gap-2 text-lg">
                            Submit
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff" viewBox="0 0 256 256">
                                <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
                            </svg>
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

const ProtectedAddRequest = () => {
    return (
        <ProtectedComponent>
            <AddRequest />
        </ProtectedComponent>
    );
};

export default ProtectedAddRequest;
