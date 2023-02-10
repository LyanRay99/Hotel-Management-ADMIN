import React from 'react'

//* PERMISSION MANAGEMENT
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ListUser = React.lazy(() => import('./views/Users/ListUser'))

//* HOTEL MANAGEMENT
const Branch = React.lazy(() => import('./views/Branch/Branch'))
const RoomType = React.lazy(() => import('./views/RoomType/RoomType'))
const ListBooking = React.lazy(() => import('./views/Booking/Booking.js'))
const ReportRating = React.lazy(() => import('./views/Report Rating/ListReportRating'))

//* MANAGE NEWS & EVENTS
const News = React.lazy(() => import('./views/News/News'))

//* BANNER MANAGEMENT
const Banner = React.lazy(() => import('./views/Banner/Banner'))

//* LANGUAGE MANAGEMENT
const Language = React.lazy(() => import('./views/Language/Language'))

//* SUPPORT
const AboutUs = React.lazy(() => import('./views/Support/AboutUs'))
const TermsOfService = React.lazy(() => import('./views/Support/TemrOfService'))
const FAQs = React.lazy(() => import('./views/Support/FAQs'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/Users', name: 'Users', element: ListUser },
  { path: '/Branch', name: 'Branch', element: Branch },
  { path: '/RoomType', name: 'Room Type', element: RoomType },
  { path: '/ListBooking', name: 'ListBooking', element: ListBooking },
  { path: '/ReportRating', name: 'Report Rating', element: ReportRating },
  { path: '/News', name: 'News', element: News },
  { path: '/Banner', name: 'Banner', element: Banner },
  { path: '/Language', name: 'Language', element: Language },
  { path: '/About-us', name: 'About Us', element: AboutUs },
  { path: '/Terms-of-service', name: 'Terms Of Service', element: TermsOfService },
  { path: '/FAQs', name: 'FAQs', element: FAQs },
]

export default routes
