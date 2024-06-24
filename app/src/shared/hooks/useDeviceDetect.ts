// utils/useDeviceDetect.js
import React from 'react';

export enum DeviceType {
  Desktop = 'desktop',
  Mobile = 'mobile',
  Server = 'server',
}

export default function useDeviceDetect() {
  const [deviceType, setDeviceType] = React.useState<DeviceType>();

  React.useEffect(() => {
    if (typeof window.navigator === 'undefined') {
      setDeviceType(DeviceType.Server);
    }
    const userAgent = navigator.userAgent;
    const isMobile = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
    setDeviceType(isMobile ? DeviceType.Mobile : DeviceType.Desktop);
  }, []);

  return deviceType;
}
