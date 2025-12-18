'use client';

import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Typography, Upload, message} from "antd";
import ModalPopup from "../modals/ModalPopup";
import "./upload.css";
import {useDeleteImageMutation, useGetBusinessImagesQuery} from "@/lib/redux/services/businessAPI";
import GetLoader, {DISPLAY, SPINNERS} from "../customSpinner/GetLoader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudArrowUp} from "@fortawesome/free-solid-svg-icons";
import {shouldGenerateThumbnail} from "@/lib/constants/imageTypes";
import {uploadBusinessImage} from "@/lib/utils/uploadBusinessImage";
import {formatBytes} from "@/lib/utils/imageUtils";

const {Text} = Typography;

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });


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
    const [isDeleting, setIsDeleting] = useState(false);
    
    // Determine whether to generate thumbnails
    const shouldGenerateThumbnailForType = generateThumbnail !== null 
        ? generateThumbnail 
        : shouldGenerateThumbnail(type);

    // Fetch existing images for this type (only when not using initialFileList)
    const {
        data: images,
        isLoading: loadingImages
    } = useGetBusinessImagesQuery({businessId, type}, {skip: !businessId || updateInitialList});
    
    const [deleteImage] = useDeleteImageMutation();
    
    const handleCancel = () => {
        // Don't allow closing the modal while deletion is in progress
        if (isDeleting) return;
        setPreviewOpen(false);
        setDeleteFile(false);
    };

    // Handle external initial file list updates
    useEffect(() => {
        if (updateInitialList && initialFileList) {
            setFileList(initialFileList);
        }
    }, [initialFileList, updateInitialList, setFileList]);

    // Map fetched images to AntD Upload fileList format
    // Now uses imageUrl instead of base64
    useEffect(() => {
        if (images && !updateInitialList) {
            const formattedImages = images.map((image) => ({
                uid: image.id,
                name: image.name,
                status: 'done',
                url: image.imageUrl, // Use direct URL from backend
                thumbUrl: image.thumbnailUrl, // Thumbnail URL if available
            }));
            setFileList(formattedImages);
        }
    }, [images, updateInitialList]);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
    };

    const handleChange = ({file, fileList: newFileList}) => {
        if (file.status === 'error') {
            // Remove failed file from the list and return to original state
            message.error(`${file.name} upload failed: ${file.error?.message || 'Unknown error'}`);
            setFileList(newFileList.filter(f => f.uid !== file.uid));
            return;
        }
        
        // Update fileList for UI consistency
        setFileList(newFileList);
        
        if (file.status === 'done') {
            const response = file.response;
            
            if (response && response.imageId) {
                if (setUploadImageId) {
                    setUploadImageId(response.imageId);
                }
                
                // Show optimization feedback
                message.success({
                    content: (
                        <div>
                            <div>Image uploaded successfully!</div>
                            {response.thumbnailUrl && (
                                <div style={{ fontSize: '12px', marginTop: '4px' }}>
                                    Thumbnail generated
                                </div>
                            )}
                        </div>
                    ),
                    duration: 4
                });
            }
        }
    };

    const handleCustomFileChange = () => {
        setFileList(fileList.filter(file => file.uid !== deleteUid));
    }

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const { data, error } = await deleteImage({ businessId, id: deleteUid });
            if (data) {
                handleCustomFileChange();
                if (setUploadImageId) {
                    setUploadImageId(null);
                }
                setDeleteFile(false);
                setPreviewOpen(false);
            } else if (error) {
                message.error('Failed to delete image. Please try again.');
            }
        } catch (error) {
            console.error('Delete failed:', error);
            message.error('Failed to delete image. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    }

    /**
     * Custom upload request using the new signed-URL flow
     * Replaces the old multipart POST to /upload/{type}/
     */
    const customUploadRequest = async ({ file, onSuccess, onError, onProgress }) => {
        try {
            const result = await uploadBusinessImage({
                businessId,
                type,
                file,
                generateThumbnailOverride: shouldGenerateThumbnailForType,
                onProgress: (percent) => {
                    onProgress({ percent });
                }
            });

            // Return the result for handleChange to process
            onSuccess({
                imageId: result.imageId,
                imageUrl: result.imageUrl,
                thumbnailUrl: result.thumbnailUrl
            });
            
            // Update the file in fileList with the actual URLs
            setFileList(prevList => 
                prevList.map(f => {
                    if (f.uid === file.uid) {
                        return {
                            ...f,
                            url: result.imageUrl,
                            thumbUrl: result.thumbnailUrl,
                            status: 'done',
                            response: {
                                imageId: result.imageId,
                                imageUrl: result.imageUrl,
                                thumbnailUrl: result.thumbnailUrl
                            }
                        };
                    }
                    return f;
                })
            );
        } catch (error) {
            console.error('Upload failed:', error);
            onError(error);
        }
    };

    if (loadingImages) {
        return <GetLoader
            spinner={SPINNERS.SKELETON_IMAGE}
            display={DISPLAY.AREA}/>
    }

    return (
        <div style={style}>
            <Upload
                customRequest={customUploadRequest}
                accept={accept}
                listType={listType}
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={(file) => {
                    handlePreview(file);
                    setDeleteUid(file.uid);
                    setDeleteFile(true);
                    // Return false to prevent automatic removal - we handle it manually after backend confirmation
                    return false;
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
                loading={isDeleting}
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
