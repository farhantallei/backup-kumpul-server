import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import app from '../app';

function errorReply(reply: FastifyReply, message: string, statusCode: number) {
  const status: {
    [statusCode: number]: void;
  } = {
    400: reply.badRequest(message),
    401: reply.unauthorized(message),
    402: reply.paymentRequired(message),
    403: reply.forbidden(message),
    404: reply.notFound(message),
    405: reply.methodNotAllowed(message),
    406: reply.notAcceptable(message),
    407: reply.proxyAuthenticationRequired(message),
    408: reply.requestTimeout(message),
    409: reply.conflict(message),
    410: reply.gone(message),
    411: reply.lengthRequired(message),
    412: reply.preconditionFailed(message),
    413: reply.payloadTooLarge(message),
    414: reply.uriTooLong(message),
    415: reply.unsupportedMediaType(message),
    416: reply.rangeNotSatisfiable(message),
    417: reply.expectationFailed(message),
    418: reply.imateapot(message),
    422: reply.unprocessableEntity(message),
    423: reply.locked(message),
    424: reply.failedDependency(message),
    426: reply.upgradeRequired(message),
    428: reply.preconditionRequired(message),
    429: reply.tooManyRequests(message),
    431: reply.requestHeaderFieldsTooLarge(message),
    451: reply.unavailableForLegalReasons(message),
    500: reply.internalServerError(message),
    501: reply.notImplemented(message),
    502: reply.badGateway(message),
    503: reply.serviceUnavailable(message),
    504: reply.gatewayTimeout(message),
    505: reply.httpVersionNotSupported(message),
    506: reply.variantAlsoNegotiates(message),
    507: reply.insufficientStorage(message),
    508: reply.loopDetected(message),
    509: reply.bandwidthLimitExceeded(message),
    510: reply.notExtended(message),
    511: reply.networkAuthenticationRequired(message),
  };

  return status[statusCode];
}

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (app.error) return reply.internalServerError(app.error.message);
  if (error.statusCode)
    return errorReply(reply, error.message, error.statusCode);
  return reply.internalServerError(error.message);
}
