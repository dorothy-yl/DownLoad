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
        <button class="download-btn">下载</button>
      </div>
    </nav>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 左侧内容 -->
      <div class="left-section">
     
        <!-- 标题 -->
        <h1 class="headline">
          <span class="headline-part-1">智能健身,</span>
          <span class="headline-part-2">科学训练</span>
        </h1>

        <!-- 描述文字 -->
        <p class="description">
          I-consolePro 是您的私人健身教练,通过AI技术为您提供个性化训练计划,实时数据监测,让健身更高效、更有趣。
        </p>

        <!-- 下载渠道列表 -->
        <div class="download-channels">
          <h3 class="channels-title">下载方式</h3>
          <div class="channels-grid">
            <a href="#" class="channel-item" title="应用宝">
              <img src="@/image/应用宝.svg" alt="应用宝" />
            </a>
            <a href="#" class="channel-item" title="小米商城">
              <img src="@/image/小米.svg" alt="小米商城" />
            </a>
            <a href="#" class="channel-item" title="华为">
              <img src="@/image/华为.svg" alt="华为" />
            </a>
           
            <a href="#" class="channel-item" title="Google Play">
              <img src="@/image/谷歌.svg" alt="Google Play" />
            </a>
            <a href="#" class="channel-item" title="三星">
              <img src="@/image/三星.svg" alt="三星" />
            </a>
            
          </div>
        </div>
      </div>

      <!-- 右侧手机展示 -->
      <div class="right-section">
        <img src="@/image/phone_mockup.png" alt="I-consolePro App" class="phone-mockup" />
      </div>
    </div>
  </div>
</template>

<script setup>
// Vue 3 Script Setup - 无需额外导入
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
  margin-left: auto;
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
  padding: 8rem 2rem 4rem;
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
  font-size: 3.5rem;
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
  font-size: 1.5rem;
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
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: center;
}

.channel-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
  overflow: hidden;
}

.channel-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.channel-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 8px;
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
}

@media (max-width: 640px) {
  .headline {
    font-size: 2rem;
  }

  .channels-grid {
    gap: 1rem;
  }

  .channel-item {
    width: 50px;
    height: 50px;
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
  }
}

/* 桌面端大屏适配（例如：> 1200px） */
@media (min-width: 1201px) {
  .main-content {
    max-width: 1800px;
  }
}
</style>
