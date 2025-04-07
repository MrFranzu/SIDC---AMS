import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  // {
  //   id: 'members',
  //   title: 'Members',
  //   type: 'item',
  //   icon: 'users',
  //   url: 'members',
  //   role: ['Basic']
  // },

  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    icon: 'home',
    url: 'dashboards',
    role: ['Basic']
  },
  {
    id: 'attendance',
    title: 'Attendance',
    type: 'item',
    icon: 'check-square',
    url: 'attendances',
    role: ['Basic']
  },
  {
    id: 'analytics',
    title: 'Analytics',
    type: 'item',
    icon: 'bar-chart-2',
    url: 'analyticss',
    role: ['Basic']
  },
  {
    id: 'map',
    title: 'Map',
    type: 'item',
    icon: 'map',
    url: 'maps',
    role: ['Basic']
  },
  {
    id: 'eventcheck',
    title: 'Check-in/out',
    type: 'item',
    icon: 'monitor',
    url: 'eventcheck',
    role: ['Basic']
  },
  // {
  //   id: 'customers',
  //   title: 'Customers',
  //   type: 'item',
  //   icon: 'home',
  //   url: 'customers',
  //   role: ['Basic']
  // },
  // {
  //   id: 'meters',
  //   title: 'Meters',
  //   type: 'item',
  //   icon: 'home',
  //   url: 'meters',
  //   role: ['Basic']
  // },
  // {
  //   id: 'accounts',
  //   title: 'Accounts',
  //   type: 'item',
  //   icon: 'home',
  //   url: 'accounts',
  //   role: ['Basic']
  // }
]
