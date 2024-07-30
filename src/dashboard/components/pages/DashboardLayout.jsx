import Sidebar from "@/dashboard/components/templates/Sidebar";
import useIsCollapsed from "@/hooks/useIsCollapsed";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    const [isCollapsed, setIsCollapsed] = useIsCollapsed();

    return (
        <>
            <div className="relative h-full overflow-hidden bg-background">
                <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

                <main
                    id='content'
                    className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? 'md:ml-14' : 'md:ml-64'} h-full`}
                >
                    <Outlet />
                </main>
            </div>
        </>
    )
}

export default DashboardLayout;