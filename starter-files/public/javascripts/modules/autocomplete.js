function autoComplete(input, latInput, lngInput) {
  console.log(input, latInput, lngInput);
  if(!input) return; // if no address beat it punk
  const dropdown = new google.maps.places.Autocomplete(input);

  dropdown.addListener('place_changed', () => {
    const place = dropdown.getPlace();
    latInput.value = place.geometry.location.lat();
    lngInput.value = place.geometry.location.lng();
  });

  input.on('keydown', (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  });
}

export default autoComplete;
