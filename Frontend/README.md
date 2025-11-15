# Pulse254 🩸

> Connecting blood donors with those in need across Kenya

Pulse254 is a modern web platform designed to streamline blood donation and requests in Kenya. We bridge the gap between blood donors, hospitals, and patients, making it easier to save lives through efficient blood donation coordination.

## 🌟 Features

### For Donors
- Quick and easy blood donation registration
- Find nearby blood drives and donation centers
- Track your donation history and impact
- Receive notifications for urgent blood requests matching your blood type
- Earn recognition badges for regular donations

### For Hospitals & Medical Facilities
- Post urgent blood requests with real-time updates
- Access a network of verified donors
- Manage blood inventory and requirements
- Coordinate blood drives and donation events
- Streamlined communication with donor network

### For Patients & Families
- Emergency blood request submissions
- Real-time status updates on blood availability
- Connect directly with compatible donors
- Access to blood drive schedules

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/muoki-anna/pulse254.git
cd pulse254
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Add your environment variables:
```env
NEXT_PUBLIC_API_URL=your_api_url
DATABASE_URL=your_database_url
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Lucide Icons
- **Styling**: Tailwind CSS with custom medical theme
- **Build Tool**: Vite/Next.js
- **State Management**: React Hooks

## 📁 Project Structure

```
pulse254/
├── src/
│   ├── components/
│   │   ├── ui/           # Reusable UI components
│   │   ├── Header.tsx    # Navigation header
│   │   └── ...
│   ├── pages/            # Application pages
│   ├── styles/           # Global styles and themes
│   ├── utils/            # Helper functions
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
└── README.md
```

## 🎨 Design System

Pulse254 uses a medical-themed design system with:
- Primary color: Medical Red (`#DC2626`)
- Clean, accessible typography
- Smooth animations and transitions
- Mobile-first responsive design
- Dark mode support

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## 📋 Roadmap

- [ ] Mobile app for iOS and Android
- [ ] SMS notifications for donors without smartphones
- [ ] Integration with national blood banks
- [ ] Multi-language support (Swahili, English)
- [ ] Advanced donor matching algorithms
- [ ] Donation appointment scheduling
- [ ] Blood drive event management system
- [ ] Analytics dashboard for hospitals

## 🔒 Privacy & Security

We take data privacy seriously:
- All user data is encrypted
- GDPR and Kenya Data Protection Act compliant
- Secure authentication and authorization
- Regular security audits
- Transparent data handling policies

## 📞 Contact & Support

- **Website**: [www.pulse254.co.ke](https://www.pulse254.co.ke)
- **Email**: support@pulse254.co.ke
- **Twitter**: [@Pulse254KE](https://twitter.com/pulse254ke)
- **Emergency Hotline**: +254 707819850

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Kenya National Blood Transfusion Service
- All our volunteer donors and healthcare partners
- Open source community for amazing tools and libraries
- Every life saved through blood donation

## 💡 Why Pulse254?

In Kenya, blood shortages are a critical challenge. Pulse254 exists to:
- Save lives through efficient blood donation coordination
- Reduce emergency response times for blood requests
- Build a sustainable donor community
- Make blood donation accessible and rewarding
- Support healthcare facilities with reliable blood supply networks

---

**Made with ❤️ for Kenya**

*Every donation counts. Every life matters.*