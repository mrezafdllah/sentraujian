import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { predictions, schools } from '@sentraujian/fixtures';
import { routeContracts } from '@sentraujian/shared-config/routes';
import { StatePanel } from './state-panel';
import type { ProductState } from '@sentraujian/ui';
import './style.css';

const navigation = routeContracts.filter((route) => route.area === 'central' && !route.path.includes(':'));
const centralPaths = new Set(['/dashboard', '/schools', '/question-bank', '/question-bank/prediction', '/question-bank/import', '/reviews', '/package-builder', '/package-builder/new', '/distributions', '/schedules', '/results', '/sync-failures', '/audit-log', '/settings/ml', '/profile']);

function App() {
  const path = window.location.pathname;
  const [state, setState] = useState<ProductState | null>(null);
  if (path === '/login' || path === '/forgot-password') return <AuthPage forgot={path === '/forgot-password'} />;

  const activePath = path === '/' ? '/dashboard' : path;
  const contract = routeContracts.find((route) => route.path === activePath);
  const isPredictions = activePath === '/question-bank/prediction';
  const isSchools = activePath === '/schools';
  const title = contract?.label ?? 'Central route';
  const isPlaceholder = !centralPaths.has(activePath) || ['question-bank', 'question-bank/import', 'reviews', 'package-builder/new'].some((part) => activePath === `/${part}`);

  return <div className="shell"><aside><strong>SentraUjian</strong><small>Central Platform</small><nav>{navigation.map((route) => <a className={route.path === activePath || (isPredictions && route.path === '/question-bank') ? 'active' : ''} href={route.path} key={route.path}>{route.label}</a>)}</nav><a className="logout" href="/login">Sign out</a></aside><main><header><div><small>Central / {title}</small><h1>{title}</h1></div><button>mrezafdllah</button></header><div className="state-toolbar"><small>State preview</small>{(['loading', 'empty', 'error', 'offline', 'permission'] as ProductState[]).map((item) => <button key={item} onClick={() => setState(item)}>{item}</button>)}</div>{state && <StatePanel model={{ state, title: state === 'permission' ? 'Permission required' : `${capitalize(state)} state`, message: state === 'offline' ? 'Central API is unavailable. Cached data is shown.' : 'This is a contract-first UI state for API integration.', actionLabel: state === 'error' || state === 'offline' ? 'Retry' : undefined }} onAction={() => setState(null)} />}{isPlaceholder && !state ? <Placeholder title={title} path={activePath} /> : isPredictions ? <PredictionTable /> : isSchools ? <SchoolTable /> : <Dashboard />}</main></div>;
}

function AuthPage({ forgot }: { forgot: boolean }) { return <main className="auth-page"><div className="auth-card"><small>SentraUjian · Central Platform</small><h1>{forgot ? 'Reset your password' : 'Sign in to Central'}</h1><p>{forgot ? 'Enter your staff email to receive recovery instructions.' : 'Use your staff account to manage assessments.'}</p>{forgot ? <input aria-label="Staff email" placeholder="staff@sentraujian.id" type="email" /> : <><input aria-label="Staff email" placeholder="staff@sentraujian.id" type="email" /><input aria-label="Password" placeholder="Password" type="password" /></>}<button className="primary" onClick={() => { window.location.href = '/dashboard'; }}>{forgot ? 'Send recovery link' : 'Sign in'}</button><a href={forgot ? '/login' : '/forgot-password'}>{forgot ? 'Back to login' : 'Forgot password?'}</a></div></main>; }
function Dashboard() { return <><section className="grid"><article><small>Active schools</small><b>24</b><span className="success">+8% this month</span></article><article><small>Approved questions</small><b>1,240</b><span>35 AI drafts awaiting review</span></article><article><small>Packages distributed</small><b>18</b><span>3 pending acknowledgements</span></article></section><section className="panel"><div className="panel-title"><div><small>Edge readiness</small><h2>School connectivity</h2></div><a href="/schools">View all schools</a></div><table><thead><tr><th scope="col">School</th><th scope="col">Code</th><th scope="col">Edge status</th></tr></thead><tbody><SchoolRows /></tbody></table></section></>; }
function SchoolTable() { return <section className="panel"><div className="panel-title"><div><small>Central master data</small><h2>Schools</h2></div><button>Register school</button></div><table><thead><tr><th scope="col">School</th><th scope="col">Code</th><th scope="col">Edge status</th></tr></thead><tbody><SchoolRows /></tbody></table></section>; }
function SchoolRows() { return <>{schools.map((school) => <tr key={school.id}><td>{school.name}</td><td className="mono">{school.code}</td><td><span className={`pill ${school.edgeStatus.toLowerCase()}`}>{school.edgeStatus}</span></td></tr>)}</>; }
function PredictionTable() { return <section className="panel"><div className="panel-title"><div><small>Human review required</small><h2>Prediction runs</h2></div><span className="pill syncing">AI_DRAFT</span></div><table><thead><tr><th scope="col">Question</th><th scope="col">Confidence</th><th scope="col">Model</th><th scope="col">Status</th></tr></thead><tbody>{predictions.map((prediction) => <tr key={prediction.id}><td className="mono">{prediction.questionId}</td><td>{Math.round(prediction.confidence * 100)}%</td><td>{prediction.modelVersion}</td><td><span className="pill syncing">{prediction.status}</span></td></tr>)}</tbody></table></section>; }
function Placeholder({ title, path }: { title: string; path: string }) { return <section className="panel empty-page"><small>Contract-first placeholder · {path}</small><h2>{title}</h2><p>This route is defined by the PRD contract and is ready for its typed API workflow.</p><a href="/dashboard">Back to dashboard</a></section>; }
function capitalize(value: string) { return `${value.charAt(0).toUpperCase()}${value.slice(1)}`; }

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
