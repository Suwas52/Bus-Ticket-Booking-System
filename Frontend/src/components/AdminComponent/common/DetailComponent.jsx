import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DetailComponent = ({data, config }) => {
//   const { id } = useParams();
  const navigate = useNavigate();

//   const item = data.find(item => item.id === parseInt(id)); // Use the appropriate key like item.busId or item.routeId

//   if (!item) {
//     return <div>Item not found</div>;
//   }



  return (
    <div className="detailContainer m-4">
      <h3 className="title">{config.title} Details</h3>
      <div className="card">
        <div className="card-body custom-div">
          {config.fields.map(({ field, label }) => (
            <p key={field} className="card-text">
              <strong>{label}:</strong> {data[field]}
            </p>
          ))}
          <div className="btn btn-primary mt-3" onClick={() => navigate(-1)}>
            Back to List
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailComponent;
