import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserName from "./UserName";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const options = [
    { value: "Göteborg", label: "Göteborg" },
    { value: "Stockholm", label: "Stockholm" },
    { value: "Malmö", label: "Malmö" },
    { value: "Jönköping", label: "Jönköping" },
    { value: "Uppsala", label: "Uppsala" },
    { value: "Kiruna", label: "Kiruna" },
    { value: "Helsingborg", label: "Helsingborg" },
    { value: "Arvika", label: "Arvika" },
    { value: "Bollnäs", label: "Bollnäs" },
    { value: "Karlstad", label: "Karlstad" },
    { value: "Åmål", label: "Åmål" },
    { value: "Mölndal", label: "Mölndal" },
    { value: "Gotland", label: "Gotland" },
    { value: "Öland", label: "Öland" },
    { value: "Reftele", label: "Gislaved" },
  ];

  options.sort((a, b) => a.label.localeCompare(b.label, "sv"));

  const { city } = useParams();

  useEffect(() => {
    if (city) {
      setSelectedCity(city);
      fetchEvents(city);
    } else {
      axios
        .get("https://brottsplatskartan.se/api/events?limit=25&app=mmITHS")
        .then((response) => {
          setEvents(response.data.data);
        })
        .then(() => {
          setLoading(false);
        });
    }
  }, [city]);

  const showImage = (event) => {
    setSelectedImage(event);
  };

  function closeImage() {
    setSelectedImage(null);
  }

  function fetchEvents(city) {
    setLoading(true);
    const area = city ? encodeURIComponent(city) : "";
    axios
      .get(`https://brottsplatskartan.se/api/events/?location=${area}`)
      .then((response) => {
        setEvents(response.data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
    fetchEvents(selectedCity);
  };
  const user = "";
  return (
    <>
      <div className='grid'>
        <div className='search'>
          <h2 className='title'>Sök Efter Stad</h2>
          <p>
            Välj en stad i rullgardingsmenyn eller använd adressfältet för att
            skriva in stad
          </p>
          <UserName initialUser={user} />
          <select value={selectedCity || ""} onChange={handleCityChange}>
            <option label='Välj en stad' disabled value={null} />
            {options.map((option, index) => (
              <option value={option.value} key={index}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className='cardWrapper'>
          <ul>
            {loading ? (
              <p>Laddar händelser...</p>
            ) : (
              events.map((event) => (
                <div
                  key={event.id}
                  className='eventCard'
                  onClick={() => showImage(event)}>
                  <h4>{event.description}</h4>
                  <p className='date'>
                    {event.location_string} <br /> {event.date_human}
                  </p>
                  <hr />
                  <p className='cardContent'>{event.content_teaser}</p>
                  <a
                    href={event.permalink}
                    target='_blanc'
                    className='cardLink'>
                    Visa mer...
                  </a>
                </div>
              ))
            )}
          </ul>
        </div>
        <div>
          {selectedImage && (
            <>
              <div className='mapContainer'>
                <p>{selectedImage.location_string}</p>
                <img
                  className='eventImage'
                  src={selectedImage.image}
                  alt={selectedImage.description}
                  onClick={closeImage}
                />
                <p>Tryck på kartan för att stänga</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default Events;
