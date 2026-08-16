import React from 'react';

/**
 * Recursive brace-matching helper for nested LaTeX tags like \frac{\sqrt{3}}{2}
 */
function getBracedContent(str, startIdx) {
  if (str[startIdx] !== '{') return null;
  let depth = 0;
  for (let i = startIdx; i < str.length; i++) {
    if (str[i] === '{') depth++;
    else if (str[i] === '}') {
      depth--;
      if (depth === 0) {
        return {
          content: str.substring(startIdx + 1, i),
          endIdx: i
        };
      }
    }
  }
  return null;
}

/**
 * Helper to parse superscripts (x^2, x²), subscripts (x_1), unicode powers and symbols
 */
function parseSubSupAndSymbols(str, keyPrefix = 'sub') {
  if (!str) return [];

  // Replace standalone unicode square roots or \sqrt without braces if any
  let formatted = str.replace(/\\sqrt(?![{])/g, '√');

  const regex = /(\^\{[^{}]+\}|\^[0-9a-zA-Z°]+|\_\{[^{}]+\}|\_[0-9a-zA-Z]+|[²³⁴⁵⁶⁷⁸⁹⁰]+|[₁₂₃₄₅₆₇₈₉₀]+)/g;

  const tokens = [];
  let lastIdx = 0;
  let m;

  while ((m = regex.exec(formatted)) !== null) {
    if (m.index > lastIdx) {
      tokens.push(formatted.substring(lastIdx, m.index));
    }

    const val = m[0];
    if (val.startsWith('^')) {
      const exponent = val.startsWith('^{') ? val.slice(2, -1) : val.slice(1);
      tokens.push(<sup key={`sup-${keyPrefix}-${m.index}`} className="math-sup">{exponent}</sup>);
    } else if (val.startsWith('_')) {
      const sub = val.startsWith('_{') ? val.slice(2, -1) : val.slice(1);
      tokens.push(<sub key={`sub-${keyPrefix}-${m.index}`} className="math-sub">{sub}</sub>);
    } else if (['²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹', '⁰'].includes(val)) {
      const superscriptMap = { '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁰': '0' };
      tokens.push(<sup key={`sup-u-${keyPrefix}-${m.index}`} className="math-sup">{superscriptMap[val]}</sup>);
    } else {
      tokens.push(val);
    }

    lastIdx = regex.lastIndex;
  }

  if (lastIdx < formatted.length) {
    tokens.push(formatted.substring(lastIdx));
  }

  return tokens;
}

/**
 * Recursive Math AST parser supporting nested \frac{}{} and \sqrt{}
 */
function parseMathNodes(str, keyPrefix = 'm') {
  if (!str) return [];
  const nodes = [];
  let i = 0;
  let textBuffer = '';

  const flushText = () => {
    if (textBuffer) {
      nodes.push(...parseSubSupAndSymbols(textBuffer, `${keyPrefix}-${nodes.length}`));
      textBuffer = '';
    }
  };

  while (i < str.length) {
    // 1. Check for \frac{num}{den}
    if (str.startsWith('\\frac', i)) {
      const numStart = i + 5;
      if (numStart < str.length && str[numStart] === '{') {
        const numRes = getBracedContent(str, numStart);
        if (numRes && numRes.endIdx + 1 < str.length && str[numRes.endIdx + 1] === '{') {
          const denRes = getBracedContent(str, numRes.endIdx + 1);
          if (denRes) {
            flushText();
            nodes.push(
              <span key={`frac-${keyPrefix}-${i}`} className="math-fraction">
                <span className="math-numerator">
                  {parseMathNodes(numRes.content, `${keyPrefix}-n-${i}`)}
                </span>
                <span className="math-denominator">
                  {parseMathNodes(denRes.content, `${keyPrefix}-d-${i}`)}
                </span>
              </span>
            );
            i = denRes.endIdx + 1;
            continue;
          }
        }
      }
    }

    // 2. Check for \sqrt{content}
    if (str.startsWith('\\sqrt', i)) {
      const sqrtStart = i + 5;
      if (sqrtStart < str.length && str[sqrtStart] === '{') {
        const sqrtRes = getBracedContent(str, sqrtStart);
        if (sqrtRes) {
          flushText();
          nodes.push(
            <span key={`sqrt-${keyPrefix}-${i}`} className="math-sqrt">
              <span className="math-sqrt-symbol">√</span>
              <span className="math-sqrt-content">
                {parseMathNodes(sqrtRes.content, `${keyPrefix}-s-${i}`)}
              </span>
            </span>
          );
          i = sqrtRes.endIdx + 1;
          continue;
        }
      }
    }

    textBuffer += str[i];
    i++;
  }

  flushText();
  return nodes;
}

export default function MathRenderer({ text = '', style = {}, className = '' }) {
  if (!text || typeof text !== 'string') {
    return <span style={style} className={className}>{text}</span>;
  }

  return (
    <span style={{ display: 'inline', ...style }} className={`math-text-container ${className}`}>
      {parseMathNodes(text)}
    </span>
  );
}
