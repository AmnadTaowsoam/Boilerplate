# Betagro Coding Standards & Templates

> **มาตรฐานและ Templates สำหรับการพัฒนา Application**  
> Group Technology & Digital (GT&D) Department

---

## 📁 โครงสร้างโฟลเดอร์

```
coding-standard/
├── standards/                    # 📋 มาตรฐานและ Checklists
│   ├── README.md
│   ├── 01-inhouse-technical-requirement.md
│   ├── 02-outsource-technical-requirement.md
│   ├── 03-security-requirement.md
│   ├── 04-technical-infrastructure-requirement.md
│   ├── 05-design-requirement.md
│   ├── 06-master-checklist.md
│   └── 07-approved-templates.md
│
├── Backend_nodejs-Template/      # 🟢 Node.js Backend Template
├── Backend_python-Template/      # 🐍 Python Backend Template
├── Frontend-Template/            # ⚛️ React Frontend Template
│
└── create-project.js            # 🚀 Project Generator Script
```

---

## 🚀 Quick Start: สร้างโปรเจกต์ใหม่

### วิธีที่ 1: ใช้ Project Generator (แนะนำ)

```bash
# สร้าง Node.js Backend
node create-project.js backend-node my-api

# สร้าง Python Backend
node create-project.js backend-python my-service

# สร้าง React Frontend
node create-project.js frontend my-app

# สร้างที่ folder อื่น
node create-project.js backend-node my-api ../projects
```

### วิธีที่ 2: Copy Template ด้วยตัวเอง

```bash
# Node.js Backend
cp -r Backend_nodejs-Template/Backend_nodejs-Template ./my-project
cd my-project
node scripts/setup-project.js my-project

# Python Backend
cp -r Backend_python-Template ./my-service
cd my-service
python scripts/setup_project.py my-service

# React Frontend
cp -r Frontend-Template/Frontend-Template ./my-app
cd my-app
node scripts/setup-project.js my-app
```

---

## 📋 Standards Documentation

### เอกสารมาตรฐานหลัก

| เอกสาร | คำอธิบาย |
|:-------|:---------|
| [01-inhouse-technical-requirement.md](./standards/01-inhouse-technical-requirement.md) | มาตรฐานเทคนิคสำหรับทีมพัฒนาภายใน |
| [02-outsource-technical-requirement.md](./standards/02-outsource-technical-requirement.md) | มาตรฐานสำหรับ Vendor/Outsource |
| [03-security-requirement.md](./standards/03-security-requirement.md) | มาตรฐานความปลอดภัย |
| [04-technical-infrastructure-requirement.md](./standards/04-technical-infrastructure-requirement.md) | มาตรฐาน Infrastructure |
| [05-design-requirement.md](./standards/05-design-requirement.md) | มาตรฐาน UX/UI และ WCAG |
| [06-master-checklist.md](./standards/06-master-checklist.md) | รวม Checklist ทั้งหมดสำหรับ Release |
| [07-approved-templates.md](./standards/07-approved-templates.md) | รายละเอียด Templates ที่อนุมัติ |

---

## 🛠️ Approved Templates

### 🟢 Backend Node.js
| Technology | Version |
|:-----------|:--------|
| Node.js | 24 LTS |
| TypeScript | 5.4+ |
| Express | 4.21+ |
| Prisma | 5.16+ |
| Jest | 29.7+ |
| Winston | 3.10+ |

**Features:** Helmet security, Zod validation, JSON logging, Graceful shutdown, Datadog integration

### 🐍 Backend Python
| Technology | Version |
|:-----------|:--------|
| Python | 3.11+ |
| FastAPI | 0.115+ |
| Uvicorn | 0.34+ |
| Pydantic | 2.5+ |

**Features:** Auto OpenAPI docs, JSON logging, Health checks, Docker ready

### ⚛️ Frontend React
| Technology | Version |
|:-----------|:--------|
| React | 18.2+ |
| TypeScript | 5.5+ |
| Vite | 5.4+ |
| Redux Toolkit | 1.9+ |
| MUI | 6.1+ |

**Features:** i18n (TH/EN), Datadog RUM, SCSS modules, E2E testing (WebdriverIO)

---

## ✅ Key Standards Summary

### Performance
| Metric | Target |
|:-------|:-------|
| Page Load | ≤ 3 seconds |
| API Response | ≤ 200ms |
| Google PageSpeed | ≥ 90 |

### Testing
| Type | Coverage |
|:-----|:---------|
| Unit Tests | ≥ 70% |
| E2E Tests | ≥ 70% requirements |

### Security
| Requirement | Standard |
|:------------|:---------|
| TLS | ≥ 1.2 |
| HSTS | ≥ 12 months |
| VAPT | Before go-live |

### Accessibility
| Standard | Level |
|:---------|:------|
| WCAG | 2.2 Level A |

---

## 📚 การใช้งานมาตรฐาน

### สำหรับ Code Review
1. เปิดไฟล์ [06-master-checklist.md](./standards/06-master-checklist.md)
2. Copy checklist ไปยังโปรเจกต์
3. ทำเครื่องหมาย ☐ → ☑ เมื่อผ่านแต่ละข้อ

### สำหรับ Pre-Release
1. รัน automated tests
2. ตรวจสอบ performance metrics
3. ทำ security scan
4. ผ่าน Definition of Done checklist

### สำหรับ Architecture Review
1. อ่าน technical requirements ที่เกี่ยวข้อง
2. ตรวจสอบ technology stack ที่ใช้
3. ยืนยันการใช้ approved templates

---

## 🔗 Quick Links

- [Standards README](./standards/README.md)
- [Master Checklist](./standards/06-master-checklist.md)
- [Template Documentation](./standards/07-approved-templates.md)
- [Node.js Template README](./Backend_nodejs-Template/Backend_nodejs-Template/TEMPLATE_README.md)
- [Python Template README](./Backend_python-Template/TEMPLATE_README.md)
- [Frontend Template README](./Frontend-Template/Frontend-Template/TEMPLATE_README.md)

---

## 📞 Contact

| เรื่อง | ติดต่อ |
|:------|:-------|
| Architecture Questions | GT&D Team |
| Security Concerns | Head of Security (via Product Owner) |
| Technical Standards | Head of Application Development |
| Design Standards | UX/UI Design Team |

---

*Maintained by Group Technology & Digital (GT&D) Department*  
*Last Updated: December 2024*

