### utm-params-extractor-test

#### 使用示例

##### 1. 安装包

```bash
npm install utm-params-extractor-test
```

##### 2. 在项目中使用

```javascript
// ES6 模块
import UtmTracker from 'utm-params-extractor-test';

// 方法1：使用静态方法直接获取
const utmParams = UtmTracker.get();
console.log('UTM参数:', utmParams);

// 方法2：实例化后获取（适合扩展）
const tracker = new UtmTracker();
const params = tracker.getParams();

// 自行处理数据（例如发送到后端）
fetch('https://your-api.com/track', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(params)
})
.then(response => response.json())
.then(data => console.log('发送成功:', data))
.catch(error => console.error('发送失败:', error));
```

##### 3. 在 HTML 中直接使用

```html
<script src="dist/main.js"></script>
<script>
  // 你的库会挂载在 window.UtmTracker
  var utmParams = window.UtmTracker.get();
  console.log('UTM参数:', utmParams);
</script>
```

 **注意：**
 - HTML 直接引用时，npm 包名（如 utm-params-extractor-test）与全局变量名无关。
 - 全局变量名由 webpack.config.js 的 `library.name` 决定，默认是 `UtmTracker`。
 - 如需自定义全局变量名，请在 webpack.config.js 中修改：
   ```js
   output: {
     // ...
     library: {
       name: 'UtmTracker', // 你想要的全局变量名
       type: 'umd',
     },
     globalObject: 'this',
   }
   ```
   这样 HTML 里就可以直接用 `window.UtmTracker.get()`。



### 返回参数说明

`UtmTracker.get()` 或 `tracker.getParams()` 返回对象结构如下：

| 字段         | 类型    | 说明                                                                 |
| ------------ | ------- | -------------------------------------------------------------------- |
| utm_source   | string  | UTM 来源渠道参数（如广告平台、搜索引擎等）                           |
| utm_medium   | string  | UTM 媒介参数（如 cpc、email、banner 等）                              |
| utm_campaign | string  | UTM 活动名称参数                                                     |
| utm_term     | string  | UTM 关键词参数                                                       |
| utm_content  | string  | UTM 内容参数（用于区分广告内容）                                     |
| referrer     | string  | 上一个页面的 URL                                                     |
| browser      | object  | 浏览器和设备信息对象（见下表）                                       |
| timestamp    | string  | 获取参数的时间戳（ISO 格式）                                         |
| url          | string  | 当前页面完整 URL                                                     |

#### browser 字段结构

| 字段       | 类型    | 说明                                                         |
| ---------- | ------- | ------------------------------------------------------------ |
| isMobile   | boolean | 是否为移动端设备                                              |
| browser    | string  | 浏览器类型（如 Chrome、Safari、Edge、WeChat、HuaweiBrowser 等）|
| userAgent  | string  | 浏览器的 User-Agent 字符串                                    |
| osType     | string  | 操作系统类型（iOS、Android、HarmonyOS、Unknown）              |
| osVersion  | string  | 操作系统版本号（如 16.6、13.0、3.0.0、Unknown）              |

##### browser.browser 可能的值
- Chrome
- Safari
- Edge
- Firefox
- IE
- WeChat
- QQBrowser
- UCBrowser
- HuaweiBrowser
- Telegram
- 其他

##### browser.osType 可能的值
- iOS
- Android
- HarmonyOS
- Unknown

##### 示例返回

```json
{
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "summer_sale",
  "utm_term": "shoes",
  "utm_content": "ad1",
  "referrer": "https://www.example.com/",
  "browser": {
    "isMobile": true,
    "browser": "Chrome",
    "userAgent": "Mozilla/5.0 (Linux; Android 13; ...)",
    "osType": "Android",
    "osVersion": "13"
  },
  "timestamp": "2024-07-01T12:00:00.000Z",
  "url": "https://your-site.com/?utm_source=google&utm_medium=cpc"
}
```

---

如需更多帮助或定制返回内容，请联系作者。

