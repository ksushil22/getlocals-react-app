import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Typography, Upload, message} from "antd";
import ModalPopup from "../modals/ModalPopup";
import "./upload.css";
import {useDeleteImageMutation, useGetBusinessImagesQuery} from "../../../redux/services/businessAPI";
import GetLoader, {DISPLAY, SPINNERS} from "../customSpinner/GetLoader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudArrowUp} from "@fortawesome/free-solid-svg-icons";
import {shouldGenerateThumbnail} from "../../../constants/imageTypes";

const {Text} = Typography;

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};


/**
 *
 * @param style
 * @param maxUploads - max number of uploads: could be either 1 or 8, or upto you
 * @param setUploadImageId - for setting up the image id for further use.
 * @param accept - MIME types for Upload to accept file types.
 * @param type - Type of image that belongs to the business: CAROUSEL, MENU, etc
 * @param listType - picture-card, picture
 * @param initialFileList - initial images.
 * @param updateInitialList - do we need to update the initial List or not
 * @param generateThumbnail - whether to generate thumbnail for uploaded images
 * @returns {JSX.Element}
 */
export default function ({
                             style = {},
                             maxUploads = 1,
                             setUploadImageId = null,
                             accept = '',
                             type = "MENU",
                             listType = 'picture-card',
                             initialFileList = null,
                             updateInitialList = false,
                             generateThumbnail = null
                         }) {
    const businessId = useSelector((state) => state.business.businessId)
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [fileList, setFileList] = useState([]);
    const [deleteFile, setDeleteFile] = useState(false);
    const [deleteUid, setDeleteUid] = useState("");
    
    // Determine whether to generate thumbnails
    const shouldGenerateThumbnailForType = generateThumbnail !== null 
        ? generateThumbnail 
        : shouldGenerateThumbnail(type);
    const {
        data: images,
        isLoading: loadingImages
    } = useGetBusinessImagesQuery({businessId, type}, {skip: (type === "MENU") || (type === 'EMPLOYEE')});
    const [deleteImage] = useDeleteImageMutation();
    const handleCancel = () => {
        setPreviewOpen(false);
        setDeleteFile(false);
    };

    useEffect(() => {
        if (updateInitialList) {
            setFileList(initialFileList);
        }
    }, [initialFileList, updateInitialList, setFileList]);

    useEffect(() => {
        if (images) {
            const formattedImages = images.map((image) => ({
                uid: image.id,
                name: image.name,
                status: 'done',
                url: `data:${image.extension};base64,${image.image}`,
            }));
            setFileList(formattedImages);
        }
    }, [images]);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
    };

    const handleChange = ({file, fileList: newFileList}) => {
        if (file.status !== 'removed' && file.status === 'uploading') {
            setFileList(newFileList);
        }
        if (file.status === 'done') {
            const response = file.response;
            
            // Handle both old and new response formats
            const imageId = response.imageId || response.message;
            const thumbnailId = response.thumbnailId;
            
            // Update file list with proper IDs
            const updatedFileList = newFileList.map(f => {
                if (f.uid === file.uid) {
                    return {
                        ...f,
                        response: {
                            ...response,
                            imageId,
                            thumbnailId
                        }
                    };
                }
                return f;
            });
            
            setFileList(updatedFileList);
            
            if (setUploadImageId) {
                setUploadImageId(imageId);
            }
            
            // Show optimization feedback if available
            if (response.compressionRatio) {
                const savedBytes = response.originalSize - response.optimizedSize;
                const savedSize = formatBytes(savedBytes);
                const compressionPercent = response.compressionRatio.toFixed(0);
                
                message.success({
                    content: (
                        <div>
                            <div>Image uploaded successfully!</div>
                            <div style={{ fontSize: '12px', marginTop: '4px' }}>
                                Optimized: {compressionPercent}% smaller ({savedSize} saved)
                                {thumbnailId && " • Thumbnail generated"}
                            </div>
                        </div>
                    ),
                    duration: 4
                });
            } else {
                // Fallback for old response format
                message.success('Image uploaded successfully');
            }
        }
        
        if (file.status === 'error') {
            message.error(`${file.name} upload failed: ${file.error?.message || 'Unknown error'}`);
        }
    };


    const handleCustomFileChange = () => {
        setFileList(fileList.filter(file => file.uid !== deleteUid));
    }

    const handleDelete = async () => {
        deleteImage(deleteUid).then(({data, error}) => {
            if (data) {
                handleCustomFileChange();
                if (setUploadImageId) {
                    setUploadImageId(null)
                }
            }
        });
        setDeleteFile(false)
        setPreviewOpen(false)

    }

    if (loadingImages) {
        return <GetLoader
            spinner={SPINNERS.SKELETON_IMAGE}
            display={DISPLAY.AREA}/>
    }

    return (
        <div style={style}>
            <Upload
                action={`${process.env.BASE_API_URL}business/${businessId}/upload/${type}/`}
                headers={{
                    'Authorization': `Bearer ${sessionStorage.getItem("access")}`
                }}
                data={{
                    generateThumbnail: shouldGenerateThumbnailForType ? 'true' : 'false'
                }}
                accept={accept}
                listType={listType}
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={(file) => {
                    handlePreview(file);
                    setDeleteUid(file.uid);
                    setDeleteFile(true);
                }}
                maxCount={maxUploads}
                style={{cursor: "pointer"}}
            >
                {fileList.length >= maxUploads ? null : (
                    <div>
                        <div style={{marginTop: 8}}>Upload</div>
                        <FontAwesomeIcon icon={faCloudArrowUp} fontSize={"larger"}/>
                    </div>
                )}
            </Upload>
            <ModalPopup
                type={deleteFile ? "warning" : "success"}
                visible={previewOpen || deleteFile}
                title={deleteFile ? `Delete: ${previewTitle}` : previewTitle}
                footer={null}
                showCancel={deleteFile}
                handleCancel={handleCancel}
                submitButtonText={deleteFile ? 'Delete' : null}
                handleOk={deleteFile ? handleDelete : null}
            >
                <img
                    alt="example"
                    style={{
                        width: "100%",
                    }}
                    src={previewImage}
                />
                {deleteFile && (<Text type="danger">Deletion of the item is irreversible.</Text>)}
            </ModalPopup>
        </div>
    );
}

