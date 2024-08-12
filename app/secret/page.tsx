'use client';

import Image from 'next/image';
import img from './s.gif';

const SecretPage = () => {
  return (
    <div>
      <p>You&apos;re not supposed to be here, but since you are — enjoy the view!</p>
      <Image src={img} alt="Secret GIF" width={300} height={390} priority/>
    </div>
  );
};

export default SecretPage;
