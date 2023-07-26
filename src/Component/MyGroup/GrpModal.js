import React from 'react'
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import "./style.css"
import Groupinfo from './Groupinfo';

const GrpModal = ({open, setOpen}) => {

    const style = {
        position: 'absolute',
        top: '56%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 2,
      };
     
      const handleClose = () => setOpen(false);
  return (
    <div>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
              <Groupinfo setOpen={setOpen}/>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default GrpModal