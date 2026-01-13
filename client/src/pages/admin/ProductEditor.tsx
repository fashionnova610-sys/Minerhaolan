
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";

const productSchema = z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required"),
    manufacturer: z.string().min(1, "Manufacturer is required"),
    model: z.string().min(1, "Model is required"),
    algorithm: z.string().min(1, "Algorithm is required"),
    hashrate: z.string().min(1, "Hashrate is required"),
    power: z.coerce.number().min(0, "Power must be positive"),
    efficiency: z.string().min(1, "Efficiency is required"),
    price: z.coerce.number().min(0, "Price must be positive"),
    currency: z.string().default("USD"),
    condition: z.enum(["new", "used"]),
    cooling: z.enum(["air", "hydro", "immersion"]),
    category: z.string().min(1, "Category is required"),
    imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    description: z.string().optional(),
    inStock: z.boolean().default(true),
    featured: z.boolean().default(false),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function ProductEditor() {
    const [, setLocation] = useLocation();
    const [match, params] = useRoute("/admin/products/:id/edit");
    const isEditing = !!match;
    const productId = params?.id ? parseInt(params.id) : undefined;

    const { data: product, isLoading: isLoadingProduct } = trpc.products.list.useQuery(
        undefined,
        {
            select: (products) => products.find((p) => p.id === productId),
            enabled: isEditing && !!productId,
        }
    );

    const createMutation = trpc.products.create.useMutation({
        onSuccess: () => {
            toast.success("Product created successfully");
            setLocation("/admin");
        },
        onError: (error) => {
            toast.error(`Failed to create product: ${error.message}`);
        },
    });

    const updateMutation = trpc.products.update.useMutation({
        onSuccess: () => {
            toast.success("Product updated successfully");
            setLocation("/admin");
        },
        onError: (error) => {
            toast.error(`Failed to update product: ${error.message}`);
        },
    });

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            slug: "",
            manufacturer: "",
            model: "",
            algorithm: "",
            hashrate: "",
            power: 0,
            efficiency: "",
            price: 0,
            currency: "USD",
            condition: "new",
            cooling: "air",
            category: "",
            imageUrl: "",
            description: "",
            inStock: true,
            featured: false,
        },
    });

    useEffect(() => {
        if (product) {
            form.reset({
                name: product.name,
                slug: product.slug,
                manufacturer: product.manufacturer,
                model: product.model,
                algorithm: product.algorithm,
                hashrate: product.hashrate,
                power: product.power,
                efficiency: product.efficiency,
                price: product.price / 100, // Convert cents to dollars
                currency: product.currency,
                condition: product.condition as "new" | "used",
                cooling: product.cooling as "air" | "hydro" | "immersion",
                category: product.category,
                imageUrl: product.imageUrl || "",
                description: product.description || "",
                inStock: product.inStock,
                featured: product.featured,
            });
        }
    }, [product, form]);

    const onSubmit = (data: ProductFormValues) => {
        const submissionData = {
            ...data,
            price: Math.round(data.price * 100), // Convert dollars to cents
        };

        if (isEditing && productId) {
            updateMutation.mutate({
                id: productId,
                data: submissionData,
            });
        } else {
            createMutation.mutate(submissionData);
        }
    };

    if (isEditing && isLoadingProduct) {
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
                        {isEditing ? "Edit Product" : "Add New Product"}
                    </h1>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Bitmain Antminer S21" {...field} />
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
                                                <Input placeholder="antminer-s21" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="manufacturer"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Manufacturer</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Bitmain" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="model"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Model</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Antminer S21" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price (USD)</FormLabel>
                                            <FormControl>
                                                <Input type="number" step="0.01" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="bitcoin-miner">Bitcoin Miner</SelectItem>
                                                    <SelectItem value="altcoin-miner">Altcoin Miner</SelectItem>
                                                    <SelectItem value="accessories">Accessories</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="algorithm"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Algorithm</FormLabel>
                                            <FormControl>
                                                <Input placeholder="SHA-256" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="hashrate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Hashrate</FormLabel>
                                            <FormControl>
                                                <Input placeholder="200 TH/s" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="power"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Power (Watts)</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="efficiency"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Efficiency</FormLabel>
                                            <FormControl>
                                                <Input placeholder="17.5 J/TH" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="cooling"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Cooling</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select cooling type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="air">Air Cooled</SelectItem>
                                                    <SelectItem value="hydro">Hydro Cooled</SelectItem>
                                                    <SelectItem value="immersion">Immersion Cooled</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="condition"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Condition</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select condition" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="new">New</SelectItem>
                                                    <SelectItem value="used">Used</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Product description..."
                                                className="min-h-[100px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-6">
                                <FormField
                                    control={form.control}
                                    name="inStock"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>In Stock</FormLabel>
                                                <FormDescription>
                                                    Is this product currently available?
                                                </FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="featured"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>Featured</FormLabel>
                                                <FormDescription>
                                                    Show on homepage and top of lists?
                                                </FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>

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
                                    {isEditing ? "Update Product" : "Create Product"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Layout>
    );
}
