import { useState } from "react";

const EditAdminModal = ({ admin, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: admin.name,
        email: admin.email,
        password: "",  // Optional field for password
        email_verified_at: admin.email_verified_at || "",  // Editable verified date
        active_status: Boolean(admin.active_status),  // Ensure it's a boolean
        role: admin.roles[0] || "admin"  // Default to first role or "admin"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Convert active_status to boolean
        setFormData({
            ...formData,
            [name]: name === "active_status" ? value === "true" : value
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-auto shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-200">Edit Admin</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Name:</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 rounded border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Email:</label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 rounded border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Leave blank to keep current password"
                            className="w-full p-2 rounded border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Email Verified At:</label>
                        <input
                            type="datetime-local"
                            name="email_verified_at"
                            value={formData.email_verified_at}
                            onChange={handleChange}
                            className="w-full p-2 rounded border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Status:</label>
                        <select
                            name="active_status"
                            value={formData.active_status}
                            onChange={handleChange}
                            className="w-full p-2 rounded border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        >
                            <option value={true}>Active</option>
                            <option value={false}>Inactive</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Role:</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full p-2 rounded border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        >
                            <option value="admin">Admin</option>
                            <option value="sub-admin">Sub-Admin</option>
                            <option value="editor">Editor</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditAdminModal;
