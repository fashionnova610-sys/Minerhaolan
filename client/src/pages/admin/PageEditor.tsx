
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation, useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";

const pageSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    content: z.string().min(1, "Content is required"),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    published: z.boolean().default(false),
});

type PageFormValues = z.infer<typeof pageSchema>;

export default function PageEditor() {
    const [, setLocation] = useLocation();
    const [match, params] = useRoute("/admin/pages/:id/edit");
    const isEditing = !!match;
    const pageId = params?.id ? parseInt(params.id) : undefined;

    const { data: page, isLoading: isLoadingPage } = trpc.pages.list.useQuery(
        undefined,
        {
            select: (pages) => pages.find((p) => p.id === pageId),
            enabled: isEditing && !!pageId,
        }
    );

    const createMutation = trpc.pages.create.useMutation({
        onSuccess: () => {
            toast.success("Page created successfully");
            setLocation("/admin");
        },
        onError: (error) => {
            toast.error(`Failed to create page: ${error.message}`);
        },
    });

    const updateMutation = trpc.pages.update.useMutation({
        onSuccess: () => {
            toast.success("Page updated successfully");
            setLocation("/admin");
        },
        onError: (error) => {
            toast.error(`Failed to update page: ${error.message}`);
        },
    });

    const form = useForm<PageFormValues>({
        resolver: zodResolver(pageSchema),
        defaultValues: {
            title: "",
            slug: "",
            content: "",
            metaTitle: "",
            metaDescription: "",
            published: false,
        },
    });

    useEffect(() => {
        if (page) {
            form.reset({
                title: page.title,
                slug: page.slug,
                content: page.content,
                metaTitle: page.metaTitle || "",
                metaDescription: page.metaDescription || "",
                published: page.published,
            });
        }
    }, [page, form]);

    const onSubmit = (data: PageFormValues) => {
        if (isEditing && pageId) {
            updateMutation.mutate({
                id: pageId,
                data,
            });
        } else {
            createMutation.mutate(data);
        }
    };

    if (isEditing && isLoadingPage) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-screen">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container py-12 max-w-3xl">
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        className="pl-0 hover:bg-transparent hover:text-primary mb-4"
                        onClick={() => setLocation("/admin")}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                    </Button>
                    <h1 className="text-3xl font-heading font-bold">
                        {isEditing ? "Edit Page" : "Add New Page"}
                    </h1>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Page Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="About Us" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Slug (URL Identifier)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="about-us" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Content (Markdown/HTML)</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="# About Us..."
                                                className="min-h-[300px] font-mono"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="metaTitle"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>SEO Meta Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="About MinerHaolan" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="metaDescription"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>SEO Meta Description</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Learn more about us..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="published"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>Published</FormLabel>
                                            <FormDescription>
                                                Make this page visible to the public?
                                            </FormDescription>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setLocation("/admin")}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                                    {(createMutation.isPending || updateMutation.isPending) && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    {isEditing ? "Update Page" : "Create Page"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Layout>
    );
}
