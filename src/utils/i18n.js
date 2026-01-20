// 多语言配置文件
export const translations = {
  zh: {
    // 导航栏
    download: '下载',
    
    // 标题
    headline: '智能健身,科学训练',
    
    // 描述
    description: 'I-consolePro 是您的私人健身教练,通过AI技术为您提供个性化训练计划,实时数据监测,让健身更高效、更有趣。',
    
    // 下载渠道标题
    downloadOptions: '下载方式',
    
    // 下载渠道按钮
    yingyongbao: '应用宝下载',
    xiaomi: '小米下载',
    huawei: '华为下载',
    google: '谷歌下载',
    samsung: '三星下载',
    ios: 'iOS下载',
    local: '本地下载',
    
    // 语言切换按钮
    language: '中文',
    switchTo: 'English',
    
    // 引导提示文案
    guideTip: '点击右上角按钮，然后在弹出的菜单中，点击"在浏览器中打开"或者点击"复制链接"在浏览器中打开，即可安装',
    
    // 弹窗提示
    notAvailable: '暂未开放'
  },
  en: {
    // Navigation
    download: 'Download',
    
    // Headline
    headline: 'Smart Fitness, Scientific Training',
    
    // Description
    description: 'I-consolePro is your personal fitness trainer, providing personalized training plans through AI technology, real-time data monitoring, making fitness more efficient and fun.',
    
    // Download options title
    downloadOptions: 'Download Options',
    
    // Download channel buttons
    yingyongbao: 'Download from Yingyongbao',
    xiaomi: 'Download from Xiaomi',
    huawei: 'Download from Huawei',
    google: 'Download from Google Play',
    samsung: 'Download from Samsung',
    ios: 'Download from iOS',
    local: 'Local Download',
    
    // Language switch button
    language: 'English',
    switchTo: '中文',
    
    // Guide tip text
    guideTip: 'Click the button in the upper right corner, then in the pop-up menu, click "Open in browser" or click "Copy link" to open in browser, then you can install',
    
    // Modal tip
    notAvailable: 'Not Available Yet'
  }
}

// 语言切换工具函数
export function getLanguage() {
  // 从 localStorage 获取保存的语言，默认为中文
  const savedLang = localStorage.getItem('app-language')
  return savedLang && (savedLang === 'zh' || savedLang === 'en') ? savedLang : 'zh'
}

export function setLanguage(lang) {
  // 保存语言选择到 localStorage
  if (lang === 'zh' || lang === 'en') {
    localStorage.setItem('app-language', lang)
  }
}

export function getTranslation(lang, key) {
  // 获取指定语言的翻译文本
  return translations[lang]?.[key] || translations.zh[key] || key
}
