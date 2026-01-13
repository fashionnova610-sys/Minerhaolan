
import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2, Loader2, FileText, Package, Share2, Image as ImageIcon } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SocialsEditor from "./SocialsEditor";
import MediaLibrary from "./MediaLibrary";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AdminDashboard() {
    const { data: products, isLoading: isLoadingProducts, refetch: refetchProducts } = trpc.products.list.useQuery();
    const { data: pages, isLoading: isLoadingPages, refetch: refetchPages } = trpc.pages.list.useQuery();

    const deleteProductMutation = trpc.products.delete.useMutation({
        onSuccess: () => {
            toast.success("Product deleted successfully");
            refetchProducts();
        },
        onError: (error) => {
            toast.error(`Failed to delete product: ${error.message}`);
        },
    });

    const deletePageMutation = trpc.pages.delete.useMutation({
        onSuccess: () => {
            toast.success("Page deleted successfully");
            refetchPages();
        },
        onError: (error) => {
            toast.error(`Failed to delete page: ${error.message}`);
        },
    });

    const handleDeleteProduct = (id: number) => {
        deleteProductMutation.mutate({ id });
    };

    const handleDeletePage = (id: number) => {
        deletePageMutation.mutate({ id });
    };

    if (isLoadingProducts || isLoadingPages) {
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
            <div className="container py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-heading font-bold">Admin Dashboard</h1>
                </div>

                <Tabs defaultValue="products" className="w-full">
                    <TabsList className="mb-8">
                        <TabsTrigger value="products" className="flex items-center gap-2">
                            <Package className="w-4 h-4" /> Products
                        </TabsTrigger>
                        <TabsTrigger value="pages" className="flex items-center gap-2">
                            <FileText className="w-4 h-4" /> Pages
                        </TabsTrigger>
                        <TabsTrigger value="socials" className="flex items-center gap-2">
                            <Share2 className="w-4 h-4" /> Socials
                        </TabsTrigger>
                        <TabsTrigger value="media" className="flex items-center gap-2">
                            <ImageIcon className="w-4 h-4" /> Media
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="products">
                        <div className="flex justify-end mb-4">
                            <Link href="/admin/products/new">
                                <Button>
                                    <Plus className="w-4 h-4 mr-2" /> Add New Product
                                </Button>
                            </Link>
                        </div>
                        <div className="bg-card border border-border rounded-lg overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Image</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Stock</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {products?.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell>
                                                {product.imageUrl && (
                                                    <img
                                                        src={product.imageUrl}
                                                        alt={product.name}
                                                        className="w-12 h-12 object-contain"
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell className="font-medium">{product.name}</TableCell>
                                            <TableCell>
                                                {new Intl.NumberFormat("en-US", {
                                                    style: "currency",
                                                    currency: product.currency,
                                                }).format(product.price / 100)}
                                            </TableCell>
                                            <TableCell>
                                                {product.inStock ? (
                                                    <span className="text-green-500 font-medium">In Stock</span>
                                                ) : (
                                                    <span className="text-red-500 font-medium">Out of Stock</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="capitalize">
                                                {product.category?.replace("-", " ")}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/admin/products/${product.id}/edit`}>
                                                        <Button variant="outline" size="icon">
                                                            <Pencil className="w-4 h-4" />
                                                        </Button>
                                                    </Link>

                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="destructive" size="icon">
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This action cannot be undone. This will permanently delete the product
                                                                    "{product.name}".
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDeleteProduct(product.id)}>
                                                                    Delete
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {products?.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                                No products found. Create one to get started.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>

                    <TabsContent value="pages">
                        <div className="flex justify-end mb-4">
                            <Link href="/admin/pages/new">
                                <Button>
                                    <Plus className="w-4 h-4 mr-2" /> Add New Page
                                </Button>
                            </Link>
                        </div>
                        <div className="bg-card border border-border rounded-lg overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Slug</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Last Updated</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pages?.map((page) => (
                                        <TableRow key={page.id}>
                                            <TableCell className="font-medium">{page.title}</TableCell>
                                            <TableCell className="text-muted-foreground">/{page.slug}</TableCell>
                                            <TableCell>
                                                {page.published ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                        Published
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                                        Draft
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(page.updatedAt).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/admin/pages/${page.id}/edit`}>
                                                        <Button variant="outline" size="icon">
                                                            <Pencil className="w-4 h-4" />
                                                        </Button>
                                                    </Link>

                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="destructive" size="icon">
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This action cannot be undone. This will permanently delete the page
                                                                    "{page.title}".
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDeletePage(page.id)}>
                                                                    Delete
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {pages?.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                                No pages found. Create one to get started.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>

                    <TabsContent value="socials">
                        <SocialsEditor />
                    </TabsContent>

                    <TabsContent value="media">
                        <MediaLibrary />
                    </TabsContent>
                </Tabs>
            </div>
        </Layout>
    );
}
