import type { ExamAutosave, ExamBootstrap, ExamQuestion, ExamRecovery, ExamSubmitReceipt, ExamTokenClaim } from '@sentraujian/api-contracts';
import { EDGE_PROTOCOL_VERSION } from '@sentraujian/api-contracts';

const token = 'SNT-ABCD-1234-EFGH';
const attemptId = 'attempt-demo-001';
const now = () => new Date().toISOString();

export class MockExamGateway {
  private claimed = false;
  private submitted = false;
  private revision = 0;

  bootstrap(protocolVersion: number = EDGE_PROTOCOL_VERSION): ExamBootstrap {
    if (protocolVersion !== EDGE_PROTOCOL_VERSION) throw new Error('INVALID_PROTOCOL_VERSION');
    return { protocolVersion, edgeId: 'EDGE-JKT-001', edgeAddress: '192.168.1.10', serverTime: now(), sessionId: 'session-demo-001' };
  }

  claimToken(input = token): ExamTokenClaim {
    if (input !== token) throw new Error('TOKEN_EXPIRED');
    if (this.claimed) throw new Error('TOKEN_ALREADY_USED');
    this.claimed = true;
    return { token: input, participantId: 'participant-001', attemptId, sessionId: 'session-demo-001', expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString() };
  }

  question(): ExamQuestion { return { id: 'question-001', number: 1, prompt: 'How many questions are in this demo?', options: ['10', '20', '30', '40'] }; }

  autosave(answer: string | null, expectedRevision = this.revision): ExamAutosave {
    if (expectedRevision !== this.revision) throw new Error('REVISION_CONFLICT');
    this.revision += 1;
    return { attemptId, questionId: 'question-001', answer, revision: this.revision, savedAt: now() };
  }

  recover(): ExamRecovery { return { attemptId, status: this.submitted ? 'SUBMITTED' : 'ACTIVE', lastRevision: this.revision, serverTime: now() }; }

  submit(): ExamSubmitReceipt {
    if (this.submitted) throw new Error('ATTEMPT_ALREADY_SUBMITTED');
    this.submitted = true;
    return { receiptId: 'receipt-demo-001', attemptId, status: 'SUBMITTED', score: 85, submittedAt: now() };
  }
}

export { token as demoExamToken };
