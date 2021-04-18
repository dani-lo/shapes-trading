const tsJestPreset = require("ts-jest/jest-preset")
const jestMongoDBPreset = require("@shelf/jest-mongodb/jest-preset")

// We can get away with merging these two presets because they both operate on different config keys
// This will not always be the case if you need to combine multiple Jest presets, and you can get into
// trouble this way. Always read the source code for the presets you're combining to confirm that you
// can do this!
const preset = Object.assign(
  {},
  tsJestPreset,
  jestMongoDBPreset
)

module.exports = preset
