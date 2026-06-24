"use client";

import { deleteProperty } from "@/lib/api/property/actions";
import { Button, Modal } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const DeletePropertyModal = ({ isDeleteOpen, setIsDeleteOpen, id }) => {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteProperty = async () => {
        try {
            setIsDeleting(true);
            const res = await deleteProperty(id);
            
            if (res?.deletedCount > 0) {
                toast.success("Property listing deleted successfully");
                setIsDeleteOpen(false);
                router.refresh();
            } else {
                toast.error("Failed to delete the property");
            }
        } catch (error) {
            console.error("Error deleting property:", error);
            toast.error("Something went wrong");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Modal open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <Modal.Backdrop className="backdrop-blur-sm">
                <Modal.Container>
                    <Modal.Dialog className="dark text-white bg-slate-950 border border-white/10 p-2 rounded-2xl max-w-md mx-auto w-full">
                        <Modal.CloseTrigger onClick={() => setIsDeleteOpen(false)} />
                        <Modal.Header className="text-white font-bold text-lg border-b border-white/5 pb-2">
                            <Modal.Heading>Delete Property Listing</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="py-4">
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Are you sure you want to delete this property? This action will permanently remove the listing, images, and pricing info from our platform. This cannot be undone.
                            </p>
                        </Modal.Body>
                        <Modal.Footer className="flex justify-end gap-3 pt-2 border-t border-white/5">
                            <Button 
                                variant="light" 
                                className="text-slate-400 hover:text-white" 
                                onPress={() => setIsDeleteOpen(false)}
                                isDisabled={isDeleting}
                            >
                                Cancel
                            </Button>
                            <Button 
                                color="danger" 
                                className="font-bold bg-red-600 hover:bg-red-700 text-white" 
                                onPress={handleDeleteProperty}
                                isLoading={isDeleting}
                            >
                                Delete Property
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default DeletePropertyModal;