import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import { CURRENT_PATCH } from '../defs';
import { numberWithCommas } from '../formatting';

const Hero = () => {
  const data = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "aoestats-banner.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      teamOneMatches: postgres {
        allDeMatches(
          condition: { flagged: false, patchVal: "40220", winningTeam: 1 }
        ) {
          totalCount
        }
      }
      teamTwoMatches: postgres {
        allDeMatches(
          condition: { flagged: false, patchVal: "40220", winningTeam: 2 }
        ) {
          totalCount
        }
      }
    }
  `);

  const totalCount =
    data.teamOneMatches.allDeMatches.totalCount +
    data.teamTwoMatches.allDeMatches.totalCount;

  return (
    <div className="h-56 overflow-hidden rounded relative">
      <div
        className="h-full w-full flex flex-col justify-center relative z-10
      p-10"
      >
        <h1 className="text-6xl">aoestats</h1>
        <p className="text-xl">
          Over <u>{numberWithCommas(totalCount)}</u> DE matches on patch{' '}
          {CURRENT_PATCH} analyzed!
        </p>
      </div>
      <Img
        className="absolute top-0 left-0 h-full w-full z-0"
        fluid={data.image.childImageSharp.fluid}
        alt="image of aoe2"
        style={{ position: 'absolute' }}
      />
    </div>
  );
};

export default Hero;
