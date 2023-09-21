import { LoginPage } from "./pages/AuthSystem/LoginPage/LoginPage"
import { RegisterPage } from "./pages/AuthSystem/RegisterPage/RegisterPage"
import  {ChatPage}  from "./pages/chat/ChatPage"
import {UserProfile} from "./pages/UserProfile/UserProfile"
import { TrashPage } from "./pages/Logist/TrashPage"
import { Workers } from "./pages/WorkersPage/WorkersPage"
import { ConstructionPage } from "./pages/Constructions/ConstructionPage"
import { ApplicationPage } from "./pages/Applications/ApplicationPage"
import { AdminPage } from "./pages/AdminPage/AdminPage"
export const authRoutes = [
    {   
        path: "profile" + '/:id',
        Component: UserProfile
    },
    {
        path: "trash",
        Component: TrashPage
    },
    {
        path: "/chat" + '/:id',
        Component: ChatPage,
    },
    {
        path: "/workers",
        Component: Workers
    },
    {
        path: "/construction",
        Component: ConstructionPage
    },
    {
        path: "/application",
        Component: ApplicationPage
    }

]
export const publicRoutes = [
    {
        path: "/login",
        Component: LoginPage,
    },
    {
        path: "/register",
        Component: RegisterPage,
    },
    {
        path: "/admin",
        Component: AdminPage,
    }
]
