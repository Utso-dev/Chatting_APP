import React from 'react'
import Cropper from "react-cropper";
import { AiFillCloseCircle } from 'react-icons/ai';
import "./style.css"
import "cropperjs/dist/cropper.css";
import Button from '@mui/material/Button';

const UploadPicture = ({image,getCropData,setCropper, setImage}) => {
   
  
  return (
    <>
      <div className="upload-pic-box">
        <div className="upload-header">
            <h1>upload profile picture</h1>
            <div className="close" onClick={()=>setImage()}>
                <AiFillCloseCircle size={25}/>
            </div>
        </div>
        <div className="preview-img">
          <div className="img-preview" />
        </div>
        <div className="cropper-img">
        <Cropper
          style={{ height: 400, width: "100%" }}
          zoomto={0.5}
          initialaspectratio={1}
          preview=".img-preview"
          src={image}
          viewmode={1}
          mincropboxheight={10}
          mincropboxwidth={10}
          // background={toString()}
          responsive={toString()}
          autocroparea={1}
          checkorientation={toString()}
           onInitialized={(instance)=>{
            setCropper(instance)
           }}
          guides={toString()}

        />
        </div>
        <div className="cropper-button" onClick={getCropData}>
        <Button variant="contained">upload now</Button>
        </div>
      </div>
    </>
  )
}

export default UploadPicture
