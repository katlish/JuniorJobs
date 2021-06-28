import { debug } from 'console';
import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from "../../API";
// import { Image } from "cloudinary-react"; 
import LazyImage from "../LazyImage/LazyImage";
import placeholder from "../../imgs/placeholder2.gif";

// import Alert from '../components/Alert';

export default function FileUploader() {
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [imageIds, setImageIds] = useState([]);

    const loadImages = async () => {
        try {
            const { data } = await API_BASE_URL.get(`/images`);
            debugger;
            setImageIds(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadImages();
    }, []);

    const handleFileInputChange = (e: any) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file: any) => {
        const reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = (e: any) => {
        e.preventDefault();
        if (!previewSource) return;
        uploadImage(previewSource);
        // const reader = new FileReader();
        // reader.readAsDataURL(selectedFile);
        // reader.onloadend = () => {
        //     uploadImage(reader.result);
        // };
        // reader.onerror = () => {
        //     console.error('AHHHHHHHH!!');
        //     setErrMsg('something went wrong!');
        // };
    };

    const uploadImage = async (base64EncodedImage: any) => {
        try {
            const { data } = await API_BASE_URL.post(`/images`, JSON.stringify({ data: base64EncodedImage }));
            setFileInputState('');
            setPreviewSource('');
            setSuccessMsg('Image uploaded successfully');
            console.log({successMsg}, {data});
        } catch (err) {
            console.error(err);
            setErrMsg('Something went wrong!');
        }
    };

    return (
        <div>
            <h1 className="title">Upload an Image</h1>
            {/* <Alert msg={errMsg} type="danger" />
            <Alert msg={successMsg} type="success" /> */}
            <form onSubmit={handleSubmitFile} className="form">
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                />
                <button className="btn" type="submit">
                    Submit
                </button>
            </form>
            {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )}
            <div>
                <h1 className="title">Cloudinary Gallery</h1>
                <div className="gallery">
                    {imageIds &&
                        imageIds.map((imageId, index) => (

                            // <LazyImageStyled
                               

                            //     key={index}
                            //     src={imageId}
                            //     alt={`Random image ${index}`}
                            // />
                            <LazyImage
                                className="card-img rounded p-1 bg-light ms-auto" 
                                style={{width: "30rem", height: "30rem", objectFit: "contain"}}
                                errorImg="https://image.shutterstock.com/image-vector/no-image-available-vector-illustration-260nw-744886198.jpg"
                                placeholderImg={placeholder}
                                src={imageId}
                            />
                            // <Image
                            //     key={index}
                            //     cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                            //     publicId={imageId}
                            //     width="300"
                            //     crop="scale"
                            // />
                        ))}
                </div>
            </div>
        </div>
    );
}
