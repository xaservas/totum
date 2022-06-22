async function autocomplete() {
  try {
    const countryType = document.getElementById('country');
    const zipcodeType = document.getElementById('zipCode');
    const cityType = document.getElementById('city');
    const addressType = document.getElementById('address');

    const fullAddress = address.split(',');

    const testPays = fullAddress[2];
    countryType.value = testPays;

    const vildep = fullAddress[1].split(' ');

    const testZipcode = vildep[1];
    zipcodeType.value = testZipcode;

    const testCity = vildep[2];
    cityType.value = testCity;

    const testAddress = fullAddress[0];
    addressType.value = testAddress;
    console.log(typeof zipCode);
  } catch (err) {
    return { error: 'Unable to retrieve places' };
  }
}

export default autocomplete;
