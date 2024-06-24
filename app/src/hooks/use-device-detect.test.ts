import React from 'react';
import { renderHook } from '@testing-library/react';
import useDeviceDetect, { DeviceType } from './use-device-detect'; // Import the useDeviceDetect function and DeviceType enum

describe('useDeviceDetect Hook', () => {
  it('detects desktop device', () => {
    // Mock the navigator object to simulate a desktop device
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
      writable: true,
    });

    // Render the hook
    const { result } = renderHook(() => useDeviceDetect());

    // Assert that the hook returns the correct device type
    expect(result.current).toBe(DeviceType.Desktop);
  });

  it('detects mobile device', () => {
    // Mock the navigator object to simulate a mobile device
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7 like Mac OS X)',
      },
      writable: true,
    });

    // Render the hook
    const { result } = renderHook(() => useDeviceDetect());

    // Assert that the hook returns the correct device type
    expect(result.current).toBe(DeviceType.Mobile);
  });

  it('detects server device', () => {
    // Mock the navigator object to simulate a server environment
    Object.defineProperty(window, 'navigator', {
      value: undefined,
    });

    // Render the hook
    const { result } = renderHook(() => useDeviceDetect());

    // Assert that the hook returns the correct device type
    expect(result.current).toBe(DeviceType.Server);
  });
});
