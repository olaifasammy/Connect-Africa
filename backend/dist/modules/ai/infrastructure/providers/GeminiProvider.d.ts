import { IAiGateway, IAiRequest, IAiResponse } from '../../domain/interfaces/IAiGateway';
export declare class GeminiProvider implements IAiGateway {
    processRequest(request: IAiRequest): Promise<IAiResponse>;
}
