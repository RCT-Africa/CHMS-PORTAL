import Iconify from '../../components/Iconify';

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'hotel',
    path: '/dashboard/hotellist',
    icon: getIcon('ic:baseline-hotel'),
  },
  {
    title: 'Admins',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Check In Users',
    path: '/dashboard/checkinusers',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Check Out Users',
    path: '/dashboard/checkoutusers',
    icon: getIcon('eva:people-fill'),
  },
  
];

export default navConfig;
