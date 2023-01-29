import React from 'react'

//* PERMISSION MANAGEMENT
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ListUser = React.lazy(() => import('./views/Users/ListUser'))
// const ListRole = React.lazy(() => import('./views/Role/ListRole'))
// const ListPermission = React.lazy(() => import('./views/Permission/ListPermission'))

//* HOTEL MANAGEMENT
const Branch = React.lazy(() => import('./views/Branch/Branch'))
const RoomType = React.lazy(() => import('./views/RoomType/RoomType'))
const ListBooking = React.lazy(() => import('./views/Booking/Booking.js'))
const ReportRating = React.lazy(() => import('./views/Report Rating/ListReportRating'))
// const AlbumFeaturedRequest = React.lazy(() =>
//   import('./views/AlbumFeaturedRequest/ListAlbumFeaturedRequest'),
// )
// const BusinessRegistration = React.lazy(() =>
//   import('./views/Business Registration/BusinessRegistration'),
// )
// const Statistic = React.lazy(() => import('./views/Statistic/StatisticAlbum'))

//MANAGE ACCESS POINTS
const News = React.lazy(() => import('./views/News/News'))

//BANNER MANAGEMENT
const Banner = React.lazy(() => import('./views/Banner/Banner'))

//LANGUAGE MANAGEMENT
const Language = React.lazy(() => import('./views/Language/Language'))

//SUPPORT
const Careers = React.lazy(() => import('./views/Support/Careers'))
const AboutUs = React.lazy(() => import('./views/Support/AboutUs'))
const TermsOfService = React.lazy(() => import('./views/Support/TemrOfService'))
const FAQs = React.lazy(() => import('./views/Support/FAQs'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/Users', name: 'Users', element: ListUser },
  // { path: '/Role', name: 'Role', element: ListRole },
  // { path: '/Permission', name: 'Permission', element: ListPermission },
  { path: '/Branch', name: 'Branch', element: Branch },
  { path: '/RoomType', name: 'Room Type', element: RoomType },
  { path: '/ListBooking', name: 'ListBooking', element: ListBooking },
  { path: '/ReportRating', name: 'Report Rating', element: ReportRating },
  // {
  //   path: '/AlbumFeaturedRequest',
  //   name: 'List Album Featured Request',
  //   element: AlbumFeaturedRequest,
  // },
  // {
  //   path: '/BusinessRegistration',
  //   name: 'Business Registration',
  //   element: BusinessRegistration,
  // },
  // { path: '/Statistic', name: 'Statistic', element: Statistic },
  { path: '/News', name: 'News', element: News },
  { path: '/Banner', name: 'Banner', element: Banner },
  { path: '/Language', name: 'Language', element: Language },
  { path: '/Careers', name: 'Careers', element: Careers },
  { path: '/About-us', name: 'About Us', element: AboutUs },
  { path: '/Terms-of-service', name: 'Terms Of Service', element: TermsOfService },
  { path: '/FAQs', name: 'FAQs', element: FAQs },
]

export default routes
