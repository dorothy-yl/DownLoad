<template>
  <div class="landing-page">
    <!-- 顶部导航栏 -->
    <nav class="navbar">
      <div class="nav-container">
        <!-- Logo -->
       <div class="logo">
          <img src="@/image/爱心.svg" alt="I-consolePro" class="logo-icon" />
          <span class="logo-text">I-consolePro</span>
        </div>
        <div class="nav-links">
        </div>
        <div class="nav-actions">
          <!-- 语言切换按钮 -->
          <button class="language-btn" @click="toggleLanguage" :title="t.switchTo">
            {{ t.language }}
          </button>
          <button class="download-btn">{{ t.download }}</button>
        </div>
      </div>


    <!-- 引导提示条 -->
    <div 
      v-if="showGuideTip && (isMobile || isTablet)" 
      class="guide-tip"
      :style="guideTipStyle"
      @click="closeGuideTip"
    >
      <div class="guide-tip-content">
        <span class="guide-tip-text">{{ t.guideTip }}</span>
        <img src="@/image/不规则箭头-右上.svg" alt="arrow" class="guide-tip-arrow" />
      </div>
    </div>

    </nav>

    <!-- iOS下载弹窗 -->
    <div v-if="showIOSModal" class="modal-overlay" @click="closeIOSModal">
      <div class="modal-content" @click.stop>
        <div class="modal-body">
          <p class="modal-text">{{ t.notAvailable }}</p>
        </div>
        <button class="modal-close-btn" @click="closeIOSModal">确定</button>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 左侧内容 -->
      <div class="left-section">
     
        <!-- 标题 -->
        <h1 class="headline">
          <span class="headline-part-2">{{ t.headline }}</span>
        </h1>

        <!-- 描述文字 -->
        <p class="description">
          {{ t.description }}
        </p>


    
        <!-- 下载渠道列表 -->
        <div class="download-channels">
          <h3 class="channels-title">{{ t.downloadOptions }}</h3>
          <div class="channels-grid">
            <a 
              v-if="false"
              href="#" 
              class="channel-item" 
              :title="t.yingyongbao"
              :ref="el => setChannelRef(el, 'yingyongbao')"
              @click.prevent="handleChannelClick('yingyongbao', $event)"
            >
              <img src="@/image/应用宝.svg" :alt="t.yingyongbao" />
              <span class="channel-text">{{ t.yingyongbao }}</span>
            </a>
            <a 
              v-if="false"
              href="#" 
              class="channel-item" 
              :title="t.xiaomi"
              :ref="el => setChannelRef(el, 'xiaomi')"
              @click.prevent="handleChannelClick('xiaomi', $event)"
            >
              <img src="@/image/小米.svg" :alt="t.xiaomi" />
               <span class="channel-text">{{ t.xiaomi }}</span>
            </a>
            <a 
              v-if="false"
              href="#" 
              class="channel-item" 
              :title="t.huawei"
              :ref="el => setChannelRef(el, 'huawei')"
              @click.prevent="handleChannelClick('huawei', $event)"
            >
              <img src="@/image/华为.svg" :alt="t.huawei" />
              <span class="channel-text">{{ t.huawei }}</span>
             </a>
           
            <a 
              href="#" 
              class="channel-item" 
              :title="t.google"
              :ref="el => setChannelRef(el, 'google')"
              @click.prevent="handleChannelClick('google', $event)"
            >
              <img src="@/image/谷歌.svg" :alt="t.google" />
               <span class="channel-text">{{ t.google }}</span>
            </a>
            <a 
              href="#" 
              class="channel-item" 
              :title="t.ios"
              :ref="el => setChannelRef(el, 'ios')"
              @click.prevent="handleChannelClick('ios', $event)"
            >
              <img src="@/image/ios下载.svg" :alt="t.ios" />
               <span class="channel-text">{{ t.ios }}</span>
            </a>
            <a 
              href="#" 
              class="channel-item" 
              :title="t.local"
              :ref="el => setChannelRef(el, 'local')"
              @click.prevent="handleChannelClick('local', $event)"
            >
              <img src="@/image/本地下载.svg" :alt="t.local" />
               <span class="channel-text">{{ t.local }}</span>
            </a>
            <a 
              v-if="false"
              href="#" 
              class="channel-item" 
              :title="t.samsung"
              :ref="el => setChannelRef(el, 'samsung')"
              @click.prevent="handleChannelClick('samsung', $event)"
            >
              <img src="@/image/三星.svg" :alt="t.samsung" />
               <span class="channel-text">{{ t.samsung }}</span>
            </a>
            
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { translations, getLanguage, setLanguage, getTranslation } from '@/utils/i18n.js'

// 当前语言状态
const currentLang = ref('zh')

// 计算属性：获取当前语言的翻译对象
const t = computed(() => {
  return translations[currentLang.value] || translations.zh
})

// 切换语言函数
const toggleLanguage = () => {
  currentLang.value = currentLang.value === 'zh' ? 'en' : 'zh'
  setLanguage(currentLang.value)
}

// 响应式判断
const windowWidth = ref(window.innerWidth)
const isMobile = computed(() => windowWidth.value < 768)
const isTablet = computed(() => windowWidth.value >= 768 && windowWidth.value < 1024)
const isDesktop = computed(() => windowWidth.value >= 1024)

// 提示条相关状态
const showGuideTip = ref(false)
const guideTipStyle = ref({})
const autoHideTimer = ref(null)
const channelRefs = ref({})

// iOS弹窗状态
const showIOSModal = ref(false)

// 设置渠道按钮引用
const setChannelRef = (el, channelName) => {
  if (el) {
    channelRefs.value[channelName] = el
  }
}

// 处理渠道按钮点击
const handleChannelClick = async (channelName, event) => {
  // 如果是iOS下载且在手机端或平板端，显示弹窗
  if (channelName === 'ios' && (isMobile.value || isTablet.value)) {
    showIOSModal.value = true
    return
  }

  // 仅在手机端和平板端显示提示条
  if (!isMobile.value && !isTablet.value) {
    return
  }

  // 清除之前的定时器
  if (autoHideTimer.value) {
    clearTimeout(autoHideTimer.value)
    autoHideTimer.value = null
  }

  // 等待 DOM 更新后更新提示条位置
  await nextTick()
  updateGuideTipPosition()

  // 显示提示条
  showGuideTip.value = true

  // 5秒后自动隐藏
  autoHideTimer.value = setTimeout(() => {
    showGuideTip.value = false
    autoHideTimer.value = null
  }, 5000)
}

// 关闭iOS弹窗
const closeIOSModal = () => {
  showIOSModal.value = false
}

// 更新提示条位置 - 固定在导航栏下方
const updateGuideTipPosition = () => {
  const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0
  
  // 提示条始终固定在导航栏下方
  guideTipStyle.value = {
    top: `${navbarHeight}px`
  }
}

// 手动关闭提示条
const closeGuideTip = () => {
  showGuideTip.value = false
  if (autoHideTimer.value) {
    clearTimeout(autoHideTimer.value)
    autoHideTimer.value = null
  }
}

// 监听窗口大小变化
const handleResize = () => {
  windowWidth.value = window.innerWidth
  // 如果是桌面端，隐藏提示条
  if (isDesktop.value) {
    closeGuideTip()
  } else if (showGuideTip.value) {
    // 如果提示条正在显示，更新位置以适应导航栏高度变化
    updateGuideTipPosition()
  }
}

// 组件挂载时从 localStorage 读取语言设置
onMounted(() => {
  currentLang.value = getLanguage()
  window.addEventListener('resize', handleResize)
})

// 组件卸载时清理
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (autoHideTimer.value) {
    clearTimeout(autoHideTimer.value)
  }
})
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #e8f4f8 0%, #d0e8f0 100%);
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

/* 顶部导航栏 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.nav-container {
  max-width: 1800px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-links {
   display: none;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #1890ff;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
}

.language-btn {
  padding: 0.5rem 1.2rem;
  border: 2px solid #666;
  border-radius: 25px;
  background: transparent;
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  min-width: 70px;
}

.language-btn:hover {
  border-color: #1890ff;
  color: #1890ff;
  background: rgba(24, 144, 255, 0.05);
  transform: translateY(-2px);
}

.download-btn {
  padding: 0.5rem 1.5rem;
  border: 2px solid #1890ff;
  border-radius: 25px;
  background: transparent;
  color: #1890ff;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.download-btn:hover {
  background: #1890ff;
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
}

/* 主内容区域 */
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: flex-start;
}

/* 左侧内容 */
.left-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 8rem;
   align-items: center; /* 子元素水平居中 */
  text-align: center;  /* 文本内容居中 */
}

.logo {
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
}

.logo-icon {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.logo-text {
 font-size: 24px;
  font-weight: bold;
  /* 蓝→绿的背景渐变 */
 background: linear-gradient(to right, #2196F3, #4CAF50);  /* 把背景裁剪成文字形状 */
  -webkit-background-clip: text;
  background-clip: text;
  /* 文字本身设为透明，显示背景渐变 */
  color: transparent;
}

.headline {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
  display:flex;
}

.headline-part-1 {
  color: #1a3a5f;
  margin-bottom: 0.4em;
  letter-spacing: 0.10em; 

}

.headline-part-2 {
 color: #1890ff;
 letter-spacing: 0.10em; 
}

.description {
  font-size: 1.3rem;
  line-height: 1.8;
  color: #666;
  margin: 0;
  max-width: 500px;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-primary {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #1890ff;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(24, 144, 255, 0.3);
}

.btn-primary:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(24, 144, 255, 0.4);
}

.btn-secondary {
  padding: 0.75rem 1.5rem;
  border: 2px solid #1890ff;
  border-radius: 25px;
  background: #fff;
  color: #1890ff;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #f0f8ff;
  transform: translateY(-2px);
}

.info-icon {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #1890ff;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  font-style: normal;
}

/* 下载渠道区域 */
.download-channels {
  margin-top: 6rem;
}

.channels-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 1.5rem 0;
}

.channels-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  width: 100%;
}

.channel-item {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 250px;
  height: 60px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
  overflow: hidden;
  padding: 0 1rem;
  gap: 0.75rem;
}

.channel-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.channel-item img {
  width: 40px;
  height: 40px;
  object-fit: contain;
  flex-shrink: 0;
}

.channel-item-local {
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  width: auto;
  padding: 0 1.5rem;
  min-width: 120px;
}

.local-download-text {
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 2px;
}

.channel-item-local:hover {
  background: linear-gradient(135deg, #096dd9 0%, #0050b3 100%);
}
/* 下载渠道文字样式 - 渐变色增强版 */
.channel-text {
  /* 基础字体样式 */
  font-size: 6rem;
  font-weight: 700;
  white-space: nowrap; /* 文字不换行，保证一行显示 */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif; /* 和页面字体统一 */
  
  /* 文字细节优化 */
  letter-spacing: 0.02em; /* 轻微字间距，提升可读性 */
  line-height: 1; /* 行高和字体大小一致，垂直居中更精准 */
  
  /* 渐变色文字效果 */
  background: linear-gradient(135deg, #1890ff 0%, #4CAF50 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent; /* 兼容性回退 */
  
  /* 抗锯齿，文字更清晰 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  /* 平滑过渡效果 */
  transition: all 0.3s ease;
}

/* hover 状态文字样式 - 渐变色增强 */
.channel-item:hover .channel-text {
  /* hover时渐变颜色更鲜艳，对比度增强 */
  background: linear-gradient(135deg, #096dd9 0%, #2e7d32 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  font-weight: 600; /* hover时加粗，增强交互反馈 */
  transform: scale(1.05); /* 轻微放大，增强视觉反馈 */
}

/* 响应式适配 - 平板端 */
@media (max-width: 1024px) and (min-width: 641px) {
  .channels-grid {
    gap: 1.25rem;
    width: 100%;
    align-items: center;
  }

  .channel-item {
    width: 280px;
    height: 58px;
    padding: 0 1.25rem;
    gap: 0.875rem;
  }

  .channel-item img {
    width: 38px;
    height: 38px;
  }

  .channel-text {
    font-size: 0.9rem;
    /* 保持渐变效果，调整渐变角度以适应较小文字 */
    background: linear-gradient(135deg, #1890ff 0%, #4CAF50 100%);
    -webkit-background-clip: text;
    background-clip: text;
  }
  
  .channel-item:hover .channel-text {
    background: linear-gradient(135deg, #096dd9 0%, #2e7d32 100%);
    -webkit-background-clip: text;
    background-clip: text;
  }
}

/* 响应式适配 - 手机端 */
@media (max-width: 640px) {
  .channel-text {
    font-size: 1.2rem; /* 手机端文字缩小，适配小屏幕 */
    /* 手机端使用更简洁的渐变，确保小字体下清晰可见 */
    background: linear-gradient(135deg, #1890ff 0%, #4CAF50 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }
  
  .channel-item:hover .channel-text {
    background: linear-gradient(135deg, #096dd9 0%, #2e7d32 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    transform: scale(1.03); /* 手机端缩小放大比例 */
  }
}

/* 桌面端大屏适配 - 增强渐变效果 */
@media (min-width: 1201px) {
  .channel-text {
    font-size: 1.5rem;
    /* 大屏使用更丰富的渐变效果 */
    background: linear-gradient(135deg, #1890ff 0%, #40a9ff 50%, #4CAF50 100%);
    -webkit-background-clip: text;
    background-clip: text;
  }
  
  .channel-item:hover .channel-text {
    background: linear-gradient(135deg, #096dd9 0%, #1890ff 50%, #2e7d32 100%);
    -webkit-background-clip: text;
    background-clip: text;
  }
}

/* 右侧手机展示 */
.right-section {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 2rem;
}

.phone-mockup {
  width: 400px;  
  height: 800px; 
  object-fit: contain; 
  
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15));
  transition: transform 0.3s ease;
}

.phone-mockup:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 25px 45px rgba(0, 0, 0, 0.2));
}

/* 文字切换过渡效果 */
.headline-part-2,
.description,
.channels-title,
.channel-text,
.download-btn,
.language-btn {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

/* 响应式设计 */
@media (max-width: 968px) {
  .main-content {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding: 6rem 1.5rem 3rem;
  }

 .left-section {
    order: -1;
    padding-top: 0; /* 可选：去掉文字区域的顶部padding，适配手机端 */
  }

  .download-channels {
    width: 100%;
    margin-top: 4rem;
  }

  .channels-grid {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .phone-mockup {
    max-width: 100%;
     height: auto;
  }

  .headline {
    font-size: 2.5rem;
  }

  .description {
    font-size: 1rem;
  }

  .nav-container {
    padding: 0 1.5rem;
  }

  .nav-links {
    gap: 1rem;
    display: none;
  }

  .nav-link {
    font-size: 0.85rem;
  }

  .nav-actions {
    gap: 0.75rem;
  }

  .language-btn {
    padding: 0.4rem 1rem;
    font-size: 0.85rem;
    min-width: 60px;
  }

  .download-btn {
    padding: 0.4rem 1.2rem;
    font-size: 0.85rem;
  }
}

@media (max-width: 640px) {
  .headline {
    font-size: 2rem;
  }

  .channels-grid {
    gap: 1rem;
    width: 100%;
    align-items: stretch;
  }

  .channel-item {
    width: 100%;
    max-width: 100%;
    height: 56px;
    padding: 0 1rem;
    gap: 0.75rem;
  }

  .channel-item img {
    width: 36px;
    height: 36px;
  }

  .channel-item-local {
    min-width: 100px;
    padding: 0 1rem;
  }

  .local-download-text {
    font-size: 0.9rem;
  }

  .nav-links {
    display: none;
  }

  .nav-container {
    padding: 0 1rem;
    gap: 1rem;
  }

  .nav-actions {
    gap: 0.5rem;
  }

  .language-btn {
    padding: 0.35rem 0.8rem;
    font-size: 0.8rem;
    min-width: 55px;
  }

  .download-btn {
    padding: 0.35rem 1rem;
    font-size: 0.8rem;
  }

  .logo-text {
    font-size: 20px;
  }

  .logo-icon {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 1024px) and (min-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .headline {
    font-size: 2.8rem;
  }
}

/* 手机适配（例如：< 768px） */
@media (max-width: 767px) {
  .headline {
    font-size: 2rem;
  }
  .channels-grid {
    gap: 1rem;
    flex-direction: column;
    align-items: stretch;
  }
  .channel-item {
    width: 100%;
    max-width: 100%;
  }
}

/* 桌面端大屏适配（例如：> 1200px） */
@media (min-width: 1201px) {
  .main-content {
    max-width: 800px;
  }
}

/* 引导提示条样式 */
.guide-tip {
 width: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: opacity 0.3s ease, transform 0.3s ease;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.guide-tip-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
}

.guide-tip-text {
  flex: 1;
  color: #fff;
  line-height: 1.5;
  text-align: left;
}

.guide-tip-arrow {
  flex-shrink: 0;
  object-fit: contain;
}

/* 手机端样式 */
@media (max-width: 767px) {
  .guide-tip {
    padding: 0.8rem 1rem;
  }

  .guide-tip-text {
    font-size: 0.85rem;
  }

  .guide-tip-arrow {
    width: 24px;
    height: 24px;
  }
}

/* 平板端样式 */
@media (min-width: 768px) and (max-width: 1023px) {
  .guide-tip {
    padding: 0.9rem 1.2rem;
  }

  .guide-tip-text {
    font-size: 0.95rem;
  }

  .guide-tip-arrow {
    width: 28px;
    height: 28px;
  }
}

/* 桌面端隐藏提示条 */
@media (min-width: 1024px) {
  .guide-tip {
    display: none !important;
  }
}

/* iOS下载弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  max-width: 320px;
  width: 90%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-body {
  width: 100%;
  text-align: center;
}

.modal-text {
  font-size: 1.2rem;
  font-weight: 500;
  color: #333;
  margin: 0;
  line-height: 1.5;
}

.modal-close-btn {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  background: #1890ff;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 100px;
}

.modal-close-btn:hover {
  background: #096dd9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
}

.modal-close-btn:active {
  transform: translateY(0);
}

/* 手机端弹窗样式 */
@media (max-width: 640px) {
  .modal-content {
    padding: 1.5rem;
    max-width: 280px;
  }

  .modal-text {
    font-size: 1.1rem;
  }

  .modal-close-btn {
    padding: 0.65rem 1.5rem;
    font-size: 0.95rem;
  }
}
</style>
