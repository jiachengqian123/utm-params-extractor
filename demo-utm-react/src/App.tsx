import React, { useEffect, useState } from 'react';
import UtmTracker, { UtmParams } from 'utm-params-extractor-test';

function App() {
  const [utm, setUtm] = useState<UtmParams | null>(null);

  useEffect(() => {
    const params = UtmTracker.get();
    setUtm(params);
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>UTM Params Extractor Demo</h1>
      <p>本页面演示如何在 React + TypeScript 项目中使用 <code>utm-params-extractor-test</code> 包。</p>
      <h2>获取到的参数：</h2>
      <pre style={{ background: '#f6f8fa', padding: 16, borderRadius: 8 }}>
        {utm ? JSON.stringify(utm, null, 2) : '正在获取...'}
      </pre>
    </div>
  );
}

export default App;
