import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios
      .get("https://brottsplatskartan.se/api/events?limit=25&app=mmITHS")
      .then((response) => {
        setEvents(response.data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const showImage = (event) => {
    setSelectedImage(event);
  };

  return (
    <>
      <h2 className='title'>Händelser</h2>
      <p className='title'>Tryck på en händelse för att visa karta</p>
      <div className='grid'>
        <div className='cardWrapper'>
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
                  <p className='date'>{event.location_string}</p>
                  <hr />
                  <p className='cardContent'>{event.content_teaser}</p>

                  <p className='date'>{event.date_human}</p>
                  <a
                    className='cardLink'
                    href={event.permalink}
                    target='_blanc'>
                    Visa Mer
                  </a>
                </div>
              ))
            )}
          </ul>
        </div>
        <div className='mapwrap'>
          {selectedImage && (
            <>
              <div className='mapContainer'>
                <p>{selectedImage.description}</p>
                <img
                  className='eventImage'
                  src={selectedImage.image}
                  alt='Karta på händelse'></img>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default Home;
