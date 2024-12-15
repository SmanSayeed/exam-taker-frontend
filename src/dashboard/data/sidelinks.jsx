import {
    BookHeart,
    BookOpenCheck,
    CalendarFold,
    FileQuestion,
    Group,
    LayoutDashboard,
    Tags,
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
    // categories
    {
        title: "Categories",
        label: "",
        href: "/admin/category",
        icon: <FileQuestion size={18} />,
        sub: [
            {
                title: "Section",
                label: "",
                href: "/admin/category/section",
                icon: <FileQuestion size={18} />
            },
            {
                title: "Exam Type",
                label: "",
                href: "/admin/category/exam-type",
                icon: <FileQuestion size={18} />
            },
            {
                title: "Exam Sub-Type",
                label: "",
                href: "/admin/category/exam-sub-type",
                icon: <Group size={18} />
            },
            {
                title: "Year",
                label: "",
                href: "/admin/category/year",
                icon: <CalendarFold size={18} />
            },
            {
                title: "Group",
                label: "",
                href: "/admin/category/group",
                icon: <Group size={18} />
            },
            {
                title: "Level",
                label: "",
                href: "/admin/category/level",
                icon: <Group size={18} />
            },
            {
                title: "Subject",
                label: "",
                href: "/admin/category/subject",
                icon: <Group size={18} />
            },
            {
                title: "Lesson",
                label: "",
                href: "/admin/category/lesson",
                icon: <Group size={18} />
            },
            {
                title: "Topics",
                label: "",
                href: "/admin/category/topics",
                icon: <Group size={18} />
            },
            {
                title: "Sub Topics",
                label: "",
                href: "/admin/category/sub-topics",
                icon: <Group size={18} />
            },
            {
                title: "Tags",
                label: "",
                href: "/admin/category/tags",
                icon: <Tags size={18} />
            }
        ]
    },
    // questions
    {
        title: "Questions",
        label: "",
        href: "/admin/questions",
        icon: <FileQuestion size={18} />,
        sub: [
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
    // model tests
    {
        title: "Model Tests",
        label: "",
        href: "/admin/model-tests",
        icon: <BookHeart size={18} />,
        sub: [
            {
                title: "Create Model Test",
                label: "",
                href: "/admin/model-tests/create",
                icon: <BookOpenCheck size={18} />
            },
            {
                title: "Model Tests List",
                label: "",
                href: "/admin/model-tests",
                icon: <BookOpenCheck size={18} />
            },
        ]
    },
    // packages
    {
        title: "Packages",
        label: "",
        href: "/admin/package-management",
        icon: <LayoutDashboard size={18} />,
        sub: [
            {
                title: "Create a Package",
                label: "",
                href: "/admin/package/create",
                icon: <BookOpenCheck size={18} />
            },
            {
                title: "All Packages",
                label: "",
                href: "/admin/packages",
                icon: <BookOpenCheck size={18} />
            },
        ]
    },
]