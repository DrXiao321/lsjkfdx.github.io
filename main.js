// 网站发布教程 - 主要JavaScript逻辑

// 学习进度管理
class LearningProgress {
    constructor() {
        this.progress = this.loadProgress();
        this.init();
    }

    init() {
        this.updateProgressDisplay();
        this.bindEvents();
    }

    // 加载保存的进度
    loadProgress() {
        const saved = localStorage.getItem('learningProgress');
        return saved ? JSON.parse(saved) : {
            completedChapters: [],
            currentPath: null,
            totalProgress: 0
        };
    }

    // 保存进度
    saveProgress() {
        localStorage.setItem('learningProgress', JSON.stringify(this.progress));
    }

    // 完成章节
    completeChapter(chapterId) {
        if (!this.progress.completedChapters.includes(chapterId)) {
            this.progress.completedChapters.push(chapterId);
            this.calculateTotalProgress();
            this.saveProgress();
            this.updateProgressDisplay();
            this.showCompletionMessage(chapterId);
        }
    }

    // 计算总进度
    calculateTotalProgress() {
        const totalChapters = 10; // 假设总共10个章节
        this.progress.totalProgress = Math.round((this.progress.completedChapters.length / totalChapters) * 100);
    }

    // 更新进度显示
    updateProgressDisplay() {
        const progressBar = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (progressBar && progressText) {
            progressBar.style.width = `${this.progress.totalProgress}%`;
            progressText.textContent = `学习进度: ${this.progress.totalProgress}%`;
        }
    }

    // 显示完成消息
    showCompletionMessage(chapterId) {
        const message = document.createElement('div');
        message.className = 'completion-message';
        message.innerHTML = `
            <div class="message-content">
                <h3>🎉 恭喜完成章节！</h3>
                <p>你已完成第 ${chapterId} 章的学习</p>
            </div>
        `;
        document.body.appendChild(message);
        
        // 3秒后自动移除
        setTimeout(() => {
            message.remove();
        }, 3000);
    }

    // 绑定事件
    bindEvents() {
        // 学习路径选择
        document.querySelectorAll('.path-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const path = e.currentTarget.dataset.path;
                this.selectLearningPath(path);
            });
        });

        // 章节完成按钮
        document.querySelectorAll('.complete-chapter').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const chapterId = e.currentTarget.dataset.chapter;
                this.completeChapter(chapterId);
            });
        });
    }

    // 选择学习路径
    selectLearningPath(path) {
        this.progress.currentPath = path;
        this.saveProgress();
        
        // 更新UI
        document.querySelectorAll('.path-card').forEach(card => {
            card.classList.remove('selected');
        });
        document.querySelector(`[data-path="${path}"]`).classList.add('selected');
        
        // 显示相应的学习内容
        this.showPathContent(path);
    }

    // 显示路径内容
    showPathContent(path) {
        const contentMap = {
            'beginner': 'beginner-content',
            'experienced': 'experienced-content'
        };
        
        // 隐藏所有内容
        document.querySelectorAll('.path-content').forEach(content => {
            content.style.display = 'none';
        });
        
        // 显示选中的内容
        const targetContent = document.getElementById(contentMap[path]);
        if (targetContent) {
            targetContent.style.display = 'block';
            // 添加动画效果
            anime({
                targets: targetContent,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 500,
                easing: 'easeOutQuad'
            });
        }
    }
}

// 域名搜索工具
class DomainSearch {
    constructor() {
        this.init();
    }

    init() {
        const searchBtn = document.getElementById('domainSearchBtn');
        const domainInput = document.getElementById('domainInput');
        
        if (searchBtn && domainInput) {
            searchBtn.addEventListener('click', () => this.searchDomain());
            domainInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.searchDomain();
            });
        }
    }

    searchDomain() {
        const domain = document.getElementById('domainInput').value.trim();
        if (!domain) return;

        const resultsContainer = document.getElementById('domainResults');
        resultsContainer.innerHTML = '<div class="loading">正在检查域名可用性...</div>';

        // 模拟API调用
        setTimeout(() => {
            const results = this.generateMockResults(domain);
            this.displayResults(results);
        }, 1500);
    }

    generateMockResults(domain) {
        const tlds = ['.com', '.net', '.org', '.cn', '.io'];
        return tlds.map(tld => ({
            domain: domain + tld,
            available: Math.random() > 0.3,
            price: Math.floor(Math.random() * 200) + 50
        }));
    }

    displayResults(results) {
        const container = document.getElementById('domainResults');
        container.innerHTML = results.map(result => `
            <div class="domain-result ${result.available ? 'available' : 'unavailable'}">
                <div class="domain-info">
                    <span class="domain-name">${result.domain}</span>
                    <span class="domain-status">${result.available ? '✅ 可用' : '❌ 已注册'}</span>
                </div>
                ${result.available ? `
                    <div class="domain-price">¥${result.price}/年</div>
                    <button class="register-btn" onclick="alert('注册功能演示 - 实际使用时会跳转到注册页面')">立即注册</button>
                ` : ''}
            </div>
        `).join('');
    }
}

// 代码编辑器模拟器
class CodeEditor {
    constructor() {
        this.init();
    }

    init() {
        const editors = document.querySelectorAll('.code-editor');
        editors.forEach(editor => this.initEditor(editor));
    }

    initEditor(editor) {
        const textarea = editor.querySelector('.code-input');
        const preview = editor.querySelector('.code-preview');
        const runBtn = editor.querySelector('.run-code');

        if (runBtn) {
            runBtn.addEventListener('click', () => {
                this.runCode(textarea.value, preview);
            });
        }

        // 实时预览
        if (textarea) {
            textarea.addEventListener('input', () => {
                this.updatePreview(textarea.value, preview);
            });
        }
    }

    runCode(code, preview) {
        if (preview) {
            preview.innerHTML = code;
        }
    }

    updatePreview(code, preview) {
        if (preview) {
            preview.innerHTML = code;
        }
    }
}

// 网站构建器向导
class WebsiteBuilder {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 4;
        this.formData = {};
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateStepDisplay();
    }

    bindEvents() {
        // 下一步按钮
        document.querySelectorAll('.next-step').forEach(btn => {
            btn.addEventListener('click', () => this.nextStep());
        });

        // 上一步按钮
        document.querySelectorAll('.prev-step').forEach(btn => {
            btn.addEventListener('click', () => this.prevStep());
        });

        // 表单输入
        document.querySelectorAll('.builder-input').forEach(input => {
            input.addEventListener('change', (e) => {
                this.formData[e.target.name] = e.target.value;
                this.updatePreview();
            });
        });
    }

    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.updateStepDisplay();
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateStepDisplay();
        }
    }

    updateStepDisplay() {
        // 更新步骤指示器
        document.querySelectorAll('.step-indicator').forEach((indicator, index) => {
            const stepNum = index + 1;
            indicator.classList.remove('active', 'completed');
            
            if (stepNum < this.currentStep) {
                indicator.classList.add('completed');
            } else if (stepNum === this.currentStep) {
                indicator.classList.add('active');
            }
        });

        // 显示当前步骤内容
        document.querySelectorAll('.step-content').forEach((content, index) => {
            content.style.display = (index + 1 === this.currentStep) ? 'block' : 'none';
        });

        // 更新按钮状态
        const prevBtn = document.querySelector('.prev-step');
        const nextBtn = document.querySelector('.next-step');
        
        if (prevBtn) prevBtn.style.display = this.currentStep === 1 ? 'none' : 'inline-block';
        if (nextBtn) {
            nextBtn.textContent = this.currentStep === this.totalSteps ? '生成网站' : '下一步';
        }
    }

    updatePreview() {
        const preview = document.querySelector('.website-preview');
        if (preview && this.formData.siteName) {
            preview.innerHTML = `
                <div class="preview-header" style="background: ${this.formData.primaryColor || '#3b82f6'}">
                    <h2>${this.formData.siteName}</h2>
                </div>
                <div class="preview-content">
                    <p>网站类型: ${this.formData.siteType || '未选择'}</p>
                    <p>主题颜色: ${this.formData.primaryColor || '默认蓝色'}</p>
                </div>
            `;
        }
    }
}

// 学习统计和成就系统
class AchievementSystem {
    constructor() {
        this.stats = this.loadStats();
        this.achievements = this.loadAchievements();
        this.init();
    }

    init() {
        this.updateStatsDisplay();
        this.updateAchievements();
        this.bindEvents();
    }

    loadStats() {
        const saved = localStorage.getItem('learningStats');
        return saved ? JSON.parse(saved) : {
            chaptersCompleted: 0,
            toolsUsed: 0,
            codeExamplesViewed: 0,
            studyTime: 0,
            lastStudyDate: null
        };
    }

    loadAchievements() {
        const saved = localStorage.getItem('learningAchievements');
        return saved ? JSON.parse(saved) : {
            beginner: false,
            developer: false,
            expert: false
        };
    }

    saveStats() {
        localStorage.setItem('learningStats', JSON.stringify(this.stats));
    }

    saveAchievements() {
        localStorage.setItem('learningAchievements', JSON.stringify(this.achievements));
    }

    incrementStat(statName) {
        this.stats[statName]++;
        this.saveStats();
        this.updateStatsDisplay();
        this.checkAchievements();
    }

    updateStatsDisplay() {
        const elements = {
            'chapters-completed': this.stats.chaptersCompleted,
            'tools-used': this.stats.toolsUsed,
            'code-examples': this.stats.codeExamplesViewed,
            'study-time': this.stats.studyTime
        };

        Object.keys(elements).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                this.animateNumber(element, elements[id]);
            }
        });
    }

    animateNumber(element, target) {
        const duration = 1000;
        const start = 0;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (target - start) * progress);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    updateAchievements() {
        // 更新成就进度条
        const achievements = [
            { name: 'beginner', threshold: 3, progress: this.stats.chaptersCompleted },
            { name: 'developer', threshold: 5, progress: this.stats.chaptersCompleted },
            { name: 'expert', threshold: 10, progress: this.stats.chaptersCompleted }
        ];

        achievements.forEach(achievement => {
            const progressBar = document.querySelector(`[data-target="${achievement.threshold * 10}"]`);
            const progressText = progressBar?.parentElement.nextElementSibling?.querySelector('.progress-text');
            
            if (progressBar && progressText) {
                const percentage = Math.min((achievement.progress / achievement.threshold) * 100, 100);
                progressBar.style.width = `${percentage}%`;
                progressText.textContent = `${Math.round(percentage)}%`;
            }
        });
    }

    checkAchievements() {
        // 检查是否获得新成就
        if (this.stats.chaptersCompleted >= 3 && !this.achievements.beginner) {
            this.unlockAchievement('beginner', '初学者徽章', '🏆');
        }
        
        if (this.stats.chaptersCompleted >= 5 && !this.achievements.developer) {
            this.unlockAchievement('developer', '开发者徽章', '💻');
        }
        
        if (this.stats.chaptersCompleted >= 10 && !this.achievements.expert) {
            this.unlockAchievement('expert', '专家徽章', '🚀');
        }
    }

    unlockAchievement(key, name, icon) {
        this.achievements[key] = true;
        this.saveAchievements();
        
        // 显示成就解锁通知
        this.showAchievementNotification(name, icon);
    }

    showAchievementNotification(name, icon) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">${icon}</div>
                <div class="achievement-text">
                    <h4>成就解锁！</h4>
                    <p>${name}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // 动画显示
        anime({
            targets: notification,
            translateX: [300, 0],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutQuad'
        });
        
        // 5秒后移除
        setTimeout(() => {
            anime({
                targets: notification,
                translateX: [0, 300],
                opacity: [1, 0],
                duration: 500,
                easing: 'easeOutQuad',
                complete: () => notification.remove()
            });
        }, 5000);
    }

    bindEvents() {
        // 绑定各种学习事件
        document.addEventListener('chapterCompleted', () => {
            this.incrementStat('chaptersCompleted');
        });

        document.addEventListener('toolUsed', () => {
            this.incrementStat('toolsUsed');
        });

        document.addEventListener('codeExampleViewed', () => {
            this.incrementStat('codeExamplesViewed');
        });

        // 学习时间统计
        let studyStartTime = Date.now();
        setInterval(() => {
            this.stats.studyTime += 1;
            this.saveStats();
            this.updateStatsDisplay();
        }, 60000); // 每分钟更新一次
    }
}

// 高级网站构建器
class AdvancedWebsiteBuilder {
    constructor() {
        this.templates = this.loadTemplates();
        this.currentTemplate = null;
        this.init();
    }

    loadTemplates() {
        return {
            personal: {
                name: '个人网站',
                description: '适合个人博客、简历展示',
                sections: ['hero', 'about', 'portfolio', 'contact']
            },
            business: {
                name: '商业网站',
                description: '适合公司官网、产品展示',
                sections: ['hero', 'services', 'about', 'contact']
            },
            portfolio: {
                name: '作品集',
                description: '适合设计师、摄影师',
                sections: ['hero', 'gallery', 'about', 'contact']
            },
            blog: {
                name: '博客网站',
                description: '适合内容创作者',
                sections: ['hero', 'articles', 'about', 'contact']
            }
        };
    }

    init() {
        this.createBuilderInterface();
        this.bindEvents();
    }

    createBuilderInterface() {
        const builderContainer = document.getElementById('advanced-builder');
        if (!builderContainer) return;

        builderContainer.innerHTML = `
            <div class="builder-interface">
                <div class="template-selection">
                    <h3>选择网站模板</h3>
                    <div class="templates-grid">
                        ${Object.keys(this.templates).map(key => `
                            <div class="template-card" data-template="${key}">
                                <div class="template-preview">
                                    <div class="template-mockup ${key}"></div>
                                </div>
                                <div class="template-info">
                                    <h4>${this.templates[key].name}</h4>
                                    <p>${this.templates[key].description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="builder-workspace" style="display: none;">
                    <div class="builder-sidebar">
                        <h4>网站设置</h4>
                        <div class="setting-group">
                            <label>网站名称</label>
                            <input type="text" id="builder-site-name" placeholder="输入网站名称">
                        </div>
                        <div class="setting-group">
                            <label>主题颜色</label>
                            <input type="color" id="builder-theme-color" value="#3b82f6">
                        </div>
                        <div class="setting-group">
                            <label>字体选择</label>
                            <select id="builder-font">
                                <option value="Noto Sans SC">思源黑体</option>
                                <option value="Microsoft YaHei">微软雅黑</option>
                                <option value="SimHei">黑体</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="builder-preview">
                        <div class="preview-header">
                            <h4>实时预览</h4>
                            <div class="preview-controls">
                                <button id="preview-desktop" class="active">桌面</button>
                                <button id="preview-tablet">平板</button>
                                <button id="preview-mobile">手机</button>
                            </div>
                        </div>
                        <div class="preview-content">
                            <iframe id="builder-preview-frame"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    bindEvents() {
        // 模板选择
        document.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('click', () => {
                const templateKey = card.dataset.template;
                this.selectTemplate(templateKey);
            });
        });

        // 设置变更
        ['builder-site-name', 'builder-theme-color', 'builder-font'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', () => this.updatePreview());
            }
        });

        // 预览模式切换
        document.querySelectorAll('.preview-controls button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.preview-controls button').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.updatePreviewMode(e.target.id);
            });
        });
    }

    selectTemplate(templateKey) {
        this.currentTemplate = templateKey;
        
        // 更新UI
        document.querySelectorAll('.template-card').forEach(card => {
            card.classList.remove('selected');
        });
        document.querySelector(`[data-template="${templateKey}"]`).classList.add('selected');
        
        // 显示工作区
        document.querySelector('.template-selection').style.display = 'none';
        document.querySelector('.builder-workspace').style.display = 'flex';
        
        this.updatePreview();
    }

    updatePreview() {
        if (!this.currentTemplate) return;

        const siteName = document.getElementById('builder-site-name')?.value || '我的网站';
        const themeColor = document.getElementById('builder-theme-color')?.value || '#3b82f6';
        const font = document.getElementById('builder-font')?.value || 'Noto Sans SC';

        const html = this.generateTemplateHTML(this.currentTemplate, {
            siteName,
            themeColor,
            font
        });

        const iframe = document.getElementById('builder-preview-frame');
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(html);
        iframeDoc.close();
    }

    generateTemplateHTML(template, settings) {
        const sections = this.templates[template].sections;
        
        return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${settings.siteName}</title>
    <link href="https://fonts.googleapis.com/css2?family=${settings.font.replace(' ', '+')}:wght@300;400;500;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: '${settings.font}', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        header { background: ${settings.themeColor}; color: white; padding: 2rem 0; text-align: center; }
        nav { background: #f8fafc; padding: 1rem 0; border-bottom: 1px solid #e5e7eb; }
        nav ul { list-style: none; display: flex; justify-content: center; gap: 2rem; }
        nav a { text-decoration: none; color: #4b5563; font-weight: 500; padding: 0.5rem 1rem; border-radius: 0.375rem; transition: all 0.3s ease; }
        nav a:hover { background: ${settings.themeColor}; color: white; }
        main { padding: 3rem 0; }
        .section { margin-bottom: 3rem; }
        .section h2 { font-size: 2rem; color: #1f2937; margin-bottom: 1rem; text-align: center; }
        footer { background: #1f2937; color: white; text-align: center; padding: 2rem 0; }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <h1>${settings.siteName}</h1>
            <p>欢迎来到我们的网站</p>
        </div>
    </header>
    
    <nav>
        <div class="container">
            <ul>
                <li><a href="#home">首页</a></li>
                <li><a href="#about">关于</a></li>
                <li><a href="#services">服务</a></li>
                <li><a href="#contact">联系</a></li>
            </ul>
        </div>
    </nav>
    
    <main>
        <div class="container">
            ${sections.map(section => this.generateSectionHTML(section, settings)).join('')}
        </div>
    </main>
    
    <footer>
        <div class="container">
            <p>&copy; 2024 ${settings.siteName}. 保留所有权利.</p>
        </div>
    </footer>
</body>
</html>`;
    }

    generateSectionHTML(section, settings) {
        const sections = {
            hero: `
                <section class="section">
                    <h2>欢迎来到${settings.siteName}</h2>
                    <p style="text-align: center; max-width: 600px; margin: 0 auto;">我们致力于为您提供最优质的服务和解决方案。无论您是个人用户还是企业客户，我们都能满足您的需求。</p>
                </section>
            `,
            about: `
                <section class="section">
                    <h2>关于我们</h2>
                    <p style="text-align: center; max-width: 600px; margin: 0 auto;">我们是一支充满激情的团队，专注于为客户提供最佳的网站解决方案。凭借多年的经验和专业知识，我们能够满足各种复杂的需求。</p>
                </section>
            `,
            services: `
                <section class="section">
                    <h2>我们的服务</h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 2rem;">
                        <div style="background: white; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-align: center;">
                            <div style="font-size: 3rem; margin-bottom: 1rem;">🚀</div>
                            <h3 style="font-size: 1.5rem; color: #1f2937; margin-bottom: 1rem;">快速高效</h3>
                            <p style="color: #6b7280;">采用最新技术，确保网站运行速度快，用户体验佳</p>
                        </div>
                        <div style="background: white; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-align: center;">
                            <div style="font-size: 3rem; margin-bottom: 1rem;">📱</div>
                            <h3 style="font-size: 1.5rem; color: #1f2937; margin-bottom: 1rem;">响应式设计</h3>
                            <p style="color: #6b7280;">完美适配各种设备，无论是电脑、平板还是手机</p>
                        </div>
                        <div style="background: white; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-align: center;">
                            <div style="font-size: 3rem; margin-bottom: 1rem;">🔒</div>
                            <h3 style="font-size: 1.5rem; color: #1f2937; margin-bottom: 1rem;">安全可靠</h3>
                            <p style="color: #6b7280;">采用业界标准的安全措施，保护您的数据和隐私</p>
                        </div>
                    </div>
                </section>
            `,
            portfolio: `
                <section class="section">
                    <h2>作品展示</h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 2rem;">
                        <div style="background: white; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                            <div style="background: #f3f4f6; height: 150px; border-radius: 0.375rem; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; color: #9ca3af;">作品预览</div>
                            <h4 style="font-weight: 600; margin-bottom: 0.5rem;">项目一</h4>
                            <p style="color: #6b7280; font-size: 0.875rem;">这是一个优秀的项目描述</p>
                        </div>
                        <div style="background: white; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                            <div style="background: #f3f4f6; height: 150px; border-radius: 0.375rem; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; color: #9ca3af;">作品预览</div>
                            <h4 style="font-weight: 600; margin-bottom: 0.5rem;">项目二</h4>
                            <p style="color: #6b7286; font-size: 0.875rem;">这是一个创新的项目描述</p>
                        </div>
                        <div style="background: white; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                            <div style="background: #f3f4f6; height: 150px; border-radius: 0.375rem; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; color: #9ca3af;">作品预览</div>
                            <h4 style="font-weight: 600; margin-bottom: 0.5rem;">项目三</h4>
                            <p style="color: #6b7280; font-size: 0.875rem;">这是一个精彩的项目描述</p>
                        </div>
                    </div>
                </section>
            `,
            gallery: `
                <section class="section">
                    <h2>作品画廊</h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 2rem;">
                        ${Array.from({length: 6}, (_, i) => `
                            <div style="background: #f3f4f6; height: 200px; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; color: #9ca3af;">
                                图片 ${i + 1}
                            </div>
                        `).join('')}
                    </div>
                </section>
            `,
            articles: `
                <section class="section">
                    <h2>最新文章</h2>
                    <div style="display: grid; gap: 2rem; margin-top: 2rem;">
                        <article style="background: white; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                            <h3 style="font-size: 1.5rem; color: #1f2937; margin-bottom: 1rem;">文章标题一</h3>
                            <p style="color: #6b7280; margin-bottom: 1rem;">这是文章的摘要内容，简要介绍文章的主要观点和内容...</p>
                            <a href="#" style="color: ${settings.themeColor}; text-decoration: none; font-weight: 500;">阅读更多 →</a>
                        </article>
                        <article style="background: white; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                            <h3 style="font-size: 1.5rem; color: #1f2937; margin-bottom: 1rem;">文章标题二</h3>
                            <p style="color: #6b7280; margin-bottom: 1rem;">这是另一篇文章的摘要内容，分享更多有价值的信息...</p>
                            <a href="#" style="color: ${settings.themeColor}; text-decoration: none; font-weight: 500;">阅读更多 →</a>
                        </article>
                    </div>
                </section>
            `,
            contact: `
                <section class="section">
                    <h2>联系我们</h2>
                    <div style="max-width: 600px; margin: 0 auto; background: white; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                        <form>
                            <div style="margin-bottom: 1.5rem;">
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #374151;">姓名</label>
                                <input type="text" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem;" placeholder="请输入您的姓名">
                            </div>
                            <div style="margin-bottom: 1.5rem;">
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #374151;">邮箱</label>
                                <input type="email" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem;" placeholder="请输入您的邮箱">
                            </div>
                            <div style="margin-bottom: 1.5rem;">
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #374151;">留言</label>
                                <textarea rows="4" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem;" placeholder="请输入您的留言"></textarea>
                            </div>
                            <button type="submit" style="width: 100%; padding: 0.75rem; background: ${settings.themeColor}; color: white; border: none; border-radius: 0.375rem; font-weight: 500; cursor: pointer;">发送消息</button>
                        </form>
                    </div>
                </section>
            `
        };

        return sections[section] || '';
    }

    updatePreviewMode(mode) {
        const iframe = document.getElementById('builder-preview-frame');
        const container = iframe.parentElement;
        
        container.className = 'preview-content';
        
        switch(mode) {
            case 'preview-tablet':
                container.classList.add('tablet-mode');
                break;
            case 'preview-mobile':
                container.classList.add('mobile-mode');
                break;
            default:
                container.classList.add('desktop-mode');
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有组件
    const learningProgress = new LearningProgress();
    const domainSearch = new DomainSearch();
    const codeEditor = new CodeEditor();
    const websiteBuilder = new WebsiteBuilder();
    const achievementSystem = new AchievementSystem();
    const advancedBuilder = new AdvancedWebsiteBuilder();

    // 初始化动画
    initAnimations();
    
    // 初始化滚动效果
    initScrollEffects();
});

// 动画初始化
function initAnimations() {
    // Hero区域动画
    anime.timeline({
        easing: 'easeOutExpo',
        duration: 1000
    })
    .add({
        targets: '.hero-title',
        translateY: [50, 0],
        opacity: [0, 1],
        delay: 200
    })
    .add({
        targets: '.hero-subtitle',
        translateY: [30, 0],
        opacity: [0, 1],
        delay: 100
    }, '-=800')
    .add({
        targets: '.hero-cta',
        translateY: [20, 0],
        opacity: [0, 1],
        scale: [0.9, 1]
    }, '-=600');

    // 卡片悬停动画
    document.querySelectorAll('.tutorial-card, .tool-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                scale: 1.05,
                translateY: -10,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });

        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                scale: 1,
                translateY: 0,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
}

// 滚动效果
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                anime({
                    targets: element,
                    translateY: [30, 0],
                    opacity: [0, 1],
                    duration: 800,
                    easing: 'easeOutQuad',
                    delay: anime.stagger(100)
                });
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // 观察所有需要动画的元素
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// 工具函数
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 动画显示
    anime({
        targets: notification,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
    });
    
    // 3秒后自动移除
    setTimeout(() => {
        anime({
            targets: notification,
            translateX: [0, 300],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeOutQuad',
            complete: () => notification.remove()
        });
    }, 3000);
}

// 快速网站构建器演示
function showQuickBuilder() {
    const demoContainer = document.getElementById('quick-builder-demo');
    if (!demoContainer) return;

    demoContainer.innerHTML = `
        <div class="quick-builder-interface">
            <div class="builder-header mb-4">
                <h5 class="font-semibold text-gray-800 mb-2">快速网站构建器</h5>
                <div class="flex gap-2">
                    <input type="text" id="demo-site-name" placeholder="网站名称" class="flex-1 px-2 py-1 text-sm border rounded">
                    <select id="demo-template" class="px-2 py-1 text-sm border rounded">
                        <option value="personal">个人网站</option>
                        <option value="business">商业网站</option>
                        <option value="portfolio">作品集</option>
                    </select>
                </div>
            </div>
            
            <div class="builder-preview bg-white border rounded p-4" style="height: 200px; overflow: hidden;">
                <div class="preview-content text-xs">
                    <div class="bg-blue-500 text-white p-2 mb-2 rounded">
                        <h6 id="preview-title">我的网站</h6>
                    </div>
                    <nav class="bg-gray-100 p-1 mb-2">
                        <div class="flex gap-2 text-xs">
                            <a href="#" class="text-blue-600">首页</a>
                            <a href="#" class="text-blue-600">关于</a>
                            <a href="#" class="text-blue-600">服务</a>
                            <a href="#" class="text-blue-600">联系</a>
                        </div>
                    </nav>
                    <div class="p-2">
                        <h6 class="font-semibold mb-1">欢迎来到我们的网站</h6>
                        <p class="text-gray-600">这是一个专业的网站，为您提供优质服务。</p>
                    </div>
                </div>
            </div>
            
            <div class="builder-controls mt-3 flex gap-2">
                <button onclick="updateDemoPreview()" class="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">
                    更新预览
                </button>
                <button onclick="generateDemoCode()" class="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600">
                    生成代码
                </button>
                <button onclick="resetDemo()" class="px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600">
                    重置
                </button>
            </div>
        </div>
    `;

    // 绑定事件
    document.getElementById('demo-site-name')?.addEventListener('input', updateDemoPreview);
    document.getElementById('demo-template')?.addEventListener('change', updateDemoPreview);
    
    // 初始化预览
    updateDemoPreview();
}

function updateDemoPreview() {
    const siteName = document.getElementById('demo-site-name')?.value || '我的网站';
    const template = document.getElementById('demo-template')?.value || 'personal';
    
    const titleElement = document.getElementById('preview-title');
    if (titleElement) {
        titleElement.textContent = siteName;
    }
    
    showNotification('预览已更新！', 'success');
}

function generateDemoCode() {
    const siteName = document.getElementById('demo-site-name')?.value || '我的网站';
    const template = document.getElementById('demo-template')?.value || 'personal';
    
    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${siteName}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Noto Sans SC', sans-serif; line-height: 1.6; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        header { background: #3b82f6; color: white; padding: 2rem 0; text-align: center; }
        nav { background: #f8fafc; padding: 1rem 0; border-bottom: 1px solid #e5e7eb; }
        nav ul { list-style: none; display: flex; justify-content: center; gap: 2rem; }
        nav a { text-decoration: none; color: #4b5563; font-weight: 500; padding: 0.5rem 1rem; border-radius: 0.375rem; }
        nav a:hover { background: #3b82f6; color: white; }
        main { padding: 3rem 0; }
        footer { background: #1f2937; color: white; text-align: center; padding: 2rem 0; }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <h1>${siteName}</h1>
            <p>专业网站开发服务</p>
        </div>
    </header>
    
    <nav>
        <div class="container">
            <ul>
                <li><a href="#home">首页</a></li>
                <li><a href="#about">关于</a></li>
                <li><a href="#services">服务</a></li>
                <li><a href="#contact">联系</a></li>
            </ul>
        </div>
    </nav>
    
    <main>
        <div class="container">
            <section>
                <h2>欢迎来到${siteName}</h2>
                <p>我们致力于为您提供最优质的网站开发服务。</p>
            </section>
        </div>
    </main>
    
    <footer>
        <div class="container">
            <p>&copy; 2024 ${siteName}. 保留所有权利.</p>
        </div>
    </footer>
</body>
</html>`;
    
    // 创建下载链接
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('网站代码已生成并下载！', 'success');
}

function resetDemo() {
    const demoContainer = document.getElementById('quick-builder-demo');
    if (demoContainer) {
        demoContainer.innerHTML = `
            <div class="text-center py-8">
                <div class="text-4xl mb-4">🚀</div>
                <p class="text-gray-600">点击"立即开始构建"体验完整功能</p>
            </div>
        `;
    }
}