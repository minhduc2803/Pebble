export const tranformObjectKeys = (object, method) => {
  if (Array.isArray(object)) {
    return object.map(value => tranformObjectKeys(value, method));
  }
  if (typeof object === 'object') {
    const entries = Object.entries(object);
    return Object.fromEntries(entries.map(transfromEntry));
  }
  return object;

  function transfromEntry([k, v]) {
    return [
      method(k),
      typeof v === 'object' ? tranformObjectKeys(v, method) : v,
    ];
  }
};
