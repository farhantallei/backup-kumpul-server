import type {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteShorthandOptionsWithHandler,
} from 'fastify';
import type { RouteGenericInterface } from 'fastify/types/route';

export type RSOWH<
  RouteGeneric extends RouteGenericInterface = RouteGenericInterface
> = RouteShorthandOptionsWithHandler<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  RouteGeneric
>;
