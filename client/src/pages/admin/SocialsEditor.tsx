
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
import { toast } from "sonner";
import { Loader2, Plus, Pencil, Trash2, ExternalLink } from "lucide-react";

const socialSchema = z.object({
    platform: z.string().min(1, "Platform name is required"),
    url: z.string().url("Must be a valid URL"),
    icon: z.string().optional(),
    isActive: z.boolean().default(true),
});

type SocialFormValues = z.infer<typeof socialSchema>;

export default function SocialsEditor() {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { data: socials, isLoading, refetch } = trpc.socials.list.useQuery();

    const createMutation = trpc.socials.create.useMutation({
        onSuccess: () => {
            toast.success("Social link created successfully");
            setIsDialogOpen(false);
            form.reset();
            refetch();
        },
        onError: (error) => {
            toast.error(`Failed to create social link: ${error.message}`);
        },
    });

    const updateMutation = trpc.socials.update.useMutation({
        onSuccess: () => {
            toast.success("Social link updated successfully");
            setIsDialogOpen(false);
            setEditingId(null);
            form.reset();
            refetch();
        },
        onError: (error) => {
            toast.error(`Failed to update social link: ${error.message}`);
        },
    });

    const deleteMutation = trpc.socials.delete.useMutation({
        onSuccess: () => {
            toast.success("Social link deleted successfully");
            refetch();
        },
        onError: (error) => {
            toast.error(`Failed to delete social link: ${error.message}`);
        },
    });

    const form = useForm<SocialFormValues>({
        resolver: zodResolver(socialSchema),
        defaultValues: {
            platform: "",
            url: "",
            icon: "",
            isActive: true,
        },
    });

    const onSubmit = (data: SocialFormValues) => {
        if (editingId) {
            updateMutation.mutate({
                id: editingId,
                data,
            });
        } else {
            createMutation.mutate(data);
        }
    };

    const handleEdit = (social: any) => {
        setEditingId(social.id);
        form.reset({
            platform: social.platform,
            url: social.url,
            icon: social.icon || "",
            isActive: social.isActive,
        });
        setIsDialogOpen(true);
    };

    const handleAddNew = () => {
        setEditingId(null);
        form.reset({
            platform: "",
            url: "",
            icon: "",
            isActive: true,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: number) => {
        deleteMutation.mutate({ id });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={handleAddNew}>
                            <Plus className="w-4 h-4 mr-2" /> Add Social Link
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {editingId ? "Edit Social Link" : "Add New Social Link"}
                            </DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="platform"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Platform Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Facebook" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>URL</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://facebook.com/..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="icon"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Icon (Lucide Name)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="facebook" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="isActive"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>Active</FormLabel>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={createMutation.isPending || updateMutation.isPending}
                                >
                                    {(createMutation.isPending || updateMutation.isPending) && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    {editingId ? "Update Link" : "Create Link"}
                                </Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-card border border-border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Platform</TableHead>
                            <TableHead>URL</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {socials?.map((social) => (
                            <TableRow key={social.id}>
                                <TableCell className="font-medium flex items-center gap-2">
                                    {social.platform}
                                </TableCell>
                                <TableCell>
                                    <a
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 hover:underline text-muted-foreground"
                                    >
                                        {social.url} <ExternalLink className="w-3 h-3" />
                                    </a>
                                </TableCell>
                                <TableCell>
                                    {social.isActive ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                            Active
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                            Inactive
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => handleEdit(social)}
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>

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
                                                        This action cannot be undone. This will permanently delete the social link for "{social.platform}".
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDelete(social.id)}>
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {socials?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                    No social links found. Add one to get started.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
