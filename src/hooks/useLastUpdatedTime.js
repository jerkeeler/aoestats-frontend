import { graphql, useStaticQuery } from 'gatsby';

const useLastUpdatedTime = () => {
  const data = useStaticQuery(graphql`
    query {
      postgres {
        allDeLadderstats {
          nodes {
            lastUpdate
          }
        }
      }
    }
  `);
  return data.postgres.allDeLadderstats.nodes
    .filter((node) => node !== null)
    .map((node) => new Date(node.lastUpdate))
    .reduce((a, b) => (a > b ? a : b));
};

export default useLastUpdatedTime;
