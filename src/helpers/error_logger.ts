import { Sentry, SentryTracing } from "../deps.ts";
import { __DEV__, NAME, SENTRY_KEY, VERSION } from "../config.ts";

// If you want to use `@sentry/tracing` in your project directly, use a named import instead:
// import * as SentryTracing from "@sentry/tracing"
// Unused named imports are not guaranteed to patch the global hub.

Sentry.init({
  // dsn: SENTRY_KEY,
  dsn: "https://13882ae12b3a449d9fff54e5ee4820d3@app.glitchtip.com/2610",
  // dsn: "https://6101df11e31d46459bdb3d399a79940f@localhost:8000/1",

  environment: Deno.env.get("NODE_ENV"),
  debug: __DEV__,

  release: `${NAME}@${VERSION}`,
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  // tracesSampleRate: 1.0,
});

class ErrorLogger {
  constructor() {}

  // TODO: Implement this
  configureScope(options: any) {
    console.log("NOT IMPLEMENTED: ErrorLogger.configureScope");
    // Sentry.configureScope((scope: Sentry.Scope) => {
    // scope.setExtra('battery', 0.7);
    // scope.setTag('user_mode', 'admin');
    // scope.setUser({ id: '4711' });
    // scope.clear();
    // });
  }

  captureException(e: Error) {
    Sentry.captureException(e);
  }
  captureEvent(event: Sentry.Event) {
    Sentry.captureEvent(event);
  }
  captureMessage(message: string) {
    Sentry.captureMessage(message);
  }
}
const errorLogger = new ErrorLogger();

export { errorLogger };
