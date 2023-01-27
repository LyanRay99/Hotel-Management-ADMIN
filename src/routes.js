import React, { lazy, useState } from 'react'

//PERMISSION MANAGEMENT
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ListUser = React.lazy(() => import('./views/Users/ListUser'))
const ListRole = React.lazy(() => import('./views/Role/ListRole'))
const ListPermission = React.lazy(() => import('./views/Permission/ListPermission'))

//BUSINESS MANAGEMENT
const BusinessType = React.lazy(() => import('./views/Business Type/BusinessType'))
const AlbumType = React.lazy(() => import('./views/Album Type/AlbumType'))
const Business = React.lazy(() => import('./views/Business/BusinessType'))
const ReportRating = React.lazy(() => import('./views/Report Rating/ListReportRating'))
const AlbumFeaturedRequest = React.lazy(() =>
  import('./views/AlbumFeaturedRequest/ListAlbumFeaturedRequest'),
)
const BusinessRegistration = React.lazy(() =>
  import('./views/Business Registration/BusinessRegistration'),
)
const Statistic = React.lazy(() => import('./views/Statistic/StatisticAlbum'))

//MANAGE ACCESS POINTS
const AccessPoint = React.lazy(() => import('./views/Access Point/ListAccessPoint'))

//BANNER MANAGEMENT
const Banner = React.lazy(() => import('./views/Banner/Banner'))

//LANGUAGE MANAGEMENT
const Language = React.lazy(() => import('./views/Language/Language'))

//SUPPORT
const SupportAccordion = React.lazy(() => import('./views/Support/Support_accordion'))
const TipsAndTrips = React.lazy(() => import('./views/Support/Tips&Trips'))
const AboutUs = React.lazy(() => import('./views/Support/AboutUs'))
const TermsOfService = React.lazy(() => import('./views/Support/TemrOfService'))
const Community = React.lazy(() => import('./views/Support/Community'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/Users', name: 'Users', element: ListUser },
  { path: '/Role', name: 'Role', element: ListRole },
  { path: '/Permission', name: 'Permission', element: ListPermission },
  { path: '/BusinessType', name: 'Business Type', element: BusinessType },
  { path: '/AlbumType', name: 'Album Type', element: AlbumType },
  { path: '/Business', name: 'Business', element: Business },
  { path: '/ReportRating', name: 'Report Rating', element: ReportRating },
  {
    path: '/AlbumFeaturedRequest',
    name: 'List Album Featured Request',
    element: AlbumFeaturedRequest,
  },
  {
    path: '/BusinessRegistration',
    name: 'Business Registration',
    element: BusinessRegistration,
  },
  { path: '/Statistic', name: 'Statistic', element: Statistic },
  { path: '/Access Point', name: 'AccessPoint', element: AccessPoint },
  { path: '/Banner', name: 'Banner', element: Banner },
  { path: '/Language', name: 'Language', element: Language },
  { path: '/Help-center', name: 'Help Center', element: SupportAccordion },
  { path: '/Tips&Trips', name: 'Tips & Trips', element: TipsAndTrips },
  { path: '/About-us', name: 'About Us', element: AboutUs },
  { path: '/Terms-of-service', name: 'Terms Of Service', element: TermsOfService },
  { path: '/community-standards', name: 'Community Standards', element: Community },
]

export default routes
