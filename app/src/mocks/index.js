if (typeof window !== 'undefined') {
  const { worker } = import('./browser');
  worker.start({
    findWorker: (scriptURL, _mockServiceWorkerUrl) => scriptURL.includes('mockServiceWorker'),
  });
}
