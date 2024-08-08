// import React, { useContext } from "react";
// import LandingPage from "./pages/User/LandingPage";
import "./styles/main.scss";
// import SignUp from "./pages/Authentication/SignUp";
// import Login from "./pages/Authentication/Login";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import AdminDashboard from "./pages/Admin/home/AdminDashboard";
// import List from "./pages/Admin/list/List";
// import Single from "./pages/Admin/single/Single";
// import AboutPage from "./pages/User/AboutPage";
// import ContactPage from "./pages/User/ContactPage";
// import BlogPage from "./pages/User/BlogPage";
// import New from "./pages/Admin/new/New";
// import { productInputs, userInputs } from "./Formsource";

// import { DarkModeContext } from "./pages/Admin/context/DarkModeContext";
// import FilterPage from "./pages/User/FilterPage";
// import AuthSpinner from "./components/General/AuthSpinner";

import { Toaster } from "react-hot-toast";
import GlobalRouter from "./routes";

// const App = () => {
//   const { darkMode } = useContext(DarkModeContext);

//   return (
//     <div className={darkMode ? "app dark" : "app"}>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/">
//             <Route index element={<LandingPage />} />
//             <Route path="/admin-dashboard" element={<AdminDashboard />} />
//             <Route path="/call" element={<AuthSpinner />} />
//             <Route path="/about" element={<AboutPage />} />
//             <Route path="/contact" element={<ContactPage />} />
//             <Route path="/blog" element={<BlogPage />} />
//             <Route path="/filterpage" element={<FilterPage />} />
//             <Route path="login" element={<Login />} />
//             <Route path="users">
//               <Route index element={<List />} />
//               <Route path=":userId" element={<Single />} />
//               <Route
//                 path="new"
//                 element={<New inputs={userInputs} title="Add New User" />}
//               />
//             </Route>
//             <Route path="products">
//               <Route index element={<List />} />
//               <Route path=":productId" element={<Single />} />
//               <Route
//                 path="new"
//                 element={<New inputs={productInputs} title="Add New Product" />}
//               />
//             </Route>
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// };

// export default App;

const App = () => {
  return (
    <div>
      <GlobalRouter />
      <Toaster />
    </div>
  );
};

export default App;
