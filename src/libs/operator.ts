interface Operator {
  [provider: string]: {
    [card: string]: {
      prefix: RegExp;
      min: 10 | 11 | 12;
      max: 10 | 11 | 12 | 13;
    };
  };
}

const operator: Operator = {
  telkomsel: {
    kartuHalo: {
      prefix: /11/,
      min: 10,
      max: 11,
    },
    simPATI: {
      prefix: /1[2-3]|2[1-2]/,
      min: 12,
      max: 12,
    },
    simPATIHalo: {
      prefix: /12/,
      min: 11,
      max: 12,
    },
    kartuAS: {
      prefix: /23|5[1-3]/,
      min: 12,
      max: 12,
    },
    LOOP: {
      prefix: /22/,
      min: 11,
      max: 12,
    },
    kartuFacebook: {
      prefix: /22/,
      min: 11,
      max: 12,
    },
    byU: {
      prefix: /51/,
      min: 10,
      max: 12,
    },
  },
  indosat: {
    indosatM2: {
      prefix: /14/,
      min: 12,
      max: 12,
    },
    mentari: {
      prefix: /58/,
      min: 12,
      max: 12,
    },
    matrix: {
      prefix: /55/,
      min: 10,
      max: 10,
    },
    matrixMentari: {
      prefix: /1[5-6]/,
      min: 11,
      max: 12,
    },
    IM31: {
      prefix: /56/,
      min: 10,
      max: 12,
    },
    IM32: {
      prefix: /57/,
      min: 12,
      max: 12,
    },
  },
  xl: {
    xl1: {
      prefix: /1[7-9]|79/,
      min: 10,
      max: 12,
    },
    xl2: {
      prefix: /59|7[7-8]/,
      min: 12,
      max: 12,
    },
    axis: {
      prefix: /3[1-3]|38/,
      min: 10,
      max: 12,
    },
  },
  tri: {
    tri1: {
      prefix: /95/,
      min: 12,
      max: 13,
    },
    tri2: {
      prefix: /9[6-9]/,
      min: 11,
      max: 12,
    },
  },
  smartfren: {
    smartfren: {
      prefix: /8[1-9]/,
      min: 11,
      max: 12,
    },
  },
  net1: {
    net1: {
      prefix: /2[7-8]/,
      min: 10,
      max: 12,
    },
  },
  byru: {
    byru: {
      prefix: /68/,
      min: 10,
      max: 12,
    },
  },
};

export function phoneRegExp() {
  const prefixList: string[] = [];

  for (const provider in operator) {
    if (operator.hasOwnProperty(provider))
      for (const card in operator[provider])
        if (operator[provider].hasOwnProperty(card)) {
          const { prefix, min, max } = operator[provider][card];
          const prefixStr = `${prefix}`.split('/')[1];
          prefixList.push(`(${prefixStr})(\\d{${min - 4},${max - 4}})`);
        }
  }

  return new RegExp(`^8(${prefixList.join('|')})$`);
}
