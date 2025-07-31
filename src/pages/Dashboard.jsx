const Dashboard = () => {
  const TextField = ({placeholder,type}) => {
    return (
      <div className="p-3">
        <input
          type={type}
          className="form-control"
          placeholder={placeholder}
          aria-label="Search"
        />
      </div>
    );
  };

  const Form = () => {
    return (
      <div>
        <form>
          <div className="row">
            <div className="col-12">
              <TextField placeholder="Brand Name" type="text" />
            </div>
            <div className="col-12">
              <TextField placeholder="Description" type="text" />
            </div>
            <div className="col-12">
              <TextField placeholder="Price" type="number" />
            </div>
            <div className="col-12">
              <TextField placeholder="Image" type="file" />
            </div>
          </div>
        </form>
      </div>
    );
  };

  return (
    <>
      <div className="container mt-5">
        <div className="card col-8 mx-auto">
          <div className="card-header">
            <h1 className="text-center card-title">Dashboard</h1>
          </div>
          <div className="card-body">
            <Form />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
