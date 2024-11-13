import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ThemeSwitch from "../atoms/ThemeSwitch";
import UserNav from "../organism/UserNav";
import { Layout } from "../templates/Layout";
import EditAdminModal from "../molecules/admin/EditAdminModal";
import { Loader } from "lucide-react";
import { useDeleteAdminMutation, useEditAdminMutation, useGetAdminsQuery, useToggleAdminStatusMutation } from "@/features/admin/adminApi";
import ResponsiveAdminTable from "../molecules/admin/ResponsiveAdminTable";


const UserListForAdminPage = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const { data: admins = [], isLoading, isError, refetch } = useGetAdminsQuery();
    const [editAdmin] = useEditAdminMutation();
    const [deleteAdmin] = useDeleteAdminMutation();
    const [toggleAdminStatus] = useToggleAdminStatusMutation();

    const openEditModal = (admin) => {
        setSelectedAdmin(admin);
        setIsModalOpen(true);
    };

    const handleEditAdmin = async (updatedData) => {
        try {
            await editAdmin({ id: selectedAdmin.id, data: updatedData }).unwrap();
            refetch(); // Refetch the list after deletion
            toast.success("Admin updated successfully");
            setIsModalOpen(false);
        } catch (error) {
            toast.error("Failed to update admin");
        }
    };

    const handleDeleteAdmin = async (id) => {
        if (window.confirm("Are you sure you want to delete this admin?")) {
            try {
                await deleteAdmin(id).unwrap();
                refetch(); // Refetch the list after deletion
                toast.success("Admin deleted successfully");
            } catch (error) {
                toast.error("Failed to delete admin");
            }
        }
    };

    const handleToggleStatus = async (id, status) => {
        try {
            await toggleAdminStatus({ id, status }).unwrap();
            refetch(); // Refetch the list after deletion
            toast.success("Admin status updated");
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    useEffect(() => {
        const isAdmin = true; // Replace this with actual admin authentication check
        if (!isAdmin) {
            toast.warning("Login as Admin");
            navigate("/login/admin");
        }
    }, [navigate]);

    if (isLoading) return <Loader />;
    if (isError) return <div>Error loading admins</div>;

    return (
        <Layout>
            <Layout.Header>
                <div className="ml-auto flex items-center space-x-4">
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>
            <Layout.Body>
                <div className="mb-4">
                    <h2 className="text-2xl font-bold">Admin Users</h2>
                    <p className="text-muted-foreground">Here’s a list of admin users!</p>
                </div>

                <ResponsiveAdminTable
                    admins={admins?.data.length > 0 && admins?.data}
                    onEdit={openEditModal}
                    onDelete={handleDeleteAdmin}
                    onToggleStatus={handleToggleStatus}
                />

                {isModalOpen && (
                    <EditAdminModal
                        admin={selectedAdmin}
                        onClose={() => setIsModalOpen(false)}
                        onSave={handleEditAdmin}
                    />
                )}
            </Layout.Body>
        </Layout>
    );
};

export default UserListForAdminPage;
