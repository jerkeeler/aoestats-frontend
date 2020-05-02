import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import { Civs } from '../data';

const CivImage = ({ className = '', civId, uniqueUnit = false }) => {
  const data = useStaticQuery(graphql`
    query {
      units: allFile(filter: { relativeDirectory: { eq: "units" } }) {
        nodes {
          name
          childImageSharp {
            fluid(maxWidth: 200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      crests: allFile(filter: { relativeDirectory: { eq: "civ_crests" } }) {
        nodes {
          name
          childImageSharp {
            fluid(maxWidth: 200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `);

  const civInfo = Civs[civId];
  const uuImgsByName = {};
  const crestsByName = {};
  data.units.nodes.map((node) => (uuImgsByName[node.name] = node));
  data.crests.nodes.map((node) => (crestsByName[node.name] = node));

  const fluid = uniqueUnit
    ? uuImgsByName[civInfo.uniqueUnit]
    : crestsByName[civInfo.name];
  const alt = uniqueUnit ? civInfo.uniqueUnit : civInfo.name;
  return (
    <Img className={className} fluid={fluid.childImageSharp.fluid} alt={alt} />
  );
};

CivImage.propTypes = {
  className: PropTypes.string,
  civId: PropTypes.number.isRequired,
};

export default CivImage;
