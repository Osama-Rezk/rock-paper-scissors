import React, { PropsWithChildren } from "react";
import {
  ErrorBoundary as ReactErrorBoundary,
  FallbackProps,
} from "react-error-boundary";

import { Button } from "../button";

function GeneralPageErrorFallback(props: FallbackProps) {
  const { error, resetErrorBoundary } = props;
  return (
    <div>
      <h1>Some thing bad , Try refreshing the app.</h1>
      <h1>{error?.message}</h1>
      <Button onClick={resetErrorBoundary}>Reset</Button>
    </div>
  );
}

interface ErrorBoundaryProps extends PropsWithChildren<{}> {
  fallbackComponent?: React.ComponentType<FallbackProps>;
}

export function ErrorBoundary(props: ErrorBoundaryProps) {
  const {
    children,
    fallbackComponent = GeneralPageErrorFallback,
    ...rest
  } = props;

  const onError = (
    error: Error,
    info: {
      componentStack: string;
    }
  ) => {
    //talk to error logger service
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={fallbackComponent}
      onError={onError}
      {...rest}
    >
      {children}
    </ReactErrorBoundary>
  );
}
