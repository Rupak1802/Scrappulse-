import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = [
  { path: 'components/layout/CollectorLayout.tsx', name: 'CollectorLayout' },
  { path: 'components/layout/DashboardLayout.tsx', name: 'DashboardLayout' },
  { path: 'pages/collector/Home.tsx', name: 'Home' },
  { path: 'pages/collector/Sell.tsx', name: 'Sell' },
  { path: 'pages/collector/Recyclers.tsx', name: 'Recyclers' },
  { path: 'pages/collector/FairDeal.tsx', name: 'FairDeal' },
  { path: 'pages/collector/Earnings.tsx', name: 'Earnings' },
  { path: 'pages/collector/Simulator.tsx', name: 'Simulator' },
  { path: 'pages/collector/OpportunityMap.tsx', name: 'OpportunityMap' },
  { path: 'pages/collector/Profile.tsx', name: 'Profile' },
  { path: 'pages/dashboard/SupplyRadar.tsx', name: 'SupplyRadar' },
  { path: 'pages/dashboard/Transactions.tsx', name: 'Transactions' },
  { path: 'pages/dashboard/Fleet.tsx', name: 'Fleet' },
  { path: 'pages/dashboard/Matcher.tsx', name: 'Matcher' },
  { path: 'pages/dashboard/Anomalies.tsx', name: 'Anomalies' },
  { path: 'pages/dashboard/Reliability.tsx', name: 'Reliability' },
  { path: 'pages/dashboard/DigitalTwin.tsx', name: 'DigitalTwin' },
  { path: 'pages/dashboard/Reports.tsx', name: 'Reports' },
];

pages.forEach(p => {
  const fullPath = path.join(__dirname, 'src', p.path);
  const dir = path.dirname(fullPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let content = `export default function ${p.name}() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">${p.name} Placeholder</h1>
    </div>
  );
}`;

  if (p.name.includes('Layout')) {
    content = `import { Outlet } from 'react-router-dom';

export default function ${p.name}() {
  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 bg-primary text-primary-foreground font-bold border-b border-border">
        ${p.name} Shell
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}`;
  }

  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, content);
    console.log(`Created ${p.path}`);
  }
});
