import {
    LayoutDashboard,
    Settings,
    User,
    UserPlus,
    Users
} from "lucide-react";

export const sidelinks = [
    {
        title: "Dashboard",
        label: "",
        href: "/admin",
        icon: <LayoutDashboard size={18} />
    },
    {
        title: "Users",
        label: "",
        href: "/admin/user",
        icon: <Users size={18} />,
        sub: [
            {
                title: "User List",
                label: "",
                href: "/admin/users",
                icon: <User size={18} />
            },
            {
                title: "Create User",
                label: "",
                href: "/admin/user/create",
                icon: <UserPlus size={18} />
            }
        ]
    },
    {
        title: "Students",
        label: "",
        href: "/admin/students",
        icon: <Users size={18} />,
        sub: [
            {
                title: "Student List",
                label: "",
                href: "/admin/students",
                icon: <User size={18} />
            },
            {
                title: "Create Student",
                label: "",
                href: "/admin/student/create",
                icon: <UserPlus size={18} />
            }
        ]
    },
    // {
    //     title: "Tasks",
    //     label: "3",
    //     href: "/tasks",
    //     icon: <IconChecklist size={18} />
    // },
    // {
    //     title: "Chats",
    //     label: "9",
    //     href: "/chats",
    //     icon: <IconMessages size={18} />
    // },
    // {
    //     title: "Apps",
    //     label: "",
    //     href: "/apps",
    //     icon: <IconApps size={18} />
    // },
    // {
    //     title: "Authentication",
    //     label: "",
    //     href: "",
    //     icon: <IconUserShield size={18} />,
    //     sub: [
    //         {
    //             title: "Sign In (email + password)",
    //             label: "",
    //             href: "/sign-in",
    //             icon: <IconHexagonNumber1 size={18} />
    //         },
    //         {
    //             title: "Sign In (Box)",
    //             label: "",
    //             href: "/sign-in-2",
    //             icon: <IconHexagonNumber2 size={18} />
    //         },
    //         {
    //             title: "Sign Up",
    //             label: "",
    //             href: "/sign-up",
    //             icon: <IconHexagonNumber3 size={18} />
    //         },
    //         {
    //             title: "Forgot Password",
    //             label: "",
    //             href: "/forgot-password",
    //             icon: <IconHexagonNumber4 size={18} />
    //         },
    //         {
    //             title: "OTP",
    //             label: "",
    //             href: "/otp",
    //             icon: <IconHexagonNumber5 size={18} />
    //         }
    //     ]
    // },
    // {
    //     title: "Analysis",
    //     label: "",
    //     href: "/analysis",
    //     icon: <IconChartHistogram size={18} />
    // },
    // {
    //     title: "Extra Components",
    //     label: "",
    //     href: "/extra-components",
    //     icon: <IconComponents size={18} />
    // },
    // {
    //     title: "Error Pages",
    //     label: "",
    //     href: "",
    //     icon: <IconExclamationCircle size={18} />,
    //     sub: [
    //         {
    //             title: "Not Found",
    //             label: "",
    //             href: "/404",
    //             icon: <IconError404 size={18} />
    //         },
    //         {
    //             title: "Internal Server Error",
    //             label: "",
    //             href: "/500",
    //             icon: <IconServerOff size={18} />
    //         },
    //         {
    //             title: "Maintenance Error",
    //             label: "",
    //             href: "/503",
    //             icon: <IconBarrierBlock size={18} />
    //         }
    //     ]
    // },
    {
        title: "Settings",
        label: "",
        href: "/settings",
        icon: <Settings size={18} />
    }
]
