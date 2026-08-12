import {
  GoogleLogin,
  // type GoogleCredentialResponse,
  type GoogleLoginProps,
} from '@react-oauth/google';

// interface IGoogleLogin extends GoogleLoginProps {

// }

export default function GoogleLoginButton({
  onSuccess,
  ...rest
}: GoogleLoginProps) {
  const onError = () => {
    console.error('Login Failed:');
  };

  return (
    <>
      <div className="flex justify-center w-full">
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onError}
          useOneTap
          {...rest}
        />
      </div>
    </>
  );
}
