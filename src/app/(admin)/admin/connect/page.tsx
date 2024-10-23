import Modal from '@/components/modal/Modal';
import { GetQrCode } from '@/components/modal/getQrCode';

export default function ConnectQrCodePage() {
  return (
    <Modal>
      <GetQrCode />
    </Modal>
  );
}
