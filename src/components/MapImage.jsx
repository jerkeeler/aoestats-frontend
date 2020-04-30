import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import { Maps } from '../data';
import Img from 'gatsby-image';

const MapImage = ({ className = '', mapNum }) => {
  const data = useStaticQuery(graphql`
    query {
      maps: allFile(filter: { relativeDirectory: { eq: "maps" } }) {
        nodes {
          name
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `);

  const mapInfo = Maps[mapNum];
  const imgsByName = {};
  data.maps.nodes.map((node) => (imgsByName[node.name] = node));

  return (
    <Img
      className={className}
      fluid={imgsByName[mapInfo.name].childImageSharp.fluid}
      alt={mapInfo.displayName}
    />
  );
};

MapImage.propTypes = {
  className: PropTypes.string,
  mapNum: PropTypes.number.isRequired,
};

export default MapImage;
