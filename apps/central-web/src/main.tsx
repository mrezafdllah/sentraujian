import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { predictions, schools } from '@sentraujian/fixtures';
import { StatePanel } from './state-panel';
import type { ProductState } from '@sentraujian/ui';
import './style.css';

const routes = [
  ['Dashboard', '/'], ['Schools', '/schools'], ['Question Bank', '/question-bank/prediction'],
  ['Package Builder', '/package-builder'], ['Distributions', '/distributions'], ['Results', '/results'],
  ['Audit Log', '/audit-log'], ['ML Settings', '/settings/ml'],
] as const;

function App() {
  const path = window.location.pathname;
  const [state, setState] = useState<ProductState | null>(null);
  const isPredictions = path.includes('prediction');
  const isPlaceholder = !['/', '/schools', '/question-bank/prediction'].includes(path);
  const title = isPredictions ? 'AI prediction review' : path === '/schools' ? 'School directory' : 'Assessment operations';

  return <div className="shell"><aside><strong>SentraUjian</strong><small>Central Platform</small><nav>{routes.map(([label, href]) => <a className={(isPredictions && label === 'Question Bank') || (!isPredictions && href === path) ? 'active' : ''} href={href} key={label}>{label}</a>)}</nav></aside><main><header><div><small>Central / {isPredictions ? 'Question Bank / Predictions' : title}</small><h1>{title}</h1></div><button>mrezafdllah</button></header><div className="state-toolbar"><small>State preview</small>{(['loading', 'empty', 'error', 'offline', 'permission'] as ProductState[]).map((item) => <button key={item} onClick={() => setState(item)}>{item}</button>)}</div>{state && <StatePanel model={{ state, title: state === 'permission' ? 'Permission required' : `${capitalize(state)} state`, message: state === 'offline' ? 'Central API is unavailable. Cached data is shown.' : 'This is a contract-first UI state for API integration.', actionLabel: state === 'error' || state === 'offline' ? 'Retry' : undefined }} onAction={() => setState(null)} />}{isPlaceholder && !state ? <section className="panel empty-page"><small>Contract-first placeholder</small><h2>{title}</h2><p>This route is reserved for the PRD workflow and currently uses no live API.</p><a href="/">Back to dashboard</a></section> : isPredictions ? <PredictionTable /> : path === '/schools' ? <SchoolTable /> : <Dashboard />}</main></div>;
}

function capitalize(value: string) { return `${value.charAt(0).toUpperCase()}${value.slice(1)}`; }

function Dashboard() { return <><section className="grid"><article><small>Active schools</small><b>24</b><span className="success">+8% this month</span></article><article><small>Approved questions</small><b>1,240</b><span>35 AI drafts awaiting review</span></article><article><small>Packages distributed</small><b>18</b><span>3 pending acknowledgements</span></article></section><section className="panel"><div className="panel-title"><div><small>Edge readiness</small><h2>School connectivity</h2></div><a href="/schools">View all schools</a></div><SchoolRows /></section></>; }
function SchoolTable() { return <section className="panel"><div className="panel-title"><div><small>Central master data</small><h2>Schools</h2></div><button>Register school</button></div><table><thead><tr><th>School</th><th>Code</th><th>Edge status</th></tr></thead><tbody><SchoolRows /></tbody></table></section>; }
function SchoolRows() { return <>{schools.map((school) => <tr key={school.id}><td>{school.name}</td><td className="mono">{school.code}</td><td><span className={`pill ${school.edgeStatus.toLowerCase()}`}>{school.edgeStatus}</span></td></tr>)}</>; }
function PredictionTable() { return <section className="panel"><div className="panel-title"><div><small>Human review required</small><h2>Prediction runs</h2></div><span className="pill syncing">AI_DRAFT</span></div><table><thead><tr><th>Question</th><th>Confidence</th><th>Model</th><th>Status</th></tr></thead><tbody>{predictions.map((prediction) => <tr key={prediction.id}><td className="mono">{prediction.questionId}</td><td>{Math.round(prediction.confidence * 100)}%</td><td>{prediction.modelVersion}</td><td><span className="pill syncing">{prediction.status}</span></td></tr>)}</tbody></table></section>; }

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
