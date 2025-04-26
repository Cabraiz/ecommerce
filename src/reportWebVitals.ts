type ReportHandler = (metric: {
  name: string;
  value: number;
  id: string;
  delta: number;
  entries: PerformanceEntry[];
}) => void;

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    import('web-vitals/attribution').then(({
      onCLS, 
      onLCP, 
      onFCP, 
      onINP,
      // onFID está deprecated, removido por padrão aqui
    }) => {
      onCLS(onPerfEntry);
      onLCP(onPerfEntry);
      onFCP(onPerfEntry);
      onINP(onPerfEntry);
    });
  }
};

export default reportWebVitals;
