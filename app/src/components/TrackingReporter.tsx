import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { trackingItemsState } from 'app-recoil/atoms/tracking-items';
import { TRACKING_REPORT_DELAY } from 'constants/tracking';
import axios from 'axios';
import { TrackingItem } from 'types/tracking';

const TRACKING_TOKEN = process.env.REACT_APP_TRACKING_TOKEN;
const TRACKING_URL = process.env.REACT_APP_TRACKING_URL || '';

const postTrackingData = (data: TrackingItem[]) => {
  return axios.post(TRACKING_URL, data, {
    headers: {
      Authorization: `Token ${TRACKING_TOKEN}`,
    },
  });
};

const TrackingReporter = () => {
  const [trackingItems, setTrackingItems] = useRecoilState(trackingItemsState);

  useEffect(() => {
    if (TRACKING_TOKEN && TRACKING_URL) {
      const trackingReporter = setInterval(() => {
        if (trackingItems?.length) {
          postTrackingData(trackingItems).then();
          setTrackingItems([]);
        }
      }, TRACKING_REPORT_DELAY);
      return () => {
        trackingReporter && clearInterval(trackingReporter);
      };
    }
  });

  return null;
};

export default TrackingReporter;
