import React from 'react';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer" role="contentinfo">
      {/* Top curved decorative arc */}
      <div className="footer-arc-wrapper" aria-hidden="true">
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="footer-arc-svg">
          <path d="M0,40 Q600,0 1200,40 L1200,40 L0,40 Z" fill="#363636" />
        </svg>
      </div>

      <div className="footer-content">
        <div className="footer-main-row">
          <div className="footer-brand-col">
            <h3 className="footer-brand-title">Classic Tic-Tac-Toe</h3>
            <p className="footer-description">
              A responsive, high-performance web recreation inspired by tabletop games. Play against our 4-level AI engine or enjoy local 2-player pass & play on any device.
            </p>
          </div>

          <div className="footer-nav-col">
            <h4 className="footer-heading">Quick Links</h4>
            <nav className="footer-links-nav" aria-label="Footer links">
              <a href="#middle">Play Game</a>
              <span className="footer-sep">|</span>
              <a href="#how-to-play">How to Play</a>
              <span className="footer-sep">|</span>
              <a href="#features">Features</a>
              <span className="footer-sep">|</span>
              <a href="#rules">Rules</a>
              <span className="footer-sep">|</span>
              <a href="#history">History</a>
            </nav>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p className="copyright-text">
            © {CURRENT_YEAR} Classic Board Games • Designed for web & mobile
          </p>
        </div>
      </div>
    </footer>
  );
};
