import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'react-final-form';
import { Button, Modal } from 'react-bootstrap';

import { shareVideo } from 'app/actions/video';
import { VideoFormData } from 'app/types/video';
import { alertSuccess } from 'app/utils/alert';
import Field from 'app/components/form/Field';
import SubmitButton from 'app/components/form/SubmitButton';
import { required } from 'app/utils/validationUtils';
import { useAppSelector } from 'app/redux/types';
import { userSelector } from 'app/selectors/user';

import styles from './ShareVideoModal.module.css';

type ShareVideoModalProps = {
  className?: string;
};

const ShareVideoModal = ({ className }: ShareVideoModalProps) => {
  const user = useAppSelector(userSelector);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = (values: VideoFormData) => {
    dispatch(
      shareVideo(values, () => {
        alertSuccess('Video share successfully');
        handleClose();
      }),
    );
  };

  return (
    <>
      <Button variant="light" onClick={handleShow} className={className}>
        Share a video
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className={styles.modalHeader}>
          Hi&nbsp;<b>{user.fullName}</b>
        </Modal.Header>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Body className={styles.modalBody}>
                <Field
                  name="url"
                  component="input"
                  placeholder="What's Youtube URL you want to share?"
                  validate={required('Youtube URL')}
                />
              </Modal.Body>
              <Modal.Footer className={styles.modalFooter}>
                <SubmitButton>Share</SubmitButton>
              </Modal.Footer>
            </form>
          )}
        />
      </Modal>
    </>
  );
};

export default ShareVideoModal;
