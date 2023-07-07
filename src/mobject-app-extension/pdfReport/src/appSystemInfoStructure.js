const iec = require("iec-61131-3");
const EPlcPersistentStatus = require("./ePlcPersistentStatus");

const AppSystemInfoStructure = iec.STRUCT({
  TaskCnt: iec.UDINT,
  OnlineChangeCnt: iec.UDINT,
  Flags: iec.DWORD,
  AdsPort: iec.UINT,
  BootDataLoaded: iec.BOOL,
  OldBootData: iec.BOOL,
  AppTimestamp: iec.DT,
  KeepOutputsOnBP: iec.BOOL,
  ShutdownInProgress: iec.BOOL,
  LicensesPending: iec.BOOL,
  BSODOccured: iec.BOOL,
  LoggedIn: iec.BOOL,
  AppName: iec.STRING(63),
  ProjectName: iec.STRING(63),
  PersistentStatus: EPlcPersistentStatus,
});

module.exports = AppSystemInfoStructure;
