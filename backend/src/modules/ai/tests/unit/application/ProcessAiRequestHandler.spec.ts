import { ProcessAiRequestHandler } from '../../../application/handlers/ProcessAiRequestHandler';
import { IAiGateway, IAiRequest } from '../../../domain/interfaces/IAiGateway';
import { ProcessAiRequestCommand } from '../../../application/commands/ProcessAiRequestCommand';

describe('ProcessAiRequestHandler', () => {
  it('should process request through gateway', async () => {
    const mockGateway: IAiGateway = {
      processRequest: jest.fn().mockResolvedValue({
        content: 'mocked',
        tokensUsed: 1,
        provider: 'mock'
      })
    };
    
    const handler = new ProcessAiRequestHandler(mockGateway);
    const request: IAiRequest = { prompt: 'hello' };
    const command = new ProcessAiRequestCommand(request);
    const result = await handler.handle(command);
    
    expect(result.content).toBe('mocked');
    expect(mockGateway.processRequest).toHaveBeenCalled();
  });
});
