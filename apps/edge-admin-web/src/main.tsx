import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { edgeHealth, participants } from '@sentraujian/fixtures';
import { routeContracts } from '@sentraujian/shared-config/routes';
import type { ProductState } from '@sentraujian/ui';
import { StatePanel } from './state-panel';
import './style.css';

const navigation = routeContracts.filter((route) => route.area === 'edge' && !route.path.includes(':'));
const edgePaths: Set<string> = new Set(navigation.map((route) => route.path));

function App() {
  const path = window.location.pathname;
  const [state, setState] = useState<ProductState | null>(null);
  if (path === '/local/login') return <LoginPage />;
  const activePath = path === '/' ? '/local/dashboard' : path;
  const contract = routeContracts.find((route) => route.path === activePath);
  const title = contract?.label ?? 'Operator dashboard';
  const isMonitor = activePath === '/local/monitor';
  const isNotifications = activePath === '/local/notifications';
  const isPlaceholder = !edgePaths.has(activePath) || isNotifications;

  return <div className="edge"><header><div><span className="lan">LAN ONLINE</span><small> Edge Server / {edgeHealth.address}</small></div><strong>Operator Console</strong><a href="/local/notifications">Notifications 2</a></header><main><nav className="operator-nav">{navigation.map((route) => <a className={route.path === activePath ? 'active' : ''} href={route.path} key={route.path}>{route.label}</a>)}</nav><div className="welcome"><div><small>Local exam operations</small><h1>{title}</h1><p>SMAN 1 Nusantara · Scheduled assessment today at 08:00</p></div><button className="primary">Open session</button></div><div className="state-toolbar"><small>State preview</small>{(['loading', 'empty', 'error', 'offline', 'permission'] as ProductState[]).map((item) => <button key={item} onClick={() => setState(item)}>{item}</button>)}</div>{state && <StatePanel model={{ state, title: `${capitalize(state)} state`, message: state === 'offline' ? 'Edge API is unavailable. Reconnect to the LAN to refresh.' : 'This state is ready for real Edge API integration.', actionLabel: state === 'error' || state === 'offline' ? 'Retry' : undefined }} onAction={() => setState(null)} />}{isPlaceholder && !state ? <Placeholder title={title} path={activePath} notification={isNotifications} /> : <><section className="stats"><article><small>Active participants</small><b>{edgeHealth.activeParticipants}</b><span>of 200 capacity</span></article><article><small>Package readiness</small><b>100%</b><span className="ok">Verified and available</span></article><article><small>Central sync</small><b>Synced</b><span>Last sync 07:42</span></article></section><section className="panel"><div className="title"><div><small>{isMonitor ? 'WebSocket demo stream' : 'Live monitor'}</small><h2>Participant activity</h2></div><span className="live">● LIVE</span></div><table><thead><tr><th scope="col">Participant</th><th scope="col">Status</th><th scope="col">Last update</th></tr></thead><tbody>{participants.map((participant) => <tr key={participant.id}><td>{participant.displayName}</td><td><span className={'state ' + participant.status.toLowerCase()}>{participant.status}</span></td><td>{participant.lastSeenAt}</td></tr>)}</tbody></table></section></>}</main></div>;
}

function LoginPage() { return <main className="auth-page"><div className="auth-card"><small>SentraUjian · Edge Server</small><h1>Operator login</h1><p>Connect to the school Edge Server over the local network.</p><input aria-label="Operator ID" placeholder="Operator ID" /><input aria-label="Password" placeholder="Password" type="password" /><button className="primary" onClick={() => { window.location.href = '/local/dashboard'; }}>Connect to Edge</button></div></main>; }
function Placeholder({ title, path, notification }: { title: string; path: string; notification: boolean }) { return <section className="panel empty-page"><small>{notification ? 'In-App Notification Edge' : 'Contract-first placeholder'} · {path}</small><h2>{title}</h2><p>{notification ? 'Package, session, storage, and synchronization events will appear here from the Edge API.' : 'This operator workflow is defined by the PRD route contract and is ready for its typed Edge API workflow.'}</p><a href="/local/dashboard">Back to dashboard</a></section>; }
function capitalize(value: string) { return `${value.charAt(0).toUpperCase()}${value.slice(1)}`; }

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
