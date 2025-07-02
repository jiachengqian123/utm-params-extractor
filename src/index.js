// index.js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // CommonJS
        module.exports = factory();
    } else {
        // 全局变量
        root.UtmTracker = factory();
    }
}(this, function () {
    'use strict';
    
    // 工具函数
    function getUrlParam(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return null;
    }
    
    // 获取浏览器信息
    function getBrowserInfo() {
        var ua = navigator.userAgent;
        var browser = 'Unknown';
        var isMobile = /Mobile|Android|iPhone|iPad|iPod|HarmonyOS|HMS/i.test(ua);
        var osType = 'Unknown';
        var osVersion = 'Unknown';

        // 系统类型和版本号判断
        if (/iPhone|iPad|iPod/i.test(ua)) {
            osType = 'iOS';
            var iosVersionMatch = ua.match(/OS (\d+)[_.](\d+)?([_.](\d+))?/i);
            if (iosVersionMatch) {
                osVersion = iosVersionMatch[1];
                if (iosVersionMatch[2]) osVersion += '.' + iosVersionMatch[2];
                if (iosVersionMatch[4]) osVersion += '.' + iosVersionMatch[4];
            }
        } else if (/Android/i.test(ua)) {
            osType = 'Android';
            var androidVersionMatch = ua.match(/Android ([\d.]+)/i);
            if (androidVersionMatch) {
                osVersion = androidVersionMatch[1];
            }
        } else if (/HarmonyOS|HMS/i.test(ua)) {
            osType = 'HarmonyOS';
            var harmonyVersionMatch = ua.match(/HarmonyOS[\s/]?([\d.]+)/i) || ua.match(/HMSCore[\s/]?([\d.]+)/i);
            if (harmonyVersionMatch) {
                osVersion = harmonyVersionMatch[1];
            }
        }

        // 浏览器类型判断
        if (/Edg/i.test(ua)) {
            browser = 'Edge';
        } else if (/HuaweiBrowser/i.test(ua) || /HMS/i.test(ua)) {
            browser = 'HuaweiBrowser';
        } else if (/Chrome/i.test(ua)) {
            browser = 'Chrome';
        } else if (/Firefox/i.test(ua)) {
            browser = 'Firefox';
        } else if (/Safari/i.test(ua) && !/Chrome/i.test(ua) && !/Edg/i.test(ua)) {
            browser = 'Safari';
        } else if (/MSIE|Trident/i.test(ua)) {
            browser = 'IE';
        }

        // 特殊浏览器环境检测
        if (/MicroMessenger/i.test(ua)) {
            browser = 'WeChat';
        } else if (/QQBrowser/i.test(ua)) {
            browser = 'QQBrowser';
        } else if (/UCBrowser/i.test(ua)) {
            browser = 'UCBrowser';
        } else if (/Telegram/i.test(ua)) {
            browser = 'Telegram';
        }

        return {
            isMobile: isMobile,
            browser: browser,
            userAgent: ua,
            osType: osType,
            osVersion: osVersion
        };
    }
    
    // 主类
    function UtmTracker() {}
    
    // 获取UTM参数
    UtmTracker.prototype.getParams = function() {
        return {
            utm_source: getUrlParam('utm_source') || '',
            utm_medium: getUrlParam('utm_medium') || '',
            utm_campaign: getUrlParam('utm_campaign') || '',
            utm_term: getUrlParam('utm_term') || '',
            utm_content: getUrlParam('utm_content') || '',
            referrer: document.referrer || '',
            browser: getBrowserInfo(),
            timestamp: new Date().toISOString(),
            url: window.location.href
        };
    };
    
    // 静态方法：快速获取（无需实例化）
    UtmTracker.get = function() {
        return new UtmTracker().getParams();
    };
    
    return UtmTracker;
}));