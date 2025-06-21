import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export function AdminDashboard(){


    const [videos,setVideos] = useState([{VideoId:0, Title:'', Url:'', Description:'', Likes:0, Dislikes:0, Views:0, CategoryId:0, Comments:'' }])

    useEffect(()=>{
        axios.get(`http://127.0.0.1:5050/get-videos`)
        .then(response=>{
            setVideos(response.data);
        })
    },[])

return(
    <div className="bg-light p-3 m-3">
    <div className="d-flex justify-content-between">
        <div>
            <h3>Admin Dashboard</h3>
        </div>
        <div className="mb-3">
            <Link to="/add-video" className="btn btn-primary bi bi-camera-video"> Add Video </Link>
        </div>
    </div>
    <div>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Preview</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    videos.map(video=>
                        <tr key={video.VideoId}>
                            <td>{video.Title}</td>
                            <td>
                                <iframe src={video.Url} width="200px" height="100px"></iframe>
                            </td>
                            <td>
                                <Link to={`/edit-video/${video.VideoId}`} className="bi bi-pen-fill me-2 btn btn-warning"></Link>
                                <Link to={`/delete-video/${video.VideoId}`} className="bi bi-trash-fill btn btn-danger"></Link>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
</div>
    )
}