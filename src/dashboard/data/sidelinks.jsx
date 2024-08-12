import {
    BookOpenCheck,
    CalendarFold,
    FileQuestion,
    Group,
    LayoutDashboard,
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
    {
        title: "Questions",
        label: "",
        href: "/admin/questions",
        icon: <FileQuestion size={18} />,
        sub: [
            {
                title: "Section",
                label: "",
                href: "/admin/questions/section",
                icon: <FileQuestion size={18} />
            },
            {
                title: "Exam Type",
                label: "",
                href: "/admin/questions/exam-type",
                icon: <FileQuestion size={18} />
            },
            {
                title: "Exam Sub-Type",
                label: "",
                href: "/admin/questions/exam-sub-type",
                icon: <Group size={18} />
            },
            {
                title: "Year",
                label: "",
                href: "/admin/questions/year",
                icon: <CalendarFold size={18} />
            },
            {
                title: "Group",
                label: "",
                href: "/admin/questions/group",
                icon: <Group size={18} />
            },
            {
                title: "Create Question",
                label: "",
                href: "/admin/question/create",
                icon: <FileQuestion size={18} />
            },
            {
                title: "Questions List",
                label: "",
                href: "/admin/questions",
                icon: <FileQuestion size={18} />
            },
        ]
    },
    {
        title: "Exam",
        label: "",
        href: "/admin/exam/type",
        icon: <BookOpenCheck size={18} />,
        sub: [
            {
                title: "Exam Type Create",
                label: "",
                href: "/admin/exam/type",
                icon: <BookOpenCheck size={18} />
            },
        ]
    }
]