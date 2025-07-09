import { BsCalendar3EventFill, BsMegaphoneFill, BsNewspaper, BsJournalBookmarkFill, BsFillGrid1X2Fill, BsPeopleFill, BsBagFill, BsCameraVideo } from "react-icons/bs";
import { FaImages, FaUser, FaUsers } from "react-icons/fa6";
import { MdEventNote, MdMiscellaneousServices } from "react-icons/md";
import { FaQuestionCircle, FaBook, FaMedal, FaGraduationCap } from "react-icons/fa";
import { BsClipboardDataFill } from "react-icons/bs";



const sidemenu = [
    {
        id: 1,
        name: "Dashboard",
        icon: BsFillGrid1X2Fill,
        link: '/Dashboard/Home'
    },
    {
        id: 2,
        name: "User Management",
        icon: BsPeopleFill,
        link: '/Dashboard/UserManagement'
    },
    {
        id: 3,
        name: "Event Management",
        icon: BsCalendar3EventFill,
        link: '/Dashboard/Events'
    },
    {
        id: 4,
        name: "Notice Management",
        icon: BsMegaphoneFill,
        link: '/Dashboard/Notice'
    },
    {
        id: 5,
        name: "NEWS Management",
        icon: BsNewspaper,
        link: '/Dashboard/NEWS'
    },
    {
        id: 6,
        name: "Research Management",
        icon: BsJournalBookmarkFill,
        link: '/Dashboard/Research'
    },
    {
        id: 16,
        name: "Research Highlights",
        icon: BsJournalBookmarkFill,
        link: '/Dashboard/ResearchHighlights'
    },
    {
        id: 21,
        name: "iPURSE",
        icon: BsJournalBookmarkFill,
        link: '/Dashboard/Ipurse'
    },
    {
        id: 10,
        name: "Diploma",
        icon: FaBook,
        link: '/Dashboard/Diploma'
    },
    {
        id: 11,
        name: "Certificates",
        icon: FaMedal,
        link: '/Dashboard/Certificates'
    },
    {
        id: 18,
        name: "Publication",
        icon: FaGraduationCap,
        link: '/Dashboard/Publication'
    },
    {
        id: 19,
        name: "Statistics",
        icon: BsClipboardDataFill,
        link: '/Dashboard/Statistics'
    },
    {
        id: 20,
        name: "Vidoes",
        icon: BsCameraVideo,
        link: '/Dashboard/Videos'
    },

    {
        id: 7,
        name: "Home Image Management",
        icon: FaImages,
        link: '/Dashboard/HSliderImg'
    },
    {
        id: 8,
        name: "Latest Programme Management",
        icon: MdEventNote,
        link: '/Dashboard/ProgramSlider'
    },
    {
        id: 9,
        name: "FAQ",
        icon: FaQuestionCircle,
        link: '/Dashboard/FAQ'
    },

    {
        id: 12,
        name: "Societies",
        icon: FaUsers,
        link: '/Dashboard/Societies'
    },
    {
        id: 13,
        name: "Services & Quicklinks",
        icon: MdMiscellaneousServices,
        link: '/Dashboard/ServicesQuicklinks'
    },

    {
        id: 15,
        name: "Vacancies",
        icon: BsBagFill,
        link: '/Dashboard/Vacancies'
    },

    {
        id: 17,
        name: "Workshops & Short Courses",
        icon: FaGraduationCap,
        link: '/Dashboard/WorkshopsSc'
    },

    {
        id: 14,
        name: "Profile",
        icon: FaUser,
        link: '/Dashboard/Profile'
    },
]

export { sidemenu }