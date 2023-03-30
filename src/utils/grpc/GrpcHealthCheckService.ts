import { sendUnaryData, ServerUnaryCall, ServerWritableStream } from '@grpc/grpc-js';
import { IHealthServer } from '../../protos/healthcheck_grpc_pb';
import {
  HealthCheckRequest,
  HealthCheckResponse,
} from '../../protos/healthcheck_pb';

export default abstract class GrpcHealthCheckService implements IHealthServer {
  public async check(
    call: ServerUnaryCall<HealthCheckRequest, HealthCheckResponse>,
    callback: sendUnaryData<HealthCheckResponse>,
  ): Promise<void> {
    let error = null;
    const result = new HealthCheckResponse();

    try {
      result.setStatus(await this.healthCheck(call.request));
    } catch (exception) {
      error = exception;

      result.setStatus(HealthCheckResponse.ServingStatus.NOT_SERVING);
    }

    return callback(error, result);
  }

  // You have to implement this method in your service
  // where you going to use health check
  abstract healthCheck(
    request: HealthCheckRequest,
  ): Promise<HealthCheckResponse.ServingStatus>;

  // TODO: This method doesn't support in the current implementation
  // Now it's just a stub method
  watch(call: ServerWritableStream<HealthCheckRequest, HealthCheckResponse>): Promise<void> {
    return null;
  }
}
