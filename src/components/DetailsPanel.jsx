/* eslint-disable react/prop-types */

const DetailsPanel = ({ node }) => {
  return (
    <div style={{ padding: "20px", border: "1px solid black", width: "300px" }}>
      <h2>{node.name}</h2>
      <p>Father: {node.father}</p>
      <p>Address: {node.address}</p>
      <p>Description: {node.description}</p>
      <img src={node.image} alt={node.name} style={{ width: "100px" }} />
    </div>
  );
};

export default DetailsPanel;
