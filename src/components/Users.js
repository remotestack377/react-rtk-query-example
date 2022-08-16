import React from "react";
import { useGetUsersQuery, useDeleteUserMutation } from "../features/dataSlice";

const Card = ({ data }) => {
  const [deleteUser] = useDeleteUserMutation();

  return (
    <div className="col-lg-12 mb-2" key={data.id}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{data.name}</h5>
          <p className="card-text">{data.email}</p>
          <button
            onClick={() => deleteUser(data.id)}
            className="btn btn-sm btn-outline-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

function Users() {
  const { data, isLoading, isSuccess, isError, error } = useGetUsersQuery({
    refetchOnMountOrArgChange: true,
  });

  let userData;

  if (isLoading) {
    userData = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else if (isSuccess) {
    userData = data.map((res) => {
      return <Card data={res} key={res.id} />;
    });
  } else if (isError) {
    userData = <div className="alert alert-danger">{error}</div>;
  }

  return <div>{userData}</div>;
}

export default Users;
