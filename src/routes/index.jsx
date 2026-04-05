import { lazy } from "react";

const Home = lazy(() => import("@/pages/home"));
const Services = lazy(() => import("@/pages/services"));
const Plans = lazy(() => import("@/pages/plans"));
const Recommended = lazy(() => import("@/pages/recommended"));
const SpecialNeeds = lazy(() => import("@/pages/special-needs"));
const Register = lazy(() => import("@/pages/register"));
const Login = lazy(() => import("@/pages/login"));
const DeveloperProfile = lazy(() => import("@/pages/developer-profile"));
const Profile = lazy(() => import("@/pages/profile"));
const About = lazy(() => import("@/pages/about"));
const Badges = lazy(() => import("@/pages/badges"));
const Charts = lazy(() => import("@/pages/charts"));
const Blogs = lazy(() => import("@/pages/blogs"));
const Hackathons = lazy(() => import("@/pages/hackathons"));
const Jobs = lazy(() => import("@/pages/jobs"));
const Testimonials = lazy(() => import("@/pages/testimonials"));
const NotFound = lazy(() => import("@/pages/not-found"));

export const publicRoutes = [
  { path: "/", element: <Home />, index: true },
  { path: "/services", element: <Services /> },
  { path: "/plans", element: <Plans /> },
  { path: "/recommended", element: <Recommended /> },
  { path: "/special-needs-developers", element: <SpecialNeeds /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/admin/login", element: <Login /> },
  { path: "/developers/:slug", element: <DeveloperProfile /> },
  { path: "/profile", element: <Profile /> },
  { path: "/about", element: <About /> },
  { path: "/badges", element: <Badges /> },
  { path: "/charts", element: <Charts /> },
  { path: "/blogs", element: <Blogs /> },
  { path: "/hackathons", element: <Hackathons /> },
  { path: "/jobs", element: <Jobs /> },
  { path: "/testimonials", element: <Testimonials /> },
  { path: "*", element: <NotFound /> },
];
