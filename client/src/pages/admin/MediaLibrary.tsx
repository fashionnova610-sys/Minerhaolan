
import { useState, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Upload, Trash2, Copy, Image as ImageIcon, RefreshCw } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function MediaLibrary() {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const utils = trpc.useUtils();

    const { data: mediaFiles, isLoading } = trpc.media.list.useQuery();

    const uploadMutation = trpc.media.upload.useMutation({
        onSuccess: () => {
            toast.success("Image uploaded successfully");
            utils.media.list.invalidate();
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        },
        onError: (error) => {
            toast.error(`Upload failed: ${error.message}`);
            setUploading(false);
        },
    });

    const deleteMutation = trpc.media.delete.useMutation({
        onSuccess: () => {
            toast.success("Image deleted successfully");
            utils.media.list.invalidate();
        },
        onError: (error) => {
            toast.error(`Delete failed: ${error.message}`);
        },
    });

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size must be less than 5MB");
            return;
        }

        setUploading(true);
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            uploadMutation.mutate({
                filename: file.name,
                file: base64,
            });
        };
        reader.readAsDataURL(file);
    };

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        toast.success("URL copied to clipboard");
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Media Library</h2>
                    <p className="text-muted-foreground">
                        Manage your images and uploads.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => utils.media.list.invalidate()}>
                        <RefreshCw className="w-4 h-4" />
                    </Button>
                    <div className="relative">
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileSelect}
                            disabled={uploading}
                        />
                        <Button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                        >
                            {uploading ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <Upload className="w-4 h-4 mr-2" />
                            )}
                            Upload Image
                        </Button>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : mediaFiles?.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 border border-dashed rounded-lg bg-secondary/10">
                    <ImageIcon className="w-12 h-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No images found</p>
                    <Button
                        variant="link"
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-2"
                    >
                        Upload your first image
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {mediaFiles?.map((file) => (
                        <div
                            key={file.name}
                            className="group relative bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all"
                        >
                            <div className="aspect-square relative bg-secondary/20">
                                <img
                                    src={file.url}
                                    alt={file.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => copyToClipboard(file.url)}
                                        title="Copy URL"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                className="h-8 w-8"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Delete Image?</DialogTitle>
                                            </DialogHeader>
                                            <p>Are you sure you want to delete <strong>{file.name}</strong>? This action cannot be undone.</p>
                                            <div className="flex justify-end gap-2 mt-4">
                                                <Button
                                                    variant="destructive"
                                                    onClick={() => deleteMutation.mutate({ filename: file.name })}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                            <div className="p-2 text-xs truncate font-mono bg-secondary/10 border-t border-border">
                                {file.name}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
