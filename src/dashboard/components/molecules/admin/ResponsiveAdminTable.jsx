import PropTypes from "prop-types";

const ResponsiveAdminTable = ({ admins, onEdit, onDelete, onToggleStatus }) => (
    <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
        <table className="min-w-full bg-white dark:bg-gray-900">
            <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Name</th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Email</th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Status</th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Actions</th>
                </tr>
            </thead>
            <tbody>
                {admins.map((admin) => (
                    <tr key={admin.id} className="border-t border-gray-200 dark:border-gray-600">
                        <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{admin.name}</td>
                        <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{admin.email}</td>
                        <td className="px-4 py-2">
                            <button
                                onClick={() => onToggleStatus(admin.id, !admin.active_status)}
                                className={`px-2 py-1 rounded ${admin.active_status ? "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200" : "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200"
                                    }`}
                            >
                                {admin.active_status ? "Active" : "Inactive"}
                            </button>
                        </td>
                        <td className="px-4 py-2 space-x-2">
                            <button
                                onClick={() => onEdit(admin)}
                                className="text-blue-600 hover:underline dark:text-blue-400"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(admin.id)}
                                className="text-red-600 hover:underline dark:text-red-400"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

ResponsiveAdminTable.propTypes = {
    admins: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleStatus: PropTypes.func.isRequired,
};

export default ResponsiveAdminTable;
