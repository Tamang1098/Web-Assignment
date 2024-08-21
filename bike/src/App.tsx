import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Footer from './Footer';
import LoginSignup from './LoginSignup';




// import AddBike from './admin/addbike';
import Sidebar from './admin/Sidebar';
import BikeList from './admin/BikeList';
import UserList from "./admin/UserList.tsx";
import BikeBookingList from "./admin/BikeBookingList.tsx";
import BikeAll from "./BikeAll.tsx";
import Navbar from "./Navbar.tsx";


const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginSignup/>} />

                <Route path="*" element={<MainLayout />} />
                <Route path="/admin/*" element={<AdminLayout/>}/>

            </Routes>
        </BrowserRouter>

    );
};

const MainLayout: React.FC = () => (
    <>

        <Navbar/>
        <Routes>

            <Route path="/" element={<HomePage />} />
            <Route path="/bike" element={<BikeAll/>} />

        </Routes>
        <Footer/>

    </>
);

const AdminLayout: React.FC = () => (
    <div className="admin-layout">
        <Sidebar />
        <div className="admin-content">
            <Routes>
                <Route path="/bikelist" element={<BikeList />} />
                <Route path="/userlist" element={<UserList />} />
                <Route path="/bikebookinglist" element={<BikeBookingList />} />

            </Routes>

        </div>
    </div>
);

export default App;





