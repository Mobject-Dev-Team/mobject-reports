const iec = require("iec-61131-3");

const TaskSystemInfoStructure = iec.STRUCT({
  CycleTime: iec.UDINT,
  Priority: iec.UINT,
  AdsPort: iec.UINT,
  CycleCount: iec.UDINT,
  DcTaskTime: iec.LINT,
  LastExecTime: iec.UDINT,
  FirstCycle: iec.BOOL,
  CycleTimeExceeded: iec.BOOL,
  InCallAfterOutputUpdate: iec.BOOL,
  RTViolation: iec.BOOL,
  TaskName: iec.STRING(63),
});

module.exports = TaskSystemInfoStructure;
