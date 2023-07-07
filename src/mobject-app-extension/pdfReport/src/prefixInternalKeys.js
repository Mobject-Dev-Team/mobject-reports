function prefixInternalKeys(object) {
  const result = {};

  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      result["$" + key] = object[key];
    }
  }

  return result;
}

module.exports = prefixInternalKeys;
