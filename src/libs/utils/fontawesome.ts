// fontawesome.ts
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserGroup,
  faGear,
  faRectangleList,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import Font Awesome CSS

library.add(faUserGroup, faGear, faRectangleList); // Add icons to the library

// Prevent Font Awesome from automatically adding CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
