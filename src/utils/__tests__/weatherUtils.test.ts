import { getWeatherIcon, getWindDirection, formatTemp } from "../weatherUtils";

describe("weatherUtils", () => {
  describe("getWeatherIcon", () => {
    test("returns sun icon for clear weather", () => {
      expect(getWeatherIcon(0)).toBe("☀️");
      expect(getWeatherIcon(1)).toBe("🌤️");
    });

    test("returns cloud icon for cloudy weather", () => {
      expect(getWeatherIcon(2)).toBe("⛅");
      expect(getWeatherIcon(3)).toBe("☁️");
    });

    test("returns rain icon for rainy weather", () => {
      expect(getWeatherIcon(61)).toBe("🌧️");
      expect(getWeatherIcon(63)).toBe("🌧️");
    });

    test("returns snow icon for snowy weather", () => {
      expect(getWeatherIcon(71)).toBe("🌨️");
      expect(getWeatherIcon(73)).toBe("🌨️");
    });
  });

  describe("getWindDirection", () => {
    test("returns correct direction for cardinal points", () => {
      expect(getWindDirection(0)).toBe("N");
      expect(getWindDirection(90)).toBe("E");
      expect(getWindDirection(180)).toBe("S");
      expect(getWindDirection(270)).toBe("W");
    });

    test("returns correct direction for intermediate points", () => {
      expect(getWindDirection(45)).toBe("NE");
      expect(getWindDirection(135)).toBe("SE");
      expect(getWindDirection(225)).toBe("SW");
      expect(getWindDirection(315)).toBe("NW");
    });
  });

  describe("formatTemp", () => {
    test("formats temperature with degree symbol", () => {
      expect(formatTemp(20)).toBe("20°C");
      expect(formatTemp(-5)).toBe("-5°C");
      expect(formatTemp(0)).toBe("0°C");
    });
  });
});
