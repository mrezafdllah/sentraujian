import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import type { School } from '@sentraujian/api-contracts';
import { predictions, schools } from '@sentraujian/fixtures';
import './style.css';

function App() {
  const path = window.location.pathname;
  const isPredictions = path.includes('prediction');
  return <div className="shell"><aside><strong>SentraUjian</strong><small>Central Platform</small><nav>{['Dashboard','Schools','Question Bank','Package Builder','Distributions','Results','Audit Log','ML Settings'].map((item) => <a className={(isPredictions && item === 'Question Bank') || (!isPredictions && item === 'Dashboard') ? 'active' : ''} href={item === 'Question Bank' ? '/question-bank/prediction' : '/'} key={item}>{item}</a>)}</nav></aside><main><header><div><small>Central / {isPredictions ? 'Question Bank / Predictions' : 'Overview'}</small><h1>{isPredictions ? 'AI prediction review' : 'Assessment operations'}</h1></div><button>mrezafdllah</button></header>{isPredictions ? <section className="panel"><div className="panel-title"><div><small>Human review required</small><h2>Prediction runs</h2></div><span className="pill syncing">AI_DRAFT</span></div><table><thead><tr><th>Question</th><th>Confidence</th><th>Model</th><th>Status</th></tr></thead><tbody>{predictions.map((prediction) => <tr key={prediction.id}><td className="mono">{prediction.questionId}</td><td>{Math.round(prediction.confidence * 100)}%</td><td>{prediction.modelVersion}</td><td><span className="pill syncing">{prediction.status}</span></td></tr>)}</tbody></table></section> : <><section className="grid"><article><small>Active schools</small><b>24</b><span className="success">+8% this month</span></article><article><small>Approved questions</small><b>1,240</b><span>35 AI drafts awaiting review</span></article><article><small>Packages distributed</small><b>18</b><span>3 pending acknowledgements</span></article></section><section className="panel"><div className="panel-title"><div><small>Edge readiness</small><h2>School connectivity</h2></div><a href="/schools">View all schools</a></div><table><thead><tr><th>School</th><th>Code</th><th>Edge status</th></tr></thead><tbody>{(schools as School[]).map((school) => <tr key={school.id}><td>{school.name}</td><td className="mono">{school.code}</td><td><span className={`pill ${school.edgeStatus.toLowerCase()}`}>{school.edgeStatus}</span></td></tr>)}</tbody></table></section></>}</main></div>;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
