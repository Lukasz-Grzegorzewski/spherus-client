import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import C from 'react-multi-carousel';
import { NavLink } from 'react-router-dom';
import Advert from '../advert/Advert';
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

function Section({ type, idLink, id }) {
  const Carousel = C.default ? C.default : C;
  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState(null);

  useEffect(() => {
    const getInfos = (isSection, idLinkCategorySection) => {
      axios
        .get(
          `${
            import.meta.env.VITE_URL_SPHERUS_API
          }/home/carousel/${isSection}`
        )
        .then((res) => {
          setCategory(res.data);
        })
        .catch((err) => console.error(err));
      axios
        .get(
          `${
            import.meta.env.VITE_URL_SPHERUS_API
          }/categories/${idLinkCategorySection}`
        )
        .then((res) => {
          setCategoryName(res.data);
        })
        .catch((err) => console.error(err));
    };
    if (type === 1) {
      getInfos(id, idLink);
    }
  }, [type, id, idLink]);

  return (
    <div className='section'>
      {type === 1 && category.length >= 1 && (
        <div className='section_container'>
          <div className='section_navigation'>
            <NavLink to={`/categories/${idLink}`}>
              <div className='section_name'>
                {categoryName
                  ? categoryName.name.charAt(0).toUpperCase() +
                    categoryName.name.slice(1)
                  : ''}
              </div>
            </NavLink>
            <div className='section_seeMoreBtn'>
              <NavLink to={`/categories/${idLink}`}>
                <div className='section_seeMoreBtn_btn'>See more</div>
              </NavLink>
            </div>
          </div>

          <Carousel
            containerClass='section_container_carousel'
            responsive={responsive}
            infinite
          >
            {category.map((infos) => (
              <div key={infos.id} className='section_container_carousel_card'>
                <VideoCard
                  id={infos.id}
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

      {type === 2 && (
        <div>
          <Advert id={idLink} />
        </div>
      )}
    </div>
  );
}
Section.propTypes = {
  type: PropTypes.number.isRequired,
  idLink: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};
export default Section;
