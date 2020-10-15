export default function(testFn, error) {
  return function() {
    const result = !!testFn.apply(null, arguments);

    if (result) return { result };

    return { result, error };
  };
};