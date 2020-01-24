import { dynamicWrapper } from 'react-router-guard'
import checkAuth from './guards/authGuard'

export default [
  {
    path: '/',
    component: dynamicWrapper(() => import('./Home')),
    canActivate: [checkAuth]
  }
]
