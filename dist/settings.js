"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const PORT = process.env.PORT || 4000;
index_1.app.listen(PORT, function () { console.log(`Server was started at port ${PORT}`); });
