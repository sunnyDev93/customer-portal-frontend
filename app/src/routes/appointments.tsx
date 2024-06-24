import UpcomingAppointmentPage from 'pages/UpcomingAppointment';
import ScheduleAppointmentPage from 'pages/ScheduleAppointment';
import ScheduleWrapperPage from 'pages/ScheduleWrapper';
import WithSidebar from 'layouts/WithSidebar';
import { Outlet } from 'react-router-dom';
import { RouteInfo, SiteMap } from 'types';

export const UpcomingAppointmentRoute: RouteInfo = {
  key: 'UpcomingAppointmentRoute',
  label: 'Upcoming Appointment',
  path: 'upcoming',
  trackingName: 'appointments/upcoming',
  element: <UpcomingAppointmentPage />,
};

export const ScheduleAppointmentWrapperRoute: RouteInfo = {
  key: 'ScheduleAppointmentWrapperRoute',
  label: 'Schedule an Appointment',
  path: 'scheduleWrapper',
  trackingName: 'appointments/schedule',
  element: <ScheduleWrapperPage />,
};

export const ScheduleAppointmentRoute: RouteInfo = {
  key: 'ScheduleAppointmentRoute',
  label: 'Schedule an Appointment',
  path: 'schedule',
  disabled: true,
  trackingName: 'appointments/schedule',
  element: <ScheduleAppointmentPage />,
};

export const ScheduleAppointmentDetailRoute: RouteInfo = {
  key: 'ScheduleAppointmentDetailRoute',
  label: 'Schedule Appointment',
  className: 'hidden',
  mobileClassName: 'hidden',
  path: 'schedule/:appointmentId',
  disabled: true,
  trackingName: 'appointments/schedule',
  element: <ScheduleAppointmentPage />,
};

export const ReScheduleAppointmentDetailRoute: RouteInfo = {
  key: 'ReScheduleAppointmentDetailRoute',
  label: 'Re Schedule Appointment',
  className: 'hidden',
  mobileClassName: 'hidden',
  path: 'reschedule/:appointmentId',
  disabled: true,
  trackingName: 'appointments/schedule',
  element: <ScheduleAppointmentPage />,
};

export const AppointmentHistory: RouteInfo = {
  key: 'AppointmentHistory',
  label: 'Re Schedule Appointment',
  disabled: true,
  path: 'history',
  trackingName: 'appointments/history',
  element: <div />,
};

export const appointmentsSiteMap: SiteMap = {
  UpcomingAppointmentRoute,
  ScheduleAppointmentWrapperRoute,
  ScheduleAppointmentRoute,
  ScheduleAppointmentDetailRoute,
  ReScheduleAppointmentDetailRoute,
  AppointmentHistory,
};

export const AppointmentsRoot = {
  key: 'AppointmentsRoot',
  label: 'Appointments',
  path: '/appointments',
  element: (
    <WithSidebar siteMap={appointmentsSiteMap}>
      <Outlet />
    </WithSidebar>
  ),
  children: appointmentsSiteMap,
  default: UpcomingAppointmentRoute,
  defaultPath: '/appointments/upcoming',
  trackingName: 'appointments',
};
