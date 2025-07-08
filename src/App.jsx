import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "./components/Footer/Footer";
import 'aos/dist/aos.css';
import ErrorPage from "./components/ErrorPage/ErrorPage";
import StaffLogin from "./pages/Auth/StaffLogin";
import Nav from "./components/Nav/Nav";
import Dashbaord from "./components/Dashboard/Dashbaord";
import DashHome from "./pages/Dashboard/DashHome";
import PrivateRoute from "./components/auth/PrivateRoute";
import EventsManage from "./pages/Events/EventsManage";
import CreateNewEvent from "./pages/Events/CreateNewEvent";
import ViewEvent from "./pages/Events/ViewEvent";
import NoticesManage from "./pages/Notices/NoticesManage";
import CreateNewNotice from "./pages/Notices/CreateNewNotice";
import NEWSManage from "./pages/NEWS/NEWSManage";
import ResearchManage from "./pages/Research/ResearchManage";
import CreateNewNEWS from "./pages/NEWS/CreateNewNEWS";
import CreateNewResearch from "./pages/Research/CreateNewResearch";
import ViewNEWS from "./pages/NEWS/ViewNEWS";
import ViewResearch from "./pages/Research/ViewResearch";
import ViewNotice from "./pages/Notices/ViewNotice";
import HSliderImg from "./pages/HomeSliderImg/HSliderImg";
import AddImage from "./pages/HomeSliderImg/AddImage";
import ProgramSlider from "./pages/ProgramSlider/ProgramSlider";
import AddPSilderImge from "./pages/ProgramSlider/AddPSilderImge";
import UpdateHImge from "./pages/HomeSliderImg/UpdateHImge";
import UpdatePSlider from "./pages/ProgramSlider/UpdatePSlider";
import Register from "./pages/Auth/Register";
import UserManage from "./pages/UserManage/UserManage";
import Profile from "./pages/Profile/Profile";
import UpdateUser from "./pages/UserManage/UpdateUser";
import Diploma from "./pages/Diploma/Diploma";
import CreateDiploma from "./pages/Diploma/CreateDiploma";
import ViewDip from "./pages/Diploma/ViewDip";
import Certificates from "./pages/Certificates/Certificates";
import CreateCertificate from "./pages/Certificates/CreateCertificate";
import ViewCertificate from "./pages/Certificates/ViewCertificate";
import Societies from "./pages/Societies/Societies";
import CreateSociety from "./pages/Societies/CreateSociety";
import FAQ from "./pages/FAQ/FAQ";
import CreateFAQ from "./pages/FAQ/CreateFAQ";
import ServicesQuicklinks from "./pages/ServicesQuicklinks/ServicesQuicklinks";
import CreateSQ from "./pages/ServicesQuicklinks/CreateSQ";
import Vacancies from "./pages/Vacancies/Vacancies";
import CreateVacancies from "./pages/Vacancies/CreateVacancies";
import ViewVacancy from "./pages/Vacancies/ViewVacancy";
import VerfyOTP from "./pages/Auth/VerfyOTP";
import ForgetPass from "./pages/Auth/ForgetPass";
import VerfyPassOTP from "./pages/Auth/VerfyPassOTP";
import ResetPassword from "./pages/Auth/ResetPassword";
import ResearchHighlights from "./pages/ResearchHighlights/ResearchHighlights";
import CreateResearchStats from "./pages/ResearchHighlights/CreateResearchStats";
import WorkshopsSc from "./pages/WorkshopsSc/WorkshopsSc";
import CreateWorkshops from "./pages/WorkshopsSc/CreateWorkshops";
import Publication from "./pages/Publications/Publication";
import CreateReports from "./pages/Publications/CreateReports";
import ResearchStats from "./pages/ResearchHighlights/ResearchStats";
import Staticties from "./pages/Staticties/Staticties";
import CreateStatistics from "./pages/Staticties/CreateStatistics";
import ViewStatistic from "./pages/Staticties/ViewStatistic";
import VIdeos from "./pages/VIdeos/VIdeos";
import CreateVideo from "./pages/VIdeos/CreateVideo";

export default function App() {
  const [showNavBar, setShowNavBar] = useState(true);
  const [isTopOfPage, setIsTopOfPage] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 50) {

      setShowNavBar(false);
    } else {

      setShowNavBar(true);
    }
    setIsTopOfPage(currentScrollY === 0);
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);


    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const shouldShowNavBar = !location.pathname.startsWith("/Dashboard");
  const shouldShowFooter = !location.pathname.startsWith("/Dashboard");

  return (
      <BrowserRouter>
        {shouldShowNavBar && (
          <div
          className={`fixed top-0 w-full z-50 transition-transform duration-300 ${
            showNavBar ? "translate-y-0" : "-translate-y-full"
          } ${
            isTopOfPage
              ? "xl:mt-0"
              : "shadow-md transition-colors duration-500"
          }`}
          >
            <Nav />
          </div>
        )}
        <Routes>
          <Route path="*" element={<ErrorPage /> } />
          <Route path="/" element={<StaffLogin /> } />
          <Route path="/Register" element={<Register /> } />
          <Route path="/VerifyOTP" element={<VerfyOTP /> } />
          <Route path="/ForgetPass" element={<ForgetPass /> } />
          <Route path="/VerfyPassOTP" element={<VerfyPassOTP /> } />
          <Route path="/ResetPassword" element={<ResetPassword /> } />
          
          <Route path="/Dashboard/" element={<PrivateRoute element={<Dashbaord />}  /> } >
            <Route path="Home" element={<DashHome /> } />
            <Route path="Events" element={<EventsManage /> } />
            <Route path="CreateEvent" element={<CreateNewEvent /> } /> 
            <Route path="ViewEvent/:id" element={<ViewEvent /> } />
            <Route path="Notice" element={<NoticesManage /> } />
            <Route path="CreateNotice" element={<CreateNewNotice /> } />
            <Route path="ViewNotice/:id" element={<ViewNotice /> } />
            <Route path="NEWS" element={<NEWSManage /> } />
            <Route path="CreateNEWS" element={<CreateNewNEWS /> } />
            <Route path="ViewNEWS/:id" element={<ViewNEWS /> } />
            <Route path="Research" element={<ResearchManage /> } />
            <Route path="ViewResearch/:id" element={<ViewResearch /> } />
            <Route path="CreateResearch" element={<CreateNewResearch /> } />
            <Route path="HSliderImg" element={<HSliderImg /> } />
            <Route path="UpdateHImage/:id" element={<UpdateHImge /> } />
            <Route path="AddImage" element={<AddImage /> } />
            <Route path="ProgramSlider" element={<ProgramSlider /> } />
            <Route path="AddPSilderImge" element={<AddPSilderImge /> } />
            <Route path="UpdatePSlider/:id" element={<UpdatePSlider /> } />
            <Route path="UserManagement" element={<UserManage /> } /> 
            <Route path="UserProfile/:email" element={<UpdateUser /> } />
            <Route path="Profile" element={<Profile /> } />
            <Route path="Diploma" element={<Diploma /> } />
            <Route path="CreateDiploma" element={<CreateDiploma /> } />
            <Route path="DiplomaView/:id" element={<ViewDip /> } /> 
            <Route path="Certificates" element={<Certificates /> } />
            <Route path="CreateCertificate" element={<CreateCertificate /> } />    
            <Route path="ViewCertificate/:id" element={<ViewCertificate /> } />       
            <Route path="Societies" element={<Societies /> } />
            <Route path="CreateSociety" element={<CreateSociety /> } />
            <Route path="FAQ" element={<FAQ /> } />
            <Route path="CreateFAQ" element={<CreateFAQ /> } />
            <Route path="ServicesQuicklinks" element={<ServicesQuicklinks /> } />
            <Route path="CreateSQ" element={<CreateSQ /> } />
            <Route path="Vacancies" element={<Vacancies /> } />
            <Route path="CreateVacancies" element={<CreateVacancies /> } />
            <Route path="ViewVacancy/:id" element={<ViewVacancy /> } />
            <Route path="ResearchHighlights" element={<ResearchHighlights /> } /> 
            <Route path="ResearchStats/:id" element={<ResearchStats /> } />
            <Route path="CreateResearchStats" element={<CreateResearchStats /> } />
            <Route path="Publication" element={<Publication /> } />
            <Route path="CreateReports" element={<CreateReports /> } />

            <Route path="WorkshopsSc" element={<WorkshopsSc /> } />
            <Route path="CreateWorkshops" element={<CreateWorkshops /> } /> 

            <Route path="Statistics" element={<Staticties /> } /> 
            <Route path="CreateStatistics" element={<CreateStatistics /> } />
            <Route path="ViewStatistic/:id" element={<ViewStatistic /> } />

            <Route path="Videos" element={<VIdeos />} />
            <Route path="CreateVideo" element={<CreateVideo />} />
          </Route>
         </Routes>
        {shouldShowFooter && <Footer />}
      </BrowserRouter>
  )
}