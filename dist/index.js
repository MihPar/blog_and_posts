"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const settings_1 = require("./settings");
const app = (0, settings_1.startApp)();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => { console.log(`Server was started at port ${PORT}`); });
