import { Component } from 'react';

/**
 * Minimal error boundary. Renders `fallback` (default: nothing) if a child
 * throws — used to guarantee a WebGL failure in the lazy HeroCanvas can
 * never blank the hero; the CSS background simply remains.
 */
export default class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    // Decorative only — log for debugging, never surface to the user.
    if (import.meta.env.DEV) console.warn('[ErrorBoundary] caught:', error);
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}
