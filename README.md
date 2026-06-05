# FrostPaw Cooling B2B Website Package

This is a static independent website package for a B2B pet cooling mat brand. It is ready to deploy on GitHub Pages.

## Files

```text
index.html
assets/
  css/style.css
  js/main.js
  images/
```

## Local Preview

Open `index.html` directly in a browser, or run:

```bash
python3 -m http.server 8080
```

Then visit:

```text
http://localhost:8080
```

## Deploy to GitHub Pages

1. Create a new GitHub repository.
2. Upload all files in this folder.
3. Go to `Settings` → `Pages`.
4. Select `Deploy from a branch`.
5. Choose the `main` branch and `/root` folder.
6. Save and wait for GitHub Pages to publish.

## Notes

- The form is currently a front-end demo. Connect it to Formspree, Shopify, WooCommerce, HubSpot, or your own backend before launch.
- Product and factory images are placed in `assets/images/`; replace them with final product photography using the same filenames if needed.
- The layout is responsive for desktop, tablet, and mobile.


## 2026 Product Image Update

已根据最新提供的 6 张产品图更新：
- Hero 大狗冰感主图
- IceWave Cooling Mat 柯基冰感图
- Travel Cooling Mat 车载冰感图
- Cat Chill Pad 猫咪冰感图
- Home Comfort Cooling Pad 家居场景图
- Classic Cooling Mat 产品单独冰感图

应用场景区图片也已同步替换，保持全站冰蓝视觉统一。


## Added Full Pages

This package now includes complete static pages:

- `about.html` — About Us / factory story / manufacturing capability
- `contact.html` — Contact Us / inquiry form / contact details / inquiry process
- `faq.html` — FAQ page for product, OEM/ODM, MOQ, QC and shipping questions

Header and footer links have been updated so the site can be deployed directly to GitHub Pages.

## Typography Professional Polish

已统一字体和字号系统：
- 正文使用 Inter 字体体系
- 标题使用 Manrope / Inter 字体体系
- 调整导航、按钮、标题、产品卡、FAQ、Contact、Footer 的字号与字重
- 降低过重字重，提升网页专业感和可读性
- 保留系统字体 fallback，GitHub Pages 可直接部署


## Hero Banner Update

- 首页 Hero Banner 已升级为更大视觉版面
- 新增 3 张轮播 Banner 图
- 支持自动轮播、左右切换、底部导航点
- 新增 2 张横版 Hero 产品图（家居场景 / 车载场景）
- 更强调视觉冲击力，适合 B2B 独立站首页首屏展示


## OEM / Why Choose Section Optimization

已优化首页两个区块：
- OEM/ODM & Private Label：改为左侧说明 + 中间服务卡片 + 右侧包装图的专业 B2B 结构
- Why Choose Us：改为统一卡片式布局，修正原本图标大小不一致、文字竖排、留白过大问题
- Emoji 图标已改为统一 SVG 线性图标，更接近专业独立站视觉


## Full Copy Optimization

已完成全站英文文案整理：
- 首页 Hero、轮播图、产品卡、卖点条、应用场景、工厂优势、OEM/ODM、Why Choose Us、询盘区
- About Us、Contact Us、FAQ 完整页面文案
- Footer、Meta title、Meta description、表单提示与产品弹窗文案
- 统一为更自然、更专业的 B2B 外贸独立站表达


## Contact Info & WhatsApp Update

- Website contact phone updated to `+86 15277383017`
- Website contact email updated to `sususan12341@gmail.com`
- Floating WhatsApp button added to the bottom-right corner of every page
- WhatsApp link: `https://wa.me/8615277383017`


## Professional OEM Section Update

已专业优化首页 OEM/ODM 区块：
- 修复右侧大面积空白与包装图悬浮问题
- 改为标题说明 + 服务卡片 + 私标包装卡 + OEM流程条
- 合并过度重复的卖点，保留更清晰的 6 项核心服务
- 版面更适合 B2B 外贸独立站展示


## WhatsApp Business Link Update

The floating WhatsApp button now uses:

`https://api.whatsapp.com/send?phone=8615277383017&text=Hello%20FrostPaw%20Cooling%2C%20I%20would%20like%20to%20get%20a%20wholesale%20quote%20for%20pet%20cooling%20mats.`

Note: WhatsApp links cannot force a separate “Business app” if the visitor’s device/browser chooses another WhatsApp handler. The chat will appear as a Business account as long as `+86 15277383017` is registered as a WhatsApp Business number. If you generate an official WhatsApp Business short link such as `https://wa.me/message/XXXX`, replace the button href with that link.


## Added Product Updates

New product cards have been added with click-to-open modal galleries and product details:
- Soft Latex Cooling Mat
- Cooling Gel Ice Mat

- Instant Cooling Pet Ice Mat

- Pet Summer Cooling Pad

- Ice-Silk Cooling Pet Bed

## Application Scene Image Refresh

The homepage application scene images have been updated to match the requested scenarios:
- Home
- On Sofas
- In Crate
- In Car
- Travel
- Indoor Rest
