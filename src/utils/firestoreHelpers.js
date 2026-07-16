export async function withFirestoreTimeout(promise, fallbackValue, timeoutMs = 2500) {
  let settled = false;

  const timeoutPromise = new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      if (!settled) {
        settled = true;
        resolve(fallbackValue);
      }
    }, timeoutMs);

    return timeoutId;
  });

  try {
    const result = await Promise.race([promise, timeoutPromise]);
    settled = true;
    return result;
  } catch (error) {
    settled = true;
    return fallbackValue;
  }
}
