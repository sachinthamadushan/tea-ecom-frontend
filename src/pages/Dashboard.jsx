import { useState, useEffect} from "react";
import { Link } from "react-router-dom";

const Button = ({ title, btnColor }) => {
    return <button type="submit" className={btnColor}>{title}</button>;
};
const TextField = ({ placeholder, type, name, value, handleChange }) => {
    if (type === 'file') {
        return (
            <div className="p-3">
                <label htmlFor={name} className="form-label">{placeholder}</label>
                <input
                    type="file"
                    name={name}
                    className="form-control"
                    id={name}
                    onChange={handleChange}
                    accept="image/*"
                />
                {/* ✅ Image preview */}
                {value && typeof value === 'object' && (
                    <div className="mt-3">
                        <img
                            src={URL.createObjectURL(value)}
                            alt="Preview"
                            className="img-thumbnail"
                            style={{ maxHeight: '200px' }}
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

const ProductTable = ({product_data}) => {
    return(
        <div className="">
            <table className="table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {product_data.map((item) => (
                        <tr key={item._id}>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>
                                <img 
                                src={`http://localhost:5000${item.image}`} 
                                style={{width: '50px', height: '50px'}}  alt={item.image} />
                            </td>
                            <td>{item.price}</td>
                            <td>
                                <Link to={`/dashboard/edit/${item._id}`} 
                                className="btn btn-primary">Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

// ✅ Main Dashboard Component
const Dashboard = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        image: null
    });

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect( () => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/products/getAll");
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'Fail to load products');
                }
                setProducts(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchProducts();
    },[]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('image', formData.image);

        try {
            const res = await fetch("http://localhost:5000/api/products/create", {
                method: "POST",
                body: data
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || 'Something went wrong on the server');
            }

            alert(result.message || 'Product created successfully');
            setFormData({ title: '', description: '', price: '', image: null });

        } catch (error) {
            console.error("Error from frontend:", error);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card col-md-8 col-lg-6 mx-auto">
                <div className="card-header">
                    <h1 className="text-center card-title">Add New Product</h1>
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
                        />
                        <div className="p-3">
                            <Button title="Save Product" btnColor="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="card mt-4 mb-4">
                <div className="card-header">
                    <h1 className="text-center card-title">All Products</h1>
                </div>
                <div className="card-body">
                    <ProductTable product_data={products} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;