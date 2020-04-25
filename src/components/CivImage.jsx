import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import { Civs } from '../data';
import Img from 'gatsby-image';

const CivImage = ({ className = '', civId }) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { relativeDirectory: { eq: "units" } }) {
        edges {
          node {
            name
            childImageSharp {
              fluid(maxWidth: 200) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);

  const civInfo = Civs[civId];
  const imagesByName = {};
  data.allFile.edges.map((node) => (imagesByName[node.node.name] = node.node));

  return (
    <Img
      className={className}
      fluid={imagesByName[civInfo.uniqueUnit].childImageSharp.fluid}
      alt={civInfo.uniqueUnit}
    />
  );
};

CivImage.propTypes = {
  className: PropTypes.string,
  civId: PropTypes.number.isRequired,
};

export default CivImage;
