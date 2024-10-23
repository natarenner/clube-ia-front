import Modal from '@/components/modal/Modal';
import { GetQrCode } from '@/components/modal/getQrCode';

export default function ConnectQrCodeModalPage() {
  return (
    <Modal>
      <GetQrCode />
    </Modal>
  );
}
