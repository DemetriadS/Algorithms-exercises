module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Use ts-jest for transforming TypeScript files
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
