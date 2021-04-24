"use strict";

var _tsyringe = require("tsyringe");

var _DayjsDateProvider = require("./implementations/DayjsDateProvider");

_tsyringe.container.registerSingleton("DayjsDateProvaider", _DayjsDateProvider.DayjsDateProvaider);