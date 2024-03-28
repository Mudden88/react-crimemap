import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    setTimeout(() => {
      axios
        .get("https://brottsplatskartan.se/api/events?limit=25&app=mmITHS")
        .then((response) => {
          setEvents(response.data.data);
        })
        .then(() => {
          setLoading(false);
        });
    }, 2000);
  }

  const showImage = (event) => {
    setSelectedImage(event);
  };

  function closeImage() {
    setSelectedImage(null);
  }

  return (
    <>
      <div className='grid'>
        <div className='cardWrapper'>
          <h2 className='title'>Händelser</h2>
          <hr />
          <p className='title'>Tryck på en händelse för att visa karta</p>

          <ul>
            {loading ? (
              <p>Laddar händelser..</p>
            ) : (
              events.map((event) => (
                <div
                  key={event.id}
                  className='eventCard'
                  onClick={() => showImage(event)}>
                  <h4> {event.description} </h4>
                  <p className='date'>
                    {event.location_string} <br /> {event.date_human}
                  </p>
                  <hr />
                  <p className='cardContent'>{event.content_teaser}</p>

                  <a
                    className='cardLink'
                    href={event.permalink}
                    target='_blanc'>
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
              <div className='mapWrapper'>
                <div className='mapContainer'>
                  <p>{selectedImage.description}</p>
                  <img
                    className='eventImage'
                    src={selectedImage.image}
                    alt='Karta på händelse'
                    onClick={closeImage}></img>
                  <p>Tryck på kartan för att stänga</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default Home;
