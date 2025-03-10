'use client';
import React, { ReactNode, useEffect } from 'react';

interface CustomDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  children: ReactNode;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({
  open,
  onOpenChange,
  placement = 'left',
  children,
}) => {
  // Disable vertical scrolling when drawer is open.
  useEffect(() => {
    if (open) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = '';
    }
    return () => {
      document.body.style.overflowY = '';
    };
  }, [open]);

  let transformClosed: string;
  let dimension: React.CSSProperties;

  switch (placement) {
    case 'left':
      transformClosed = 'translateX(-100%)';
      dimension = { width: '100%', height: '100%' };
      break;
    case 'right':
      transformClosed = 'translateX(100%)';
      dimension = { width: '300px', height: '100%' };
      break;
    case 'top':
      transformClosed = 'translateY(-100%)';
      dimension = { width: '100%', height: '300px' };
      break;
    case 'bottom':
      transformClosed = 'translateY(100%)';
      dimension = { width: '100%', height: '300px' };
      break;
    default:
      transformClosed = 'translateX(-100%)';
      dimension = { width: '300px', height: '100%' };
      break;
  }

  const drawerStyle: React.CSSProperties = {
    position: 'fixed',
    top: placement === 'top' ? 0 : placement === 'bottom' ? 'auto' : 0,
    bottom: placement === 'bottom' ? 0 : placement === 'top' ? 'auto' : 0,
    left: placement === 'left' ? 0 : placement === 'right' ? 'auto' : 0,
    right: placement === 'right' ? 0 : placement === 'left' ? 'auto' : 0,
    background: '#137832',
    transition: 'transform 0.3s ease-in-out',
    transform: open ? 'translate(0,0)' : transformClosed,
    zIndex: 1000,
    ...dimension,
  };

  return (
    <>
      {open && (
        <div
          className="visible lg:invisible lg:hidden"
          onClick={() => onOpenChange(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999,
          }}
        />
      )}
      <div style={drawerStyle}>{children}</div>
    </>
  );
};

export default CustomDrawer;
