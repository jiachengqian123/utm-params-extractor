<template>
  <div style="padding: 24px;">
    <h1>UTM Params Extractor Demo (Vue)</h1>
    <p>本页面演示如何在 Vue 项目中使用 <code>utm-params-extractor-test</code> 包。</p>
    <h2>获取到的参数：</h2>
    <pre style="background: #f6f8fa; padding: 16px; border-radius: 8px;">
      {{ utmJson }}
    </pre>
  </div>
</template>

<script>
import UtmTracker from 'utm-params-extractor-test';

export default {
  name: 'App',
  data() {
    return {
      utm: null
    };
  },
  computed: {
    utmJson() {
      return this.utm ? JSON.stringify(this.utm, null, 2) : '正在获取...';
    }
  },
  mounted() {
    this.utm = UtmTracker.get();
  }
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
}
</style>
