const validateAttack = (attack) => {
  return attack > 0
}

const validateCritical = (critical) => {
  return critical >= -100 && critical <= 100
}

const validateCriticalRate = (criticalRate) => {
  return [1.25, 1.3, 1.35, 1.4].includes(criticalRate)
}

export function calculateExpectedValue(attack, critical, criticalRate = 1.25) {
  if (!validateAttack(attack)) {
    throw new Error('attack is invalid.')
  }

  if (!validateCritical(critical)) {
    throw new Error('critical is invalid.')
  }

  if (!validateCriticalRate(criticalRate)) {
    throw new Error('criticalRate is invalid.')
  }

  const p = critical / 100
  if (p > 0) {
    return attack * (criticalRate * p + 1 - p)
  } else {
    return attack * (0.75 * -p + 1 + p)
  }
}
