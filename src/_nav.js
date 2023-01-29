import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBank,
  cilBarChart,
  cilLanguage,
  cilLayers,
  cilLightbulb,
  cilList,
  cilPeople,
  cilSettings,
  cilStar,
  cilTask,
  cilUser,
  cilViewColumn,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  //TODO: PERMISSION MANAGEMENT
  {
    component: CNavTitle,
    name: 'PERMISSION MANAGEMENT',
  },
  {
    component: CNavItem,
    name: 'User',
    to: '/Users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Role',
  //   to: '/Role',
  //   icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Permission',
  //   to: '/Permission',
  //   icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  // },

  //TODO: HOTEL MANAGEMENT
  {
    component: CNavTitle,
    name: 'HOTEL MANAGEMENT',
  },
  {
    component: CNavItem,
    name: 'Branch',
    to: '/Branch',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Room Type',
    to: '/RoomType',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'List Booking',
    to: '/ListBooking',
    icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Report Rating',
    to: '/ReportRating',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Album Featured Resport',
  //   to: '/AlbumFeaturedRequest',
  //   icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Business Registration',
  //   to: '/BusinessRegistration',
  //   icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Statistic',
  //   to: '/Statistic',
  //   icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />,
  // },\

  // TODO: MANAGE NEWS
  {
    component: CNavTitle,
    name: 'MANAGE NEWS & Event',
  },
  {
    component: CNavItem,
    name: 'News',
    to: '/News',
    icon: <CIcon icon={cilViewColumn} customClassName="nav-icon" />,
  },

  // TODO: BANNER MANAGEMENT
  {
    component: CNavTitle,
    name: 'BANNER MANAGEMENT',
  },
  {
    component: CNavItem,
    name: 'Banner',
    to: '/Banner',
    icon: <CIcon icon={cilViewColumn} customClassName="nav-icon" />,
  },

  //TODO: LANGUAGE MANAGEMENT
  {
    component: CNavTitle,
    name: 'LANGUAGE MANAGEMENT',
  },
  {
    component: CNavItem,
    name: 'Language',
    to: '/Language',
    icon: <CIcon icon={cilLanguage} customClassName="nav-icon" />,
  },

  {
    component: CNavGroup,
    name: 'Support',
    icon: <CIcon icon={cilLightbulb} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'FAQs',
        to: '/FAQs',
      },
      {
        component: CNavItem,
        name: 'About Us',
        to: '/About-us',
      },
      {
        component: CNavItem,
        name: 'Terms Of Service',
        to: '/Terms-of-service',
      },
      {
        component: CNavItem,
        name: 'Careers',
        to: '/Careers',
      },
    ],
  },
]

export default _nav
