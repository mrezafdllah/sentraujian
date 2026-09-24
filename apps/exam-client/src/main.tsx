import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { EDGE_PROTOCOL_VERSION } from '@sentraujian/api-contracts';
import './style.css';

const routes = ['/client', '/client/login', '/client/system-check', '/client/exam', '/client/result', '/client/reconnect', '/client/locked'] as const;

function App() {
  const path = routes.includes(window.location.pathname as typeof routes[number]) ? window.location.pathname : '/client';
  const [token, setToken] = useState('');
  const content = path === '/client/login' ? <Login token={token} setToken={setToken} /> : path === '/client/system-check' ? <SystemCheck /> : path === '/client/exam' ? <Exam /> : path === '/client/result' ? <Result /> : path === '/client/reconnect' ? <Reconnect /> : path === '/client/locked' ? <Locked /> : <Launcher />;
  return <div className="exam-shell"><header><div><strong>SentraExam</strong><small>Participant Client</small></div><span>Edge protocol v{EDGE_PROTOCOL_VERSION}</span></header><main>{content}</main><footer>Traffic stays on the school Edge Server · No Central Platform access during exam</footer></div>;
}

function Frame({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) { return <section className="exam-card"><small>{eyebrow}</small><h1>{title}</h1>{children}</section>; }
function Launcher() { return <Frame eyebrow="Ready for local assessment" title="Start your exam session"><p className="muted">Connect to the school Edge Server before continuing. Your device and session readiness are checked locally.</p><div className="checks"><span>● Edge connected</span><span>● Client v0.1.0</span></div><a className="primary" href="/client/system-check">Run system check</a></Frame>; }
function Login({ token, setToken }: { token: string; setToken: (value: string) => void }) { return <Frame eyebrow="One-time exam token" title="Enter your token"><p className="muted">Use the token provided by your school operator. It is valid for one attempt only.</p><input aria-label="Exam token" placeholder="SNT-XXXX-XXXX-XXXX" value={token} onChange={(event) => setToken(event.target.value)} /><a className="primary" href="/client/system-check">Continue</a></Frame>; }
function SystemCheck() { return <Frame eyebrow="Readiness check" title="Check this device"><div className="check-list"><span>✓ Edge LAN connection</span><span>✓ Official Edge time</span><span>✓ Screen resolution</span><span>✓ Local encrypted storage</span><span>✓ Session package available</span></div><a className="primary" href="/client/exam">Start exam</a></Frame>; }
function Exam() { return <Frame eyebrow="Assessment · Mathematics" title="Question 01"><div className="timer">01:24:36</div><p className="question">If a package contains 20 questions and 5 are marked for review, how many questions are not marked?</p>{['10 questions', '15 questions', '20 questions', '25 questions'].map((answer) => <button className="answer" key={answer}>{answer}</button>)}<div className="exam-actions"><a href="/client/exam">Previous</a><a className="primary" href="/client/result">Submit exam</a></div></Frame>; }
function Result() { return <Frame eyebrow="Attempt submitted" title="Your result is ready"><div className="score">85<span>/100</span></div><p className="muted">Scored locally by the Edge Server. This result will be synchronized when Central is available.</p><a className="primary" href="/client">Return to launcher</a></Frame>; }
function Reconnect() { return <Frame eyebrow="Recovery attempt" title="Reconnect to your session"><p className="muted">Your latest autosaved answer is preserved. Reconnect to the same attempt before the session timer expires.</p><div className="checks"><span>● Attempt found</span><span>● Last autosave acknowledged</span></div><a className="primary" href="/client/exam">Resume attempt</a></Frame>; }
function Locked() { return <Frame eyebrow="Exam mode" title="This client is locked"><p className="muted">The exam window is in controlled fullscreen mode. Ask the proctor for assistance if you need to recover the session.</p><div className="lock-note">Kiosk controls are platform-dependent and do not replace proctoring.</div></Frame>; }

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
