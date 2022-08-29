import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404'
import HotelList from './pages/HotelList'
import DashboardApp from './pages/DashboardApp';
import AddNewHotel from './pages/AddNewHotel';
import HotelDetail from './pages/HotelDetail';
import AddHotelAdmin from './pages/AddHotelAdmin';
import CreateSuperAdmin from './pages/CreateSuperAdmin';
import CheckInUsers from './pages/CheckInUser';
import CheckOutUsers from './pages/CheckOutUser';

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'user', element: <User /> },
        { path: 'hotellist', element: <HotelList /> },
        {path: "addnewhotel", element : <AddNewHotel/>},
        {path: "hoteldetail", element : <HotelDetail/>},
        {path: "addhoteladmin", element : <AddHotelAdmin/>},
        {path: "createsuperadmin", element : <CreateSuperAdmin/>},
        {path: "checkinusers", element : <CheckInUsers/>},
        {path: "checkoutusers", element : <CheckOutUsers/>}
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: '/',
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
