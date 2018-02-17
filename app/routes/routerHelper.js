function ObjectValues(obj) {
  const keys = Object.keys(obj);
  const vals = [];
  for (let i = 0; i < keys.length; i += 1) {
    if (Object.prototype.hasOwnProperty.call(obj, keys[i])) {
      vals.push(obj[keys[i]]);
    }
  }
  return vals;
}

module.exports.ObjectValues = ObjectValues;
