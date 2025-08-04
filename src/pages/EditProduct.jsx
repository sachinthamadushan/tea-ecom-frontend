import { useState, useEffect, use } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TextField = ({ placeholder, type, name, value, handleChange, existingImage }) => {
  if (type === "file") {
    return (
      <div className="p-3">
        <label htmlFor={name} className="form-label">
          {placeholder}
        </label>
        <input
          type="file"
          name={name}
          className="form-control"
          id={name}
          onChange={handleChange}
          accept="image/*"
        />
        {/* ✅ Image preview */}
        {(value || existingImage)  && (
          <div className="mt-3">
            <img
              src={
                value
                  ? URL.createObjectURL(value)
                  : `http://localhost:5000${existingImage}`
              }
              alt="Preview"
              className="img-thumbnail"
              style={{ maxHeight: "200px" }}
            />
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="p-3">
      <input
        type={type}
        name={name}
        value={value}
        className="form-control"
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

const EditProduct = () => {
    
    const {id} = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        image: null,
        existingImage: ''
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
        const findProduct = async () => {
            try {
                const response = await 
                fetch(`http://localhost:5000/api/products/get/${id}`);
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'Fail to load product');
                }
                setFormData({
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    image: null,
                    existingImage: data.image
                });
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        findProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("price", formData.price);
        data.append("image", formData.image);
        data.append("existingImage", formData.existingImage);
        try {
            const res = await 
            fetch(`http://localhost:5000/api/products/update/${id}`, {
                method: "PUT",
                body: data
            });
            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.message || "Something went wrong on the server");
            }
            navigate("/dashboard");
        } catch (error) {
            console.error("Error from frontend:", error);
            setError(error.message);
        }
    }

    if (loading) {
        return <div className="text-center mt-5">Loading product data...</div>;
    }

    if (error) {
        return <div className="alert alert-danger mt-5">{error}</div>;
    }

    return (
    <div>
      <div className="container mt-3">
        <div className="card">
          <div className="card-header">
            <h1 className="text-center card-title">Edit Product</h1>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <TextField
                placeholder="Product Title"
                type="text"
                name="title"
                value={formData.title}
                handleChange={handleChange}
              />
              <TextField
                placeholder="Description"
                type="text"
                name="description"
                value={formData.description}
                handleChange={handleChange}
              />
              <TextField
                placeholder="Price"
                type="number"
                name="price"
                value={formData.price}
                handleChange={handleChange}
              />
              <TextField
                placeholder="Product Image"
                type="file"
                name="image"
                value={formData.image}
                handleChange={handleChange}
                existingImage={formData.existingImage}
              />
              <div className="p-3">
                <button type="submit" 
                className="btn btn-primary">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
