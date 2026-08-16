import React from 'react';

/**
 * MathRenderer component for rendering rich mathematical equations,
 * fractions, powers/exponents, square roots, subscripts, and symbols.
 */
export default function MathRenderer({ text = '', style = {}, className = '' }) {
  if (!text || typeof text !== 'string') {
    return <span style={style} className={className}>{text}</span>;
  }

  // Parse fractions \frac{num}{den}
  const renderFormattedText = (str) => {
    // Replace \frac{a}{b} with fraction structure
    const fracRegex = /\\frac\{([^{}]+)\}\{([^{}]+)\}/g;
    let parts = [];
    let lastIndex = 0;
    let match;

    while ((match = fracRegex.exec(str)) !== null) {
      if (match.index > lastIndex) {
        parts.push(str.substring(lastIndex, match.index));
      }

      const num = match[1];
      const den = match[2];

      parts.push(
        <span key={`frac-${match.index}`} className="math-fraction">
          <span className="math-numerator">{parseSubSup(num)}</span>
          <span className="math-denominator">{parseSubSup(den)}</span>
        </span>
      );

      lastIndex = fracRegex.lastIndex;
    }

    if (lastIndex < str.length) {
      parts.push(str.substring(lastIndex));
    }

    // If no \frac matched, parse sub/sup on the whole string
    if (parts.length === 0) {
      return parseSubSup(str);
    }

    return parts.map((part, i) => {
      if (typeof part === 'string') {
        return <React.Fragment key={i}>{parseSubSup(part)}</React.Fragment>;
      }
      return part;
    });
  };

  // Helper to parse superscripts (x^2, x²), subscripts (x_1), square roots (\sqrt{3}, √3)
  const parseSubSup = (str) => {
    if (!str) return '';

    // Replace square roots \sqrt{x}
    const sqrtRegex = /\\sqrt\{([^{}]+)\}/g;
    let textWithSqrt = str.replace(sqrtRegex, '√($1)');

    // Tokenize superscripts x^(2) or x^2 or unicode ² ³ ⁴
    // Tokenize subscripts x_(1) or x_1
    const regex = /(\^\{[^{}]+\}|\^[0-9a-zA-Z°]+|\_\{[^{}]+\}|\_[0-9a-zA-Z]+|[²³⁴⁵⁶⁷⁸⁹⁰]+|[₁₂₃₄₅₆₇₈₉₀]+)/g;

    const tokens = [];
    let lastIdx = 0;
    let m;

    while ((m = regex.exec(textWithSqrt)) !== null) {
      if (m.index > lastIdx) {
        tokens.push(textWithSqrt.substring(lastIdx, m.index));
      }

      const val = m[0];
      if (val.startsWith('^')) {
        const exponent = val.startsWith('^{') ? val.slice(2, -1) : val.slice(1);
        tokens.push(<sup key={`sup-${m.index}`} className="math-sup">{exponent}</sup>);
      } else if (val.startsWith('_')) {
        const sub = val.startsWith('_{') ? val.slice(2, -1) : val.slice(1);
        tokens.push(<sub key={`sub-${m.index}`} className="math-sub">{sub}</sub>);
      } else if (['²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹', '⁰'].includes(val)) {
        const superscriptMap = { '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁰': '0' };
        tokens.push(<sup key={`sup-u-${m.index}`} className="math-sup">{superscriptMap[val]}</sup>);
      } else {
        tokens.push(val);
      }

      lastIdx = regex.lastIndex;
    }

    if (lastIdx < textWithSqrt.length) {
      tokens.push(textWithSqrt.substring(lastIdx));
    }

    return tokens;
  };

  return (
    <span style={{ display: 'inline', ...style }} className={`math-text-container ${className}`}>
      {renderFormattedText(text)}
    </span>
  );
}
