const iec = require("iec-61131-3");

const EPlcPersistentStatus = iec.ENUM(
  {
    PS_None: 0,
    PS_All: 1,
    PS_Partial: 2,
  },
  iec.USINT
);

module.exports = EPlcPersistentStatus;
