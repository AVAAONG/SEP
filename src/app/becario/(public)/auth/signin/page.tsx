import Warning from "@/components/alerts/Warning";
import Aside from "@/components/auth componets/Aside";
import SigninForm from "@/components/forms/SignInForm";
import GoogleSignInButton from "@/components/signinButtons/GoogleSignInButton";
import authOptions from "@/lib/auth/nextAuthOptions/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation"


const page = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getServerSession(authOptions);

  /**
   * Specify to which URL the user will be redirected after signing in. Defaults to the page URL the sign-in is initiated from.
   * @summary The URL to redirect to after a successful sign in or sign up.
   */
    const scholarCallbackUrl = searchParams!.callbackUrl as string || "/becario/dsafadsfas/config";
  if (session) {
    redirect(scholarCallbackUrl);
  }
  return (
    <main className="flex flex-col md:flex-row-reverse min-h-screen md:h-screen bg-gradient-to-b from-emerald-950 to-slate-950">
      <Aside />
      <section className="justify-center px-4 md:px-0 md:flex md:w-2/3">
        <div className="w-full max-w-sm py-4 mx-auto my-auto min-w-min md:py-9 md:w-7/12">
          {searchParams?.error === "notAllowed" && (
            <Warning
              title={`El correo no tiene permitido el acceso al SEP.`}
              subtitle={
                "Solo los correos de los becarios que se encuentran registrado en la base de datos de ProExcelencia pueden acceder al SEP"
              }
            />
          )}
          <h2 className="text-xl font-semibold md:text-2xl">Entra</h2>
          <div className="my-4">
            <SigninForm callbackUrl="/becario/api/signinRedirect" />
          </div>
          <div className="inline-flex items-center justify-around w-full ">
            <hr className="w-40 h-px my-8 border-0 bg-emerald-700 opacity-40" />
            <span className="absolute px-3 font-medium  text-white ">o</span>
            <hr className="w-40 h-px my-8 border-0 bg-emerald-700 opacity-40" />
          </div>

          <div className="flex">
            <GoogleSignInButton callbackUrl="/becario/api/signinRedirect" providerId="userGoogle" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
