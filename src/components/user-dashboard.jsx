    import { useCookies } from "react-cookie";
    import { useNavigate } from "react-router-dom";
    import axios from "axios";
    import { useEffect, useState } from "react";
    import { Link } from "react-router-dom";
    import { useDispatch } from "react-redux";
    import { addToViewLater } from "../slicers/video-slicer";
    import store from "../store/store";

    export function UserDashBoard() {
        const [cookies, setCookie, removeCookie] = useCookies(['username']);
        const [videos, setVideos] = useState([{ VideoId: 0, Title: '', Url: '', Description: '', Likes: 0, Dislikes: 0, Views: '', Comments: [''], CategoryId: 0 }]);
        const [saveItems, setSaveItems] = useState([]);
        const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
        const [searchTerm, setSearchTerm] = useState(''); // Initialize searchTerm state
        const [filteredVideos, setFilteredVideos] = useState([]);
        const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category

    let navigate = useNavigate();
    let dispatch = useDispatch();

    function handleSignout() {
        removeCookie('username');
        navigate('/user-login');
    }

    useEffect(() => {
        axios.get(`http://127.0.0.1:5050/get-videos`)
            .then(response => {
                setVideos(response.data);
                setFilteredVideos(response.data); // Set filtered videos initially to all videos
            });
    }, []);

    function handleSaveClick(video) {
        alert('Video Saved..');
        dispatch(addToViewLater(video));
        setSaveItems((prev) => [...prev, video]);
    }

    function handleWatchLaterClick() {
        setModalOpen(true); // Open the modal when this function is called
    }

    function handleRemoveClick(removeVideo) {
        setSaveItems((prev) =>
            prev.filter((video) => video.VideoId !== removeVideo.VideoId)
        );
        alert("Are you sure to remove this Video");
    }

    const handleSearchClick = () => {
        if (!searchTerm) {
            setFilteredVideos(videos); // If search term is empty, show all videos
        } else {
            const lowercasedSearchTerm = searchTerm.toLowerCase();
            const filtered = videos.filter((video) =>
                video.Title.toLowerCase().includes(lowercasedSearchTerm)
            );
            setFilteredVideos(filtered); // Set the filtered videos based on search term
        }
    };

    const handleCategoryChange = (e) => {
        const selected = e.target.value;
        setSelectedCategory(selected);
    
        // Filter videos by selected category
        if (selected === '') {
            setFilteredVideos(videos); // If no category is selected, show all videos
        } else {
            const filtered = videos.filter((video) => video.CategoryId === parseInt(selected));
            setFilteredVideos(filtered);
        }
    };

    return (
        <div className="bg-light p-2 m-2">
            <h3 className="mx-4 mt-4 mb-4 d-flex justify-content-between">
                <div className="ms-4 d-flex justify-content-between"><span className="me-2 bi bi-person-circle"></span><span>{cookies['username']}</span> <span>Dashboard</span></div>
                <div><button onClick={handleSignout} className="btn btn-link">Signout</button></div>
            </h3>
            <div className="row">
                <div className="d-flex justify-content-between">
                <div className="ms-4">
                    <div className="ms-4">
                        <select className="form-select" value={selectedCategory} onChange={handleCategoryChange}>
                            <option value="">Select Category</option>
                            <option value="">All</option>
                            <option value="1">User Interface</option>
                            <option value="2">Java</option>
                            <option value="3">Cloud</option>
                            <option value="4">Python</option>
                        </select>
                    </div>
                </div>
                    <div className="mb-3 w-50">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search Videos"
                                width="300px"
                                onChange={(e) => setSearchTerm(e.target.value)}
                                value={searchTerm}
                            />
                            <button
                                onClick={handleSearchClick}
                                className="bi bi-search btn btn-warning"
                            ></button>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={handleWatchLaterClick}
                            data-bs-toggle="modal"
                            data-bs-target="#save"
                            className="bi bi-clock btn btn-primary me-4"
                        >
                            {" "}
                            Watch later{" "}
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal for saved videos */}
            {modalOpen && (
                <div className="modal fade show" style={{ display: 'block' }} id="save">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header d-flex justify-content-between bg-danger-subtle">
                                <div>
                                    <h3> Saved Videos </h3>
                                </div>
                                <div>
                                    <button onClick={() => setModalOpen(false)} className="btn-close"></button>
                                </div>
                            </div>
                            <div className="card-body">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Videos</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {saveItems.length > 0 ? (
                                            saveItems.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.Title}</td>
                                                    <td>
                                                        <iframe
                                                            src={item.Url}
                                                            width="100px"
                                                            height="100px"
                                                            title={`iframe-${index}`}
                                                        ></iframe>
                                                    </td>
                                                    <td>
                                                        <button
                                                            onClick={() => handleRemoveClick(item)}
                                                            className="btn btn-success"
                                                        >
                                                            Remove
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="2" className="text-center text-muted">
                                                    No Videos Saved Yet
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-warning"
                                    onClick={() => setModalOpen(false)}
                                >
                                    {" "}
                                    OK{" "}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="row">
                <section className="mt-4 ms-4 d-flex flex-wrap">
                    {filteredVideos.length > 0 ? (
                        filteredVideos.map((video) => (
                            <div key={video.VideoId} className="card m-3 p-2" style={{ width: '300px' }}>
                                <div className="card-title" style={{ height: '60px' }}>
                                    <h5>{video.Title}</h5>
                                </div>
                                <div className="card-body">
                                    <iframe src={video.Url} className="w-100" height="200"></iframe>
                                </div>
                                <div className="card-footer">
                                    <span className="bi bi-eye-fill"> {video.Views} </span>
                                    <span className="bi mx-3 bi-hand-thumbs-up"> {video.Likes} </span>
                                    <span className="bi bi-hand-thumbs-down"> {video.Dislikes} </span>
                                    <button
                                        className="bi bi-download btn ms-5"
                                        onClick={() => handleSaveClick(video)}
                                    >
                                        {" "}
                                        Watch Later{" "}
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center w-100">No videos match your search.</p>
                    )}
                </section>
            </div>
        </div>
    );
}


