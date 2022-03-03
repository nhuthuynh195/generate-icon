const { readdirSync } = require("fs");

const { generateReactNativeAsset } = require("./generators");
const { isSVG, removeExtension } = require("./utils");

const ICON_SOURCE_FOLDER = "src/assets/images/svg/icons"; // path svg image list
const FONT_FOLDER = "src/assets/fonts"; // path to store icon-font
const FONT_NAME = "lumin-icon"; // name icon-font

const icons = readdirSync(ICON_SOURCE_FOLDER)
  .filter(isSVG)
  .map(removeExtension);
try {
  generateReactNativeAsset(icons, {
    fontName: FONT_NAME,
    dir: ICON_SOURCE_FOLDER,
    fontDir: FONT_FOLDER,
  });
} catch (e) {
  console.error(e);
}
