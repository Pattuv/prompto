import { useEffect, useRef } from 'react';
import cursorImg from '../assets/cursor.png';

const Y_OFFSET = 50;

function CursorFollower() {
  const followerRef = useRef(null);
  const target = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const current = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const targetRotation = useRef(0);
  const currentRotation = useRef(0);

  useEffect(() => {
    const onMove = (event) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;
      targetRotation.current =
        event.clientX < window.innerWidth / 2 ? 30 : -30;
    };

    let frameId;

    const animate = () => {
      const ease = 0.12;

      current.current.x += (target.current.x - current.current.x) * ease;
      current.current.y += (target.current.y - current.current.y) * ease;
      currentRotation.current +=
        (targetRotation.current - currentRotation.current) * ease;

      if (followerRef.current) {
        const y = current.current.y + Y_OFFSET;
        followerRef.current.style.transform = `translate3d(${current.current.x}px, ${y}px, 8rem) translate(-50%, -18%) rotate(${currentRotation.current}deg)`;
      }

      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div ref={followerRef} className="cursor-follower" aria-hidden="true">
      <img src={cursorImg} alt="" className="cursor-follower__img" />
    </div>
  );
}

export default CursorFollower;
