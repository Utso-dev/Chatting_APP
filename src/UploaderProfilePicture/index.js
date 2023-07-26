import React, {  useRef, useState } from 'react'
import { IoMdPhotos } from 'react-icons/io';
// import ReactCropperElement from "react-cropper"
import "./style.css"
import UploadPicture from './UploadPicture';
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { Loginusers } from '../Features/Slice/Loginslice';

const UploadeProfile = ({setOpen}) => {
    const [image, setImage] = useState();
    const [cropData, setCropData] = useState("#");
    const [cropper , setCropper]=useState();
    // const cropperRef = createRef<ReactCropperElement>(null);
    //uploade file =======================
    const storage = getStorage();
   const storageRef = ref(storage, "user.uid");
   const auth = getAuth();
   const dispach = useDispatch();
   const users= useSelector((user)=>user.logins.logged);
   
    
    const  chooseFile = useRef(null);
    const handleChange = (e)=>{
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };
    const getCropData = () => {
        if (typeof cropper !== "undefined") {
          setCropData(cropper.getCroppedCanvas().toDataURL());
          // Data URL string
         const message4 = cropper.getCroppedCanvas().toDataURL();
         uploadString(storageRef , message4, 'data_url').then((snapshot) => {
          
          getDownloadURL(storageRef).then((downloadURL) => {
            updateProfile(auth.currentUser, {
    
              photoURL: downloadURL
            }).then(()=>{
              setOpen(false); 
              dispach(Loginusers({ ...users ,  photoURL: downloadURL}));
              localStorage.setItem("users", JSON.stringify({ ...users ,  photoURL: downloadURL}))
            })
          });
        });
        }
      };
  return (
    <div>
       <div className="uplod-box">
       <div className="update-picture" >
                <input 
                type="file" 
                hidden  
                ref={chooseFile} 
                onChange={handleChange}
                />
                 <div className="uplod-heder" onClick={()=>chooseFile.current.click()}>
                 <div className="picture-icon">
                    <IoMdPhotos size={35} cursor="pointer" />
                 </div>
                   <h4>Upload your picture</h4>
                 </div>
             {
                image &&   <UploadPicture 
                image={image} 
                setImage={setImage} 
                getCropData={getCropData}
                setCropper={setCropper}
                cropData={cropData}
                 />

             }
              </div>
       </div>
    </div>
  )
}

export default UploadeProfile
