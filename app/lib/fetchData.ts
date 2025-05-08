let cachedData: any = null;
let lastFetchTime = 0;
const TWO_DAYS = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds

function getNextScheduledFetchTime(lastFetch: number): number {
  const now = new Date();
  let baseDate: Date;

  if (lastFetch) {
    baseDate = new Date(lastFetch);
  } else {
    baseDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 4, 30, 0, 0);
  }

  // Normalize baseDate to 04:30
  baseDate.setHours(4, 30, 0, 0);

  if (lastFetch === 0 || baseDate.getTime() > now.getTime()) {
    baseDate = new Date(baseDate.getTime() - TWO_DAYS);
  }

  return baseDate.getTime() + TWO_DAYS;
}

export async function fetchDataWithCache() {
  const currentTime = Date.now();

  if (cachedData) {
    const nextFetchTime = getNextScheduledFetchTime(lastFetchTime);
    if (currentTime < nextFetchTime) {
      return cachedData;
    }
  }

  try {
    const response = await fetch("https://a.cewe.pro/data.json");
    cachedData = await response.json();
    lastFetchTime = currentTime;
    return cachedData;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw new Error("Failed to fetch data");
  }
}
