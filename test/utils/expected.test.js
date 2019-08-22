const { calculateExpectedValue } = require('@/utils/expected')

describe('calculateExpectedValue', () => {
  describe('result', () => {
    it('should be correct', () => {
      expect(calculateExpectedValue(200, 0)).toBe(200)
      expect(calculateExpectedValue(300, 0)).toBe(300)
      expect(calculateExpectedValue(200, 50)).toBe(225)
      expect(calculateExpectedValue(200, 100)).toBe(250)
      expect(calculateExpectedValue(200, -100)).toBe(150)
      expect(calculateExpectedValue(200, 100, 1.4)).toBe(280)
    })
  })

  describe('validation', () => {
    it('attack = -1 is invalid', () => {
      expect(() => {
        calculateExpectedValue(-1, 0, 1.25)
      }).toThrow()
    })

    it('critical = -150 is invalid', () => {
      expect(() => {
        calculateExpectedValue(200, -150, 1.25)
      }).toThrow()
    })

    it('critical = 150 is invalid', () => {
      expect(() => {
        calculateExpectedValue(200, 150, 1.25)
      }).toThrow()
    })

    it('criticalRate = 1.5 is invalid', () => {
      expect(() => {
        calculateExpectedValue(200, 0, 1.5)
      }).toThrow()
    })
  })
})
