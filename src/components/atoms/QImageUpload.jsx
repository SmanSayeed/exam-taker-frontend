import React, { useState } from "react";
import { useUploadImageMutation, useDeleteImageMutation, useUpdateImageMutation } from "@/features/questions/galleryApi";
import { CircleX } from "lucide-react";  // Import CircleX icon for delete button

const QImageUpload = ({setQImageId}) => {
  const [uploadImage] = useUploadImageMutation();
  const [updateImage] = useUpdateImageMutation();
  const [deleteImage] = useDeleteImageMutation();

  const [selectedImage, setSelectedImage] = useState(null); // Display the uploaded image
  const [imageId, setImageId] = useState(null); // Track image ID for update/delete
  const [loading, setLoading] = useState(false); // Loader state
  const [message, setMessage] = useState(""); // Success/Error message state
  const [loadingMessage,setLoadingMessage] = useState(null);

  // Function to generate a unique image name (name_time_randomId)
  const generateUniqueImageName = (file) => {
    const randomId = Math.floor(Math.random() * 1000000); // Generate a random number
    const timeStamp = Date.now(); // Get current timestamp
    const extension = file.name.split('.').pop(); // Get the file extension
    const name = file.name.split('.')[0]; // Get the original file name without extension
    return `${name}_${timeStamp}_${randomId}.${extension}`; // Return the unique image name
  };

  // Handle image upload or update
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Display the selected image immediately for preview
    const imageUrl = URL.createObjectURL(file); // For immediate preview
    setSelectedImage(imageUrl); // Set image preview

    // Generate unique image name
    const uniqueImageName = generateUniqueImageName(file);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("image_name", uniqueImageName); // Append the unique image name

    setLoading(true);
   
    setLoadingMessage('uploading...');
    setMessage(""); // Clear previous messages

    try {
      let response;
      if (imageId) {
        // Update existing image with the new unique name
        response = await updateImage({ id: imageId, formData }).unwrap();
      } else {
        // Upload new image with the unique name
        response = await uploadImage(formData).unwrap();
  
      }

      // After upload or update, update the image state with the new image URL
      setSelectedImage(response.data.image_url); // Use the full URL from the response
      setImageId(response.data.id); // Set the new image ID
      setQImageId(response.data.image_url)
      setMessage("Image uploaded successfully!"); // Success message
    } catch (error) {
      console.error("Error uploading/updating image:", error);
      setMessage("Image upload failed. Please try again."); // Error message
    } finally {
      setLoading(false);
      setLoadingMessage(null);
    }
  };

  // Handle image deletion
  const handleDeleteImage = async () => {
    if (!imageId) return;

    setLoading(true);
    setLoadingMessage('Deleting...');
    setMessage(""); // Clear previous messages

    try {
      await deleteImage(imageId).unwrap();
      setSelectedImage(null); // Remove the image preview
      setImageId(null); // Clear the image ID
      setQImageId(null)
      setMessage("Image deleted successfully!"); // Success message
    } catch (error) {
      console.error("Error deleting image:", error);
      setMessage("Image deletion failed. Please try again."); // Error message
    } finally {
      setLoading(false);
      setLoadingMessage(null);
    }
  };

  return (
    <div>
      <h2>Image Upload</h2>

      {/* Input for uploading/updating image */}
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={loading} // Disable input while loading
        />
      </div>

      {/* Loader while uploading */}
      {loading && <p>{loadingMessage}</p>}

      {/* Preview uploaded image */}
      {selectedImage && (
  <div style={{ display: "flex",gap:'10px', marginTop: "20px" }} >
    <img
      src={selectedImage} // Use the full URL from the response
      alt="Uploaded"
      style={{ maxWidth: "200px", maxHeight: "200px" }}
    />
    {/* Move the delete button outside the image */}
    <button
     
      onClick={handleDeleteImage}
      disabled={loading} // Disable button while loading
    >
      <CircleX size={24} /> {/* Using the CircleX icon for delete */}
    </button>
  </div>
)}


      {/* Display success or error message */}
      {message && !loading && <p>{message}</p>}
    </div>
  );
};

export default QImageUpload;
