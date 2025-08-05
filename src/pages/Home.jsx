import { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/products/getAll"
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Fail to load products");
        }
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const searchProducts = products.filter((product) => {
    const query = searchTerm.toLowerCase();
    return (
      product.title.toLowerCase().includes(searchTerm.toLowerCase(query)) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase(query)) ||
      product.price.toString().toLowerCase().includes(searchTerm.toLowerCase(query))
    );
  });

  const ItemImage = ({ img }) => {
    console.log(img);
    return (
      <img
        src={`http://localhost:5000${img}`}
        className="card-img-top"
        alt="..."
      ></img>
    );
  };

  const Title = ({ title }) => {
    return <h5 className="card-title mt-3">{title}</h5>;
  };

  const Description = ({ desc }) => {
    return <p className="card-text">{desc}</p>;
  };

  const Price = ({ price }) => {
    return <h5 className="card-title">{price}</h5>;
  };

  const Button = ({ btnTitle, btnColor }) => {
    return (
      <a href="#" className={btnColor}>
        {btnTitle}
      </a>
    );
  };

  const SearchForm = () => {
    return (
      <div className="col-8 p-4 shadow rounded-4">
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </form>
      </div>
    );
  };

  const Item = ({ img, title, desc, price }) => {
    return (
      <div className="col-md-3 mb-4">
        <div
          className="card shadow"
          style={{ width: "18rem", height: "25rem" }}
        >
          <div className="card-body">
            <ItemImage img={img} />
            <Title title={title} />
            <Description desc={desc} />
            <Price price={price} />
          </div>
          <div className="card-footer p-2 bg-dark">
            <div className="d-flex justify-content-around">
              <Button
                className="fixed-bottom"
                btnTitle="Buy Now"
                btnColor="btn btn-primary"
              />
              <Button
                className="fixed-bottom"
                btnTitle="Add to Cart"
                btnColor="btn btn-danger"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="container mt-5">
        <div className="d-flex mb-5 justify-content-center">
          <SearchForm />
        </div>
        <div className="row d-flex g-4 justify-content-center  align-items-justify">
          {searchProducts.lenght === 0 ? (
            <h1>No products found</h1>
          ) : (
            searchProducts.map((product) => (
              <Item
                key={product._id}
                img={product.image}
                title={product.title}
                desc={product.description}
                price={product.price}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
