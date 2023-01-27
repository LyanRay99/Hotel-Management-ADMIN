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
  {
    component: CNavItem,
    name: 'Role',
    to: '/Role',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Permission',
    to: '/Permission',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
  //TODO: BUSINESS MANAGEMENT
  {
    component: CNavTitle,
    name: 'BUSINESS MANAGEMENT',
  },
  {
    component: CNavItem,
    name: 'Business Type',
    to: '/BusinessType',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Album Type',
    to: '/AlbumType',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Business',
    to: '/Business',
    icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Report Rating',
    to: '/ReportRating',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Album Featured Resport',
    to: '/AlbumFeaturedRequest',
    icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Business Registration',
    to: '/BusinessRegistration',
    icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Statistic',
    to: '/Statistic',
    icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />,
  },
  // TODO: MANAGE ACCESS POINT
  {
    component: CNavTitle,
    name: 'MANAGE ACCESS POINT',
  },
  {
    component: CNavItem,
    name: 'Access Point',
    to: '/Access Point',
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
        name: 'Help Center',
        to: '/Help-center',
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
        name: 'Community Standards',
        to: '/community-standards',
      },
      {
        component: CNavItem,
        name: 'Tips And Tricks',
        to: '/Tips&Trips',
      },
    ],
  },
]

export default _nav

//TODO: PHẦN BỎ
// {
//   component: CNavGroup,
//   name: 'Business Type',
//   to: '/base',
//   icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
//   items: [
//     {
//       component: CNavItem,
//       name: 'Accordion',
//       to: '/base/accordion',
//     },
//     {
//       component: CNavItem,
//       name: 'Breadcrumb',
//       to: '/base/breadcrumbs',
//     },
//     {
//       component: CNavItem,
//       name: 'Cards',
//       to: '/base/cards',
//     },
//     {
//       component: CNavItem,
//       name: 'Carousel',
//       to: '/base/carousels',
//     },
//     {
//       component: CNavItem,
//       name: 'Collapse',
//       to: '/base/collapses',
//     },
//     {
//       component: CNavItem,
//       name: 'List group',
//       to: '/base/list-groups',
//     },
//     {
//       component: CNavItem,
//       name: 'Navs & Tabs',
//       to: '/base/navs',
//     },
//     {
//       component: CNavItem,
//       name: 'Pagination',
//       to: '/base/paginations',
//     },
//     {
//       component: CNavItem,
//       name: 'Placeholders',
//       to: '/base/placeholders',
//     },
//     {
//       component: CNavItem,
//       name: 'Popovers',
//       to: '/base/popovers',
//     },
//     {
//       component: CNavItem,
//       name: 'Progress',
//       to: '/base/progress',
//     },
//     {
//       component: CNavItem,
//       name: 'Spinners',
//       to: '/base/spinners',
//     },
//     {
//       component: CNavItem,
//       name: 'Tables',
//       to: '/base/tables',
//     },
//     {
//       component: CNavItem,
//       name: 'Tooltips',
//       to: '/base/tooltips',
//     },
//   ],
// },
// {
//   component: CNavGroup,
//   name: 'Buttons',
//   to: '/buttons',
//   icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
//   items: [
//     {
//       component: CNavItem,
//       name: 'Buttons',
//       to: '/buttons/buttons',
//     },
//     {
//       component: CNavItem,
//       name: 'Buttons groups',
//       to: '/buttons/button-groups',
//     },
//     {
//       component: CNavItem,
//       name: 'Dropdowns',
//       to: '/buttons/dropdowns',
//     },
//   ],
// },
// {
//   component: CNavGroup,
//   name: 'Forms',
//   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
//   items: [
//     {
//       component: CNavItem,
//       name: 'Form Control',
//       to: '/forms/form-control',
//     },
//     {
//       component: CNavItem,
//       name: 'Select',
//       to: '/forms/select',
//     },
//     {
//       component: CNavItem,
//       name: 'Checks & Radios',
//       to: '/forms/checks-radios',
//     },
//     {
//       component: CNavItem,
//       name: 'Range',
//       to: '/forms/range',
//     },
//     {
//       component: CNavItem,
//       name: 'Input Group',
//       to: '/forms/input-group',
//     },
//     {
//       component: CNavItem,
//       name: 'Floating Labels',
//       to: '/forms/floating-labels',
//     },
//     {
//       component: CNavItem,
//       name: 'Layout',
//       to: '/forms/layout',
//     },
//     {
//       component: CNavItem,
//       name: 'Validation',
//       to: '/forms/validation',
//     },
//   ],
// },
// {
//   component: CNavItem,
//   name: 'Charts',
//   to: '/charts',
//   icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
// },
// {
//   component: CNavGroup,
//   name: 'Icons',
//   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
//   items: [
//     {
//       component: CNavItem,
//       name: 'CoreUI Free',
//       to: '/icons/coreui-icons',
//       badge: {
//         color: 'success',
//         text: 'NEW',
//       },
//     },
//     {
//       component: CNavItem,
//       name: 'CoreUI Flags',
//       to: '/icons/flags',
//     },
//     {
//       component: CNavItem,
//       name: 'CoreUI Brands',
//       to: '/icons/brands',
//     },
//   ],
// },
// {
//   component: CNavGroup,
//   name: 'Notifications',
//   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
//   items: [
//     {
//       component: CNavItem,
//       name: 'Alerts',
//       to: '/notifications/alerts',
//     },
//     {
//       component: CNavItem,
//       name: 'Badges',
//       to: '/notifications/badges',
//     },
//     {
//       component: CNavItem,
//       name: 'Modal',
//       to: '/notifications/modals',
//     },
//     {
//       component: CNavItem,
//       name: 'Toasts',
//       to: '/notifications/toasts',
//     },
//   ],
// },
// {
//   component: CNavItem,
//   name: 'Widgets',
//   to: '/widgets',
//   icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
//   badge: {
//     color: 'info',
//     text: 'NEW',
//   },
// },
