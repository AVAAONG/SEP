/**
 * @file  This file contains the page that renders the check email page for the admin sign in.
 * @remarks The user will be redirected to this page after signing in with an email.
 * @author Kevin Bravo (kevinbravo.me)
 */

'use client';
import Link from 'next/link';
import { createPortal } from 'react-dom';

/**
 * Page that renders the check email page for the admin sign in.
 * @see {@link https://react.dev/reference/react-dom/createPortal} for more information about React Portals.
 * @returns The check email page for the admin sign in.
 */
const page = () => {
  return createPortal(
    <div className="fixed inset-0 z-10 bg-white bg-opacity-90 backdrop-filter backdrop-blur-md backdrop-hue-rotate-15 text-slate-950">
      <div className="min-h-screen px-6 flex flex-col items-center justify-center animate-zoomIn">
        <svg
          height="55px"
          width="70px"
          version="1.1"
          id="_x32_"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
          fill="currentColor"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            {' '}
            <style type="text/css"> </style>{' '}
            <g>
              {' '}
              <path
                className="st0"
                d="M510.746,110.361c-2.128-10.754-6.926-20.918-13.926-29.463c-1.422-1.794-2.909-3.39-4.535-5.009 c-12.454-12.52-29.778-19.701-47.531-19.701H67.244c-17.951,0-34.834,7-47.539,19.708c-1.608,1.604-3.099,3.216-4.575,5.067 c-6.97,8.509-11.747,18.659-13.824,29.428C0.438,114.62,0,119.002,0,123.435v265.137c0,9.224,1.874,18.206,5.589,26.745 c3.215,7.583,8.093,14.772,14.112,20.788c1.516,1.509,3.022,2.901,4.63,4.258c12.034,9.966,27.272,15.45,42.913,15.45h377.51 c15.742,0,30.965-5.505,42.967-15.56c1.604-1.298,3.091-2.661,4.578-4.148c5.818-5.812,10.442-12.49,13.766-19.854l0.438-1.05 c3.646-8.377,5.497-17.33,5.497-26.628V123.435C512,119.06,511.578,114.649,510.746,110.361z M34.823,99.104 c0.951-1.392,2.165-2.821,3.714-4.382c7.689-7.685,17.886-11.914,28.706-11.914h377.51c10.915,0,21.115,4.236,28.719,11.929 c1.313,1.327,2.567,2.8,3.661,4.272l2.887,3.88l-201.5,175.616c-6.212,5.446-14.21,8.443-22.523,8.443 c-8.231,0-16.222-2.99-22.508-8.436L32.19,102.939L34.823,99.104z M26.755,390.913c-0.109-0.722-0.134-1.524-0.134-2.341V128.925 l156.37,136.411L28.199,400.297L26.755,390.913z M464.899,423.84c-6.052,3.492-13.022,5.344-20.145,5.344H67.244 c-7.127,0-14.094-1.852-20.142-5.344l-6.328-3.668l159.936-139.379l17.528,15.246c10.514,9.128,23.922,14.16,37.761,14.16 c13.89,0,27.32-5.032,37.827-14.16l17.521-15.253L471.228,420.18L464.899,423.84z M485.372,388.572 c0,0.803-0.015,1.597-0.116,2.304l-1.386,9.472L329.012,265.409l156.36-136.418V388.572z"
              ></path>{' '}
            </g>{' '}
          </g>
        </svg>
        <div className="mt-2 flex flex-col items-center justify-center text-center max-w-sm gap-4">
          <h3 className="text-2xl font-semibold ">¡Ahora revisa tu correo electrónico!</h3>
          <p className="text-lg">
            Desde <span className="font-semibold text-green-700">ProExcelencia</span> te hemos
            enviado un enlace de inicio de sesión a tu correo.
          </p>
          <Link
            href={'https://mail.google.com/mail/u/0/'}
            className=" w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Revisar Correo
          </Link>
        </div>
        <p className="text-sm italic text-red-700">
          Si no llega en 3 minutos, revisa tu carpeta de spam
        </p>
      </div>
    </div>,
    document.body
  );
};

export default page;
