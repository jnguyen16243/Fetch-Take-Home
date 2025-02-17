import {sanitizeCity, sanitizeFrom,sanitizeGeoBoundingBox,sanitizeSize,sanitizeStates} from "../src/middleware/validateLocationSearchBody"
  
  describe("Validator Helper Functions", () => {
    test("sanitizeCity should return a string or default to ''", () => {
      expect(sanitizeCity("Phoenix")).toBe("Phoenix");
      expect(sanitizeCity(123)).toBe("");
      expect(sanitizeCity(undefined)).toBe("");
    });
  
    test("sanitizeStates should return a valid array of 2-letter codes or default to []", () => {
      expect(sanitizeStates(["AZ", "CA"])).toEqual(["AZ", "CA"]);
      expect(sanitizeStates(["AZ", "INVALID"])).toEqual([]);
      expect(sanitizeStates(123)).toEqual([]);
      expect(sanitizeStates(undefined)).toEqual([]);
    });
  
    test("sanitizeGeoBoundingBox should remove invalid keys and ensure a valid format", () => {
      const validGeo = {
        bottom_left: { lat: 33.4, lon: -112.0 },
        top_right: { lat: 34.0, lon: -111.0 }
      };
      expect(sanitizeGeoBoundingBox(validGeo)).toEqual(validGeo);
  
      const invalidGeo = {
        top: { lat: "invalid", lon: 40 },
        random_key: { lat: 32, lon: -110 }
      };
      expect(sanitizeGeoBoundingBox(invalidGeo)).toBeUndefined();
  
      expect(sanitizeGeoBoundingBox(undefined)).toBeUndefined();
    });
  
    test("sanitizeSize should return a positive number or undefined", () => {
      expect(sanitizeSize(10)).toBe(10);
      expect(sanitizeSize(-5)).toBeUndefined();
      expect(sanitizeSize("string")).toBeUndefined();
    });
  
    test("sanitizeFrom should return a number or undefined", () => {
      expect(sanitizeFrom(0)).toBe(0);
      expect(sanitizeFrom(5)).toBe(5);
      expect(sanitizeFrom("not-a-number")).toBeUndefined();
    });
  });
  