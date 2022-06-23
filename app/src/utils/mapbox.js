async function mapbox(text) {
  try {
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=pk.eyJ1Ijoia2Vubnk2NjYwMCIsImEiOiJjbDRoM2RmbHgwN25lM3F1bHd0OW1razcwIn0.LrHfc7GGQxyWDBbKtTBKgQ&cachebuster=1625641871908&autocomplete=true&types=address`,
    );

    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  } catch (err) {
    return { error: 'Unable to retrieve places' };
  }
}

export default mapbox;
