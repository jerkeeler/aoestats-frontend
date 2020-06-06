import { graphql, useStaticQuery } from 'gatsby';

const useLastUpdatedTime = () => {
  const data = useStaticQuery(graphql`
    query {
      postgres {
        allDeCivilizationstats {
          nodes {
            lastUpdate
          }
        }
      }
    }
  `);
  return data.postgres.allDeCivilizationstats.nodes
    .filter((node) => node !== null)
    .map((node) => new Date(node.lastUpdate))
    .reduce((a, b) => (a > b ? a : b));
};

export default useLastUpdatedTime;
