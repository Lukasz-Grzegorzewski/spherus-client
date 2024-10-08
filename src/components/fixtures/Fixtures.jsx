import axios from 'axios';
import React, { useState, useEffect } from 'react';
import C from 'react-multi-carousel';
import VideoCard from '../category_video/VideoCard';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  desktopB: {
    breakpoint: { max: 4000, min: 1500 },
    items: 4,
    slidesToSlide: 2,
  },
  desktopS: {
    breakpoint: { max: 1500, min: 1100 },
    items: 3,
    slidesToSlide: 2,
  },
  tablet: {
    breakpoint: { max: 1100, min: 750 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 750, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

function Fixtures() {
  const Carousel = C.default ? C.default : C;

  const [fixtures, setFixtures] = useState([]);
  const [displayFixtures, setDisplayFixtures] = useState({});

  useEffect(() => {
    const getInfos = () => {
      axios
        .get(`${import.meta.env.VITE_URL_SPHERUS_API}/api/fixtures`)
        .then((res) => {
          console.log("Data in Fixtures : getInfos", typeof res.data, res.data);
          setFixtures(res.data);
        })
        .catch((err) => console.error(err));
    };

    const getFixturesName = () => {
      axios
        .get(`${import.meta.env.VITE_URL_SPHERUS_API}/api/display_fixtures`)
        .then((res) => {
          console.log("Data in heroSlider : getFixturesName ", typeof res.data, res.data);
          setDisplayFixtures(res.data)
        })
        .catch((err) => console.error(err));
    };
    getInfos();
    getFixturesName();
  }, []);

  return (
    <div className='section_container'>
      {fixtures.length >= 1 && (
        <div>
          <div className='section_navigation'>
            {fixtures.length !== 0 && (
              <div className='section_name'>{displayFixtures.name}</div>
            )}
          </div>

          <Carousel
            containerClass='section_carousel'
            responsive={responsive}
            infinite
          >
            {fixtures.map((infos) => (
              <div className='section_card' key={infos.id}>
                <VideoCard
                  id={infos.fk_fix_video_id}
                  url={infos.url}
                  title={infos.title}
                  description={infos.description}
                  display={infos.display}
                />
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
}

export default Fixtures;
