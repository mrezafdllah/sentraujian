import { edgeHealth, participants, predictions, schools } from './index';
export { MockExamGateway, demoExamToken } from './exam-gateway';

export const mockCentralApi = {
  async listSchools() { return { data: schools, page: { page: 1, pageSize: 20, total: schools.length } }; },
  async listPredictions() { return { data: predictions, page: { page: 1, pageSize: 20, total: predictions.length } }; },
};

export const mockEdgeApi = {
  async health() { return edgeHealth; },
  async monitor() { return participants; },
};
