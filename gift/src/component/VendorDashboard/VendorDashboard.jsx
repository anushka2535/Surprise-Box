import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Nav, Navbar, Table, Button, Modal, Form, Card, Offcanvas } from "react-bootstrap";

import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from "chart.js";

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

import flower2 from "../../assets/flower2.jpg";

import "./VendorDashboard.css";

function VendorDashboard() {
    const navigate = useNavigate();
    const API = "http://localhost:5000";

    const [activeSection, setActiveSection] = useState("products");
    // State for products
    const [products, setProducts] = useState([]);

    useEffect(() => {

        // Fetch Products
        fetch(`${API}/product`)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.log(err));

        // Fetch Orders
        fetch(`${API}/cart/orders`)
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(err => console.log(err));
        const userId = localStorage.getItem("userId");

        fetch(`${API}/profile/${userId}`)
            .then(res => res.json())
            .then(data => {

                // Only vendors allowed
                if (!data.email.includes("@org.com")) {
                    navigate("/Account");
                    return;
                }

                console.log("Profile:", data);
                setProfile(data);
            })
            .catch(err => console.log(err));


    }, []);

    // orders
    const [orders, setOrders] = useState([]);

    const [dateRange, setDateRange] = useState("week"); // week, month, 3month




    // Example analytics data
    const analyticsData = {
        totalSales: 1200,
        totalOrders: orders.length,
        deliveredOrders: orders.filter(o => o.status === "Delivered").length,
        pendingOrders: orders.filter(o => o.status === "Pending").length,
        shippedOrders: orders.filter(o => o.status === "Shipped").length,
        topProduct: "Flower Bouquet"
    };

    // State for date range


    // Example orders with date


    // Filter orders by selected date range
    const filterOrdersByDate = () => {
        const now = new Date();
        return orders.filter(order => {
            const orderDate = new Date(order.date);
            const diffDays = (now - orderDate) / (1000 * 60 * 60 * 24);

            if (dateRange === "week") return diffDays <= 7;
            if (dateRange === "month") return diffDays <= 30;
            if (dateRange === "3month") return diffDays <= 90;
            return true;
        });
    };

    const filteredOrders = filterOrdersByDate();

    const barData = {
        labels: ["Delivered", "Pending", "Shipped"],
        datasets: [
            {
                label: "Orders",
                data: [
                    filteredOrders.filter(o => o.status === "Delivered").length,
                    filteredOrders.filter(o => o.status === "Pending").length,
                    filteredOrders.filter(o => o.status === "Shipped").length
                ],
                backgroundColor: ["#28a745", "#ffc107", "#17a2b8"]
            }
        ]
    };



    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "", image: "" });

    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [cancelReason, setCancelReason] = useState("");
    const [notifications, setNotifications] = useState([]);
    const [profile, setProfile] = useState({});

    // Handle text inputs
    const handleChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setNewProduct({ ...newProduct, image: imageUrl });
        }
    };

    // Open modal for Add
    const openAddModal = () => {
        setEditingProduct(null);
        setNewProduct({ name: "", price: "", stock: "", image: "" });
        setShowModal(true);
    };

    // Open modal for Edit
    const openEditModal = (product) => {
        setEditingProduct(product);
        setNewProduct(product);
        setShowModal(true);
    };



    // Add or Update product
    const handleSaveProduct = async () => {

        try {

            const response = await fetch(
                `${API}/product/add`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newProduct)
                }
            );

            const data = await response.json();

            console.log(data);

            if (response.ok) {

                setProducts([...products, data.product]);

                setShowModal(false);

                setNewProduct({
                    name: "",
                    price: "",
                    stock: "",
                    image: ""
                });

                alert("Product Added Successfully");
            }

        } catch (error) {

            console.log(error);
            alert("Error Adding Product");

        }
    };
    const handleDeleteProduct = async (id) => {

        try {

            const response = await fetch(
                `${API}/product/${id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            console.log(data);

            if (response.ok) {

                setProducts(products.filter(p => p._id !== id));

                alert("Product Deleted Successfully");

            }

        } catch (error) {

            console.log(error);

            alert("Error Deleting Product");

        }
    };

    const handleCancelOrder = (order) => {
        setSelectedOrder(order);
        setShowCancelModal(true);
    };
    return (
        <Container fluid>
            <Row>
                {/* Sidebar for desktop */}
                <Col md={2} className=" con d-none  d-md-block bg-dark text-white vh-100 p-3">
                    <h4>SurpriseBox</h4>
                    <Nav className="flex-column mt-4 ">
                        <Nav.Link onClick={() => setActiveSection("profile")}>Profile</Nav.Link>
                        <Nav.Link onClick={() => setActiveSection("products")}>Products</Nav.Link>
                        <Nav.Link onClick={() => setActiveSection("orders")}>Orders</Nav.Link>
                        <Nav.Link onClick={() => setActiveSection("analytics")}>Analytics</Nav.Link>
                        <Nav.Link onClick={() => setActiveSection("settings")}>Settings</Nav.Link>
                    </Nav>
                </Col>

                {/* Mobile Navbar with Offcanvas */}
                <Col xs={12} className="d-md-none">
                    <Navbar bg="dark" expand="md" variant="dark">
                        <Container fluid>
                            <Navbar.Brand>SurpriseBox</Navbar.Brand>
                            <Navbar.Toggle aria-controls="offcanvasNavbar" />
                            <Navbar.Offcanvas
                                id="offcanvasNavbar"
                                aria-labelledby="offcanvasNavbarLabel"
                                placement="start"
                            >
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <Nav className="flex-column">
                                        <Nav.Link onClick={() => setActiveSection("profile")}>Profile</Nav.Link>
                                        <Nav.Link onClick={() => setActiveSection("products")}>Products</Nav.Link>
                                        <Nav.Link onClick={() => setActiveSection("orders")}>Orders</Nav.Link>
                                        <Nav.Link onClick={() => setActiveSection("analytics")}>Analytics</Nav.Link>
                                        <Nav.Link onClick={() => setActiveSection("settings")}>Settings</Nav.Link>
                                    </Nav>
                                </Offcanvas.Body>
                            </Navbar.Offcanvas>
                        </Container>
                    </Navbar>
                </Col>

                {/* Main Content */}
                <Col md={10} className="p-4">
                    <Navbar className="mb-4">
                        <Navbar.Brand>Vendor Dashboard</Navbar.Brand>
                        <Nav className="ms-auto">
                            <Nav.Link
                                onClick={() => navigate("/notification")}
                            >
                                Notifications ({orders.length})
                            </Nav.Link>

                        </Nav>
                    </Navbar>
                    {activeSection === "profile" && (
                        <>
                            <h4>Vendor Profile</h4>

                            <Card className="p-4">
                                <h5>{profile.name}</h5>

                                <p>
                                    <strong>Email:</strong> {profile.email}
                                </p>

                                <p>
                                    <strong>User ID:</strong> {profile._id}
                                </p>

                                <p>
                                    <strong>Vendor Account:</strong>{" "}
                                    {profile.email?.includes("@org.com")
                                        ? "Yes"
                                        : "No"}
                                </p>
                            </Card>
                        </>
                    )}



                    {/* Products Section */}
                    {activeSection === "products" && (

                        <>

                            <h5>Products</h5>
                            <Button variant="primary" className="mb-3" onClick={openAddModal}>
                                + Add Product
                            </Button>

                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((p) => (
                                        <tr key={p._id}>
                                            <td>{p.image && <img src={p.image} alt={p.name} width="50" />}</td>
                                            <td>{p.name}</td>
                                            <td>Rs {p.price}</td>
                                            <td>{p.stock}</td>
                                            <td>
                                                <Button variant="warning" size="sm" onClick={() => openEditModal(p)}>Edit</Button>{" "}
                                                <Button variant="danger" size="sm" onClick={() => handleDeleteProduct(p._id)}>Delete</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </>
                    )}

                    {activeSection === "orders" && (
                        <>
                            <h5>Orders</h5>
                            <Table striped bordered hover >
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Product</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((o) => (
                                        <tr key={o._id}>
                                            <td>{o.orderId}</td>
                                            <td>{o.userId}</td>
                                            <td>{o.productName}</td>
                                            <td>{o.status}</td>

                                            <td>
                                                <td>
                                                    <Button
                                                        variant="success"
                                                        size="sm"
                                                        className="me-2"
                                                        onClick={async () => {
                                                            try {
                                                                const res = await fetch(
                                                                    `${API}/cart/update-status/${o._id}`,
                                                                    {
                                                                        method: "PUT",
                                                                        headers: {
                                                                            "Content-Type": "application/json"
                                                                        },
                                                                        body: JSON.stringify({
                                                                            status: "Confirmed"
                                                                        })
                                                                    }
                                                                );

                                                                const updatedOrder = await res.json();

                                                                // update frontend instantly
                                                                setOrders(prev =>
                                                                    prev.map(order =>
                                                                        order._id === o._id
                                                                            ? updatedOrder
                                                                            : order
                                                                    )
                                                                );

                                                                alert("Order Confirmed");
                                                            } catch (err) {
                                                                console.log(err);
                                                                alert("Failed to update order");
                                                            }
                                                        }}
                                                    >
                                                        Confirm
                                                    </Button>

                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleCancelOrder(o)}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </td>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </Table>
                        </>
                    )}


                    {/* Analytics Section */}
                    {activeSection === "analytics" && (
                        <>
                            <h5>Analytics</h5>
                            <Row>
                                <Col md={4}>
                                    <Card className="mb-3">
                                        <Card.Body>
                                            <Card.Title>Total Sales</Card.Title>
                                            <Card.Text>Rs {analyticsData.totalSales}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card className="mb-3">
                                        <Card.Body>
                                            <Card.Title>Total Orders</Card.Title>
                                            <Card.Text>{analyticsData.totalOrders}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card className="mb-3">
                                        <Card.Body>
                                            <Card.Title>Top Product</Card.Title>
                                            <Card.Text>{analyticsData.topProduct}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Card className="mb-3">
                                        <Card.Body>
                                            <Card.Title>Delivered Orders</Card.Title>
                                            <Card.Text>{analyticsData.deliveredOrders}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={6}>
                                    <Card className="mb-3">
                                        <Card.Body>
                                            <Card.Title>Pending Orders</Card.Title>
                                            <Card.Text>{analyticsData.pendingOrders}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            {/* Charts */}
                            <Row>
                                <Col md={6}>
                                    <h6>Orders Distribution (Bar)</h6>
                                    <Bar data={barData} />
                                </Col>
                                <Col md={6}>
                                    <h6>Orders Distribution (Pie)</h6>

                                    {/* Date Range Selector */}
                                    <div className="mb-3">
                                        <Form.Select
                                            value={dateRange}
                                            onChange={(e) => setDateRange(e.target.value)}
                                        >
                                            <option value="week">Last Week</option>
                                            <option value="month">Last Month</option>
                                            <option value="3month">Last 3 Months</option>
                                        </Form.Select>
                                    </div>


                                </Col>
                            </Row>

                        </>
                    )}



                    {activeSection === "settings" && (
                        <>
                            <h5>Settings</h5>

                            <Card className="p-4" >
                                <Button
                                    variant="danger"
                                    size="sm"
                                    style={{
                                        fontSize: "12px",
                                        padding: "4px 10px",
                                        width: "80px"
                                    }}
                                    onClick={() => {
                                        localStorage.clear();
                                        navigate("/");
                                    }}
                                >
                                    Logout
                                </Button>


                            </Card>
                        </>
                    )}
                </Col>
            </Row>

            {/* Add/Edit Product Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingProduct ? "Edit Product" : "Add New Product"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" name="name" value={newProduct.name} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" name="price" value={newProduct.price} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control type="text" name="stock" value={newProduct.stock} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Image</Form.Label>
                            <Form.Control
                                type="text"
                                name="image"
                                placeholder="Paste Image URL"
                                value={newProduct.image}
                                onChange={handleChange}
                            />
                            {newProduct.image && (
                                <img src={newProduct.image} alt="preview" width="80" className="mt-2 rounded" />
                            )}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleSaveProduct}>
                        {editingProduct ? "Save Changes" : "Add Product"}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showCancelModal}
                onHide={() => setShowCancelModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Cancel Order</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Select Reason</Form.Label>

                        <Form.Select
                            value={cancelReason}
                            onChange={(e) =>
                                setCancelReason(e.target.value)
                            }
                        >
                            <option value="">
                                Select Reason
                            </option>

                            <option value="Out Of Stock">
                                Out Of Stock
                            </option>

                            <option value="Damaged Product">
                                Damaged Product
                            </option>

                            <option value="Product Unavailable">
                                Product Unavailable
                            </option>

                            <option value="Other">
                                Other
                            </option>
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() =>
                            setShowCancelModal(false)
                        }
                    >
                        Close
                    </Button>

                    <Button
                        variant="danger"
                        onClick={() => {
                            console.log(
                                selectedOrder?.id,
                                cancelReason
                            );

                            setShowCancelModal(false);
                            setCancelReason("");
                        }}
                    >
                        Confirm Cancellation
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default VendorDashboard;