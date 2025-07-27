import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";

interface ProfilePictureModalProps {
    imageUrl: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProfilePictureModal({
    imageUrl,
    isOpen,
    onClose,
}: ProfilePictureModalProps) {
    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => (!open ? onClose() : undefined)}
        >
            <DialogContent
                className="flex flex-col items-center justify-center !p-0 !border-0 bg-transparent shadow-none max-w-[95vw] max-h-[90vh]"
                showCloseButton={true}
            >
                <Image
                    src={imageUrl}
                    alt="Profile"
                    width={512}
                    height={512}
                    className="object-contain max-w-[80vw] max-h-[80vh]"
                    unoptimized
                />
            </DialogContent>
        </Dialog>
    );
}
